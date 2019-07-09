import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceCreateStep1Component from "../../../components/devices/create/deviceCreateStep1Component";
import { pullProfile } from "../../../actions/profileAction";


class DeviceCreateStep1Container extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.onPurchaseDeviceClick = this.onPurchaseDeviceClick.bind(this);
        this.onAuthorizeDeviceClick = this.onAuthorizeDeviceClick.bind(this);
    }

    componentDidMount() {
        const { user } = this.props;

        // Run the async code to fetch the latest profile information from the
        // server and save the latest user's details into our global state.
        // Make the authenticated call to our web-service.
        this.props.pullProfile(user);

        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    }

    onPurchaseDeviceClick(e) {
        e.preventDefault();
        this.props.history.push("/devices/create/step-2-purchase");
    }

    onAuthorizeDeviceClick(e) {
        e.preventDefault();
        localStorage.removeItem("add-device-name");
        localStorage.removeItem("add-device-description");
        localStorage.removeItem("add-device-instruments");
        this.props.history.push("/devices/create/step-2-integrate");
    }

    render() {
        return (
            <DeviceCreateStep1Component
                user={this.props.user}
                onPurchaseDeviceClick={this.onPurchaseDeviceClick}
                onAuthorizeDeviceClick={this.onAuthorizeDeviceClick}
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
    return {
        pullProfile: (user) => {
            dispatch(pullProfile(user))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep1Container);
