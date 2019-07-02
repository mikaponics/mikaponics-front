import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { pullProfile } from "../../../actions/profileAction";
import { postPurchaseDevice } from "../../../actions/purchaseDeviceActions";
import PurchaseDeviceSubmissionComponent from "../../../components/purchase/purchaseDeviceSubmissionComponent";


class SubscriptionCheckoutSubmissionContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            slug: this.props.purchaseDevice.slug,
        }

        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            referrer: "/subscription/success"
        });
    }

    onFailedSubmissionCallback() {
        // Do nothing.
    }

    componentDidMount() {
        this.setState({
            referrer: "/subscription/success"
        });


        // // Deconstruct the props to get our user and only run the following
        // // code if the user has not been subscribed.
        // const { purchaseDevice } = this.props;
        //
        // // Defensive code: If we don't have the details then don't run this
        // // function in our code.
        // if (purchaseDevice === undefined || purchaseDevice === null) {
        //     return;
        // }
        //
        // const paymentReceiptString = localStorage.getItem('paymentReceipt');
        // if (paymentReceiptString === undefined || paymentReceiptString === null) {
        //     return;
        // }
        // const paymentReceiptDictionary = JSON.parse(paymentReceiptString);
        //
        // // Add extra fields that our API requires.
        // purchaseDevice['payment_token'] = paymentReceiptDictionary.id;
        // purchaseDevice['payment_created_at'] = paymentReceiptDictionary.created;
        //
        // // SUBMIT OUR PAYMENT TOKEN RECEIVED FROM OUR PAYMENT MERCHANT.
        // // Asynchronously submit our ``update`` to our API endpoint.
        // this.props.postPurchaseDevice(
        //     this.props.user,
        //     purchaseDevice,
        //     this.onSuccessfulSubmissionCallback,
        //     this.onFailedSubmissionCallback
        // );
    } // end FUNC.

    render() {
        if (this.state.referrer !== undefined && this.state.referrer !== null && this.state.referrer !== '') {
            return <Redirect to="/purchase/success" />
        }
        return (
            <PurchaseDeviceSubmissionComponent />
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
        postPurchaseDevice: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                postPurchaseDevice(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionCheckoutSubmissionContainer);
