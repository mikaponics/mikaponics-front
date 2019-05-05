import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductionCreateComponent from "../../components/production/productionCreateComponent";
import { pullDeviceList } from "../../actions/deviceListActions";


class ProductionCreateContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            referrer: '',
            errors: {},
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
            production
            crop
            crop_other
            quantity
            substrate
            substrate_other

            */
        }
        this.getDeviceOptions = this.getDeviceOptions.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
            if (deviceList !== undefined && deviceList !== null) {
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
    } // end FUNC.

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

    onSubmit(e) {
        alert("SUBMITTING...");
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const { name, description, device, errors } = this.state;
        return (
            <ProductionCreateComponent
                name={name}
                description={description}
                deviceOptions={this.getDeviceOptions()}
                device={device}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onSubmit={this.onSubmit}
                errors={errors}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        deviceList: store.deviceListState,
        // productionList: store.productionListState,
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
)(ProductionCreateContainer);
