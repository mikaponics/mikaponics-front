import axios from 'axios';                           // API
import { camelizeKeys, decamelizeKeys } from 'humps';    // API
import msgpack from 'msgpack-lite';                  // API
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { pullProfile } from "../../../actions/profileAction";
import { localStorageGetArrayItem, localStorageGetObjectItem } from "../../../helpers/localStorageUtility";
import DeviceCreateStep4PurchaseSubmissionComponent from "../../../components/devices/create/deviceCreateStep4PurchaseSubmissionComponent";
import getCustomAxios from '../../../helpers/customAxios';


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

    onSuccessfulSubmissionCallback(data) {
        // Update our persistent storage.
        // STEP 1: Save our new invoice slug.
        localStorage.setItem('add-device-invoice-slug', data.invoiceSlug);

        // STEP 2: clear our form.
        localStorage.removeItem("paymentReceipt");
        localStorage.removeItem("add-device-cart");
        localStorage.removeItem("add-device-billingGivenName");
        localStorage.removeItem("add-device-billingLastName");
        localStorage.removeItem("add-device-billingCountry");
        localStorage.removeItem("add-device-billingRegion");
        localStorage.removeItem("add-device-billingLocality");
        localStorage.removeItem("add-device-billingPostalCode");
        localStorage.removeItem("add-device-billingTelephone");
        localStorage.removeItem("add-device-billingEmail");
        localStorage.removeItem("add-device-billingStreetAddress");
        localStorage.removeItem("add-device-isShippingDifferentThenBilling");
        localStorage.removeItem("add-device-shippingGivenName");
        localStorage.removeItem("add-device-shippingLastName");
        localStorage.removeItem("add-device-shippingCountry");
        localStorage.removeItem("add-device-shippingRegion");
        localStorage.removeItem("add-device-shippingLocality");
        localStorage.removeItem("add-device-shippingPostalCode");
        localStorage.removeItem("add-device-shippingTelephone");
        localStorage.removeItem("add-device-shippingEmail");
        localStorage.removeItem("add-device-shippingStreetAddress");
        localStorage.removeItem("add-device-totalBeforeTax");
        localStorage.removeItem("add-device-tax");
        localStorage.removeItem("add-device-totalAfterTax");
        localStorage.removeItem("add-device-shipping");
        localStorage.removeItem("add-device-credit");
        localStorage.removeItem("add-device-grandTotal");
        localStorage.removeItem("add-device-grandTotalInCents");

        // Update our state
        this.setState({
            referrer: "/devices/create/step-5-purchase-success"
        });
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors,
        })
    }

    componentDidMount() {
        // DEVELOPERS NOTE:
        // INSTEAD OF CREATING AN ACTION USING REDUX, LETS JUST MAKE AN API
        // CALL HERE.
        //--------------------------------------------------------------------//

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL.
        let aURL = process.env.REACT_APP_API_HOST+'/api/purchase';

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(this.state);

        // Encode from JS Object to MessagePack (Buffer)
        const buffer = msgpack.encode(decamelizedData);

        // Make the API call.
        customAxios.post(aURL, buffer).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};

            // Let our page know we had success with the API.
            this.onSuccessfulSubmissionCallback(data);

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Add our API errors to our page.
                this.onFailedSubmissionCallback(errors);
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });
        //--------------------------------------------------------------------//

    } // end FUNC.

    render() {
        if (this.state.referrer !== undefined && this.state.referrer !== null && this.state.referrer !== '') {
            return <Redirect to={this.state.referrer} />
        }
        return (
            <DeviceCreateStep4PurchaseSubmissionComponent errors={this.state.errors} />
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep4PurchaseSubmissionContainer);
