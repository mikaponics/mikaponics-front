import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceCreateStep2IntegrateComponent from "../../../components/devices/create/deviceCreateStep2IntegrateComponent";
import { pullProfile } from "../../../actions/profileAction";
import {
    // localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem, localStorageGetDateItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';
import { INSTRUMENT_OPTIONS } from "../../../constants/api";
import { validateIntegrateStep2Input } from "../../../validations/addDeviceValidator";


class DeviceCreateStep2IntegrateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: localStorageGetArrayItem("add-device-instruments"),
            errors: {}
            isLoading: true,
        }
        this.onMultiChange = this.onMultiChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            instrumentOptions: INSTRUMENT_OPTIONS
        });

        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    }

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            instruments: selectedOptions,
        });

        // // Set all the tags we have selected to the STORAGE.
        const key = 'add-device-' + args[1].name;
        localStorageSetObjectOrArrayItem(key, selectedOptions);
    }

    onNextClick(e) {
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateIntegrateStep2Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/devices/create/step-3-integrate");
            return;
        }

        // CASE 2 OF 2: Validation failed.
        this.setState({
            errors: errors, isLoading: false,
        });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    render() {
        return (
            <DeviceCreateStep2IntegrateComponent
                user={this.props.user}
                instruments={this.state.instruments}
                instrumentOptions={this.state.instrumentOptions}
                errors={this.state.errors}
                isLoading={this.state.isLoading}
                onMultiChange={this.onMultiChange}
                onNextClick={this.onNextClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep2IntegrateContainer);
