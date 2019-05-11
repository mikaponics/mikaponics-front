import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import {
    PRODUCTION_TYPE_OPTION_CHOICES,
    PRODUCTION_ENVIRONMENT_OPTION_CHOICES,
    PRODUCTION_GROW_SYSTEM_OPTION_CHOICES
} from "../../../constants/api";
import { validateStep1Input } from '../../../validations/productionCreateValidator';
import ProductionStep1CreateComponent from "../../../components/production/create/productionStep1CreateComponent";
import { pullDeviceList } from "../../../actions/deviceListActions";


class ProductionStep1CreateContainer extends Component {

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
            name: localStorage.getItem('temp-name'),
            description: localStorage.getItem('temp-description'),
            isCommercial: localStorage.getItem('temp-isCommercial') === 'true',
            device: localStorage.getItem('temp-device'),
            environment: parseInt(localStorage.getItem('temp-environment')),
            typeOf: parseInt(localStorage.getItem('temp-typeOf')),
            growSystem: parseInt(localStorage.getItem('temp-growSystem')),
            growSystemOther: localStorage.getItem('temp-growSystemOther'),
            startedAt: localStorage.getItem('temp-startedAt'),
        }
        this.getDeviceOptions = this.getDeviceOptions.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
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
        localStorage.setItem('temp-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        this.setState({
            [option.selectName]: option.value
        })
        localStorage.setItem('temp-'+[option.selectName], option.value);
    }

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        })
        localStorage.setItem('temp-'+[e.target.name], e.target.checked);
    }

    onCancelClick(e) {
        this.setState({
            referrer: '/productions'
        })
    }

    onNextClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateStep1Input(this.state);
        if (isValid) {
            this.setState({
                referrer: '/add-production-step-2'
            })
        } else {
            this.setState({
                errors: errors
            })

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const {
            name, description, isCommercial, device, environment, typeOf, growSystem, growSystemOther, startedAt,
            errors, referrer
        } = this.state;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionStep1CreateComponent
                name={name}
                description={description}
                isCommercial={isCommercial}
                deviceOptions={this.getDeviceOptions()}
                device={device}
                environmentOptions={PRODUCTION_ENVIRONMENT_OPTION_CHOICES}
                environment={environment}
                typeOfOptions={PRODUCTION_TYPE_OPTION_CHOICES}
                typeOf={typeOf}
                growSystemOptions={PRODUCTION_GROW_SYSTEM_OPTION_CHOICES}
                growSystem={growSystem}
                growSystemOther={growSystemOther}
                startedAt={startedAt}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onCheckboxChange={this.onCheckboxChange}
                errors={errors}
                onCancelClick={this.onCancelClick}
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
)(ProductionStep1CreateContainer);
