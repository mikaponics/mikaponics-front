import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { pullProfile } from "../../../actions/profileAction";
import { postPurchaseDevice } from "../../../actions/purchaseDeviceActions";
import { localStorageGetArrayItem, localStorageGetObjectItem } from "../../../helpers/localStorageUtility";
import DeviceCreateStep4PurchaseSubmissionComponent from "../../../components/devices/create/deviceCreateStep4PurchaseSubmissionComponent";


/**
 *  Container responsible for taking the filled out form from the persistent
 *  storage and submit it to Mikaponics API to be processed. While the API
 *  processes the request, this container will display a "please wait" sort
 *  of GUI to let the customer know they need to wait for the transaction
 *  to complete.
 */
class DeviceCreateStep4PurchaseSubmissionContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paymentReceipt: localStorageGetObjectItem("paymentReceipt"),
            referrer: '',
            cart: localStorageGetArrayItem("add-device-cart"),

            billingGivenName: localStorage.getItem("add-device-billingGivenName"),
            billingLastName: localStorage.getItem("add-device-billingLastName"),
            billingCountry: localStorage.getItem("add-device-billingCountry"),
            billingRegion: localStorage.getItem("add-device-billingRegion"),
            billingLocality: localStorage.getItem("add-device-billingLocality"),
            billingPostalCode: localStorage.getItem("add-device-billingPostalCode"),
            billingTelephone: localStorage.getItem("add-device-billingTelephone"),
            billingEmail: localStorage.getItem("add-device-billingEmail"),
            billingStreetAddress: localStorage.getItem("add-device-billingStreetAddress"),

            isShippingDifferentThenBilling: localStorage.getItem("add-device-isShippingDifferentThenBilling"),
            shippingGivenName: localStorage.getItem("add-device-shippingGivenName"),
            shippingLastName: localStorage.getItem("add-device-shippingLastName"),
            shippingCountry: localStorage.getItem("add-device-shippingCountry"),
            shippingRegion: localStorage.getItem("add-device-shippingRegion"),
            shippingLocality: localStorage.getItem("add-device-shippingLocality"),
            shippingPostalCode: localStorage.getItem("add-device-shippingPostalCode"),
            shippingTelephone: localStorage.getItem("add-device-shippingTelephone"),
            shippingEmail: localStorage.getItem("add-device-shippingEmail"),
            shippingStreetAddress: localStorage.getItem("add-device-shippingStreetAddress"),

            totalBeforeTax: localStorage.getItem("add-device-totalBeforeTax"),
            tax: localStorage.getItem("add-device-tax"),
            totalAfterTax: localStorage.getItem("add-device-totalAfterTax"),
            shipping: localStorage.getItem("add-device-shipping"),
            credit: localStorage.getItem("add-device-credit"),
            grandTotal: localStorage.getItem("add-device-grandTotal"),
            grandTotalInCents: localStorage.getItem("add-device-grandTotalInCents"),
        }

        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            referrer: "/purchase/success"
        })
    }

    onFailedSubmissionCallback() {
        // Do nothing.
    }

    componentDidMount() {
        console.log(this.state); //TODO: IMPLEMENT.

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
            <DeviceCreateStep4PurchaseSubmissionComponent />
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
)(DeviceCreateStep4PurchaseSubmissionContainer);
