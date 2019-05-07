import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProductionStep1CreateComponent from "../../components/production/productionStep5CreateComponent";
import { pullDeviceList } from "../../actions/deviceListActions";


class ProductionStep5CreateContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            // DEVELOPERS NOTE: This variable is used as the main way to add
            // GUI modification to the fields. Simply adding a key and the
            // message will result in an error message displaying for that
            // field. Please make sure the `name` in the HTML field equals
            // the `name` dictonary key in this dictionary.
            errors: {},

            referrer: '',
            showModal: false,
            name: null,
            description: null,
            device: null,

            /**
            --- PRODUCTION ---
            environment
            is_commercial
            type_of
            grow_system
            grow_system_other
            started_at

            --- PRODUCTION CROP ---
            crop_other
            quantity
            substrate
            substrate_other

            */
        }
        this.getDeviceOptions = this.getDeviceOptions.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    /**
     *  Utility function will take the device list objects we have from the
     *  API endpoint and generate options data for the `react-select` component
     *  we are using.
     */
    getDeviceOptions() {
        const deviceOptions = [];
        const deviceList = this.props.deviceList;
        if (deviceList !== undefined && deviceList !== null) {
            const results = deviceList.results;
            if (results !== undefined && results !== null) {
                for (let i = 0; i < results.length; i++) {
                    let device = results[i];
                    // console.log(device); // For debugging purposes.
                    deviceOptions.push({
                        selectName: "device",
                        value: device.slug,
                        label: device.name
                    });
                }
            }
        }
        return deviceOptions;
    }

    componentDidMount() {
        this.props.pullDeviceList(this.props.user); // Get latest data from API.
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSelectChange(option) {
        this.setState({
            [option.selectName]: option.value
        })
    }

    onBackClick(e) {
        this.setState({
            referrer: '/add-production-step-4'
        })
    }

    onNextClick(e) {
        this.setState({
            referrer: '/add-production-step-5'
        })
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const { name, description, device, errors, showModal, referrer } = this.state;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionStep1CreateComponent
                name={name}
                description={description}
                deviceOptions={this.getDeviceOptions()}
                device={device}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                errors={errors}
                showModal={showModal}
                onBackClick={this.onBackClick}
                onNextClick={this.onNextClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        deviceList: store.deviceListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullDeviceList: (user, page) => {
            dispatch(
                pullDeviceList(user, page)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionStep5CreateContainer);
