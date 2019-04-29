import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullProfile } from "../../actions/profileAction";
import PurchaseDeviceSuccessComponent from "../../components/purchase/purchaseDeviceSuccessComponent";


class PurchaseDeviceSuccessContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slug: this.props.purchaseDevice.slug,
        }
    }

    render() {
        return (
            <PurchaseDeviceSuccessComponent
                slug={this.state.slug}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        purchaseDevice: store.purchaseDeviceState
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
)(PurchaseDeviceSuccessContainer);
