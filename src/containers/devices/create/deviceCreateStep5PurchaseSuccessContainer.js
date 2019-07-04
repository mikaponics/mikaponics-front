import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullProfile } from "../../../actions/profileAction";
import DeviceCreateStep5PurchaseSuccessComponent from "../../../components/devices/create/deviceCreateStep5PurchaseSuccessComponent";


class DeviceCreateStep5PurchaseSuccessContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invoiceSlug: localStorage.getItem('add-device-invoice-slug')
        }
    }

    render() {
        return (
            <DeviceCreateStep5PurchaseSuccessComponent
                invoiceSlug={this.state.invoiceSlug}
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
)(DeviceCreateStep5PurchaseSuccessContainer);
