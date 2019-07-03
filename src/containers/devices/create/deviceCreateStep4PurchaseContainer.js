import axios from 'axios';
import { camelizeKeys, decamelize } from 'humps';
import msgpack from 'msgpack-lite';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import DeviceCreateStep4PurchaseComponent from "../../../components/devices/create/deviceCreateStep4PurchaseComponent";
import { localStorageGetArrayItem } from "../../../helpers/localStorageUtility";

const STRIPE_PUBLISHABLE = "pk_test_fw1OJnoeXL2Zp8zMTvxD3s5M";
// const PAYMENT_SERVER_URL = "http://127.0.0.1:8080";
const CURRENCY = 'CAD';
// const DESCRIPTION = "this is a test.";


class DeviceCreateStep4PurchaseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

            totalBeforeTax: 0,
            tax: 0,
            totalAfterTax: 0,
            shipping: 0,
            credit: 0,
            grandTotal: 0,
            grandTotalInCents: 0,
        }
        this.onBackClick = this.onBackClick.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE:
        // INSTEAD OF CREATING AN ACTION USING REDUX, LETS JUST MAKE AN API
        // CALL HERE.
        //--------------------------------------------------------------------//
        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            headers: {
                'Authorization': "Bearer " + this.props.user.token,
                'Content-Type': 'application/msgpack;',
                'Accept': 'application/msgpack',
            },
            responseType: 'arraybuffer'
        });

        // Generate the URL.
        let aURL = process.env.REACT_APP_API_HOST+'/api/calculate-purchase-device-receipt';

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode({
            'cart': this.state.cart, // Make `snake_case` for the API.
            'shipping_country': this.state.shippingCountry,
            'shipping_region': this.state.shippingRegion,
            'shipping_locality': this.state.shippingLocality
        });

        // Make the API call.
        customAxios.post(aURL, buffer).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};

            console.log(data); // For debugging purposes.

            // Update the global state of ONLY THIS PAGE to store our data.
            this.setState({
                totalBeforeTax: data.totalBeforeTax,
                tax: data.tax,
                totalAfterTax: data.totalAfterTax,
                shipping: data.shipping,
                credit: data.credit,
                grandTotal: data.grandTotal,
                grandTotalInCents: data.grandTotalInCents,
            });

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullAlertItemList | error:", errors); // For debuggin purposes only.

                //TODO: DO SOMETHING
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });
        //--------------------------------------------------------------------//
    }

    /**
     *  Function used to callback to this parent from the ``Stripe`` compoent
     *  when the transaction was successful and the token was returned.
     */
    onToken = (token) => {
        console.log(token); // For debugging purposes only.

        // Update our global application state to save the results returned
        // by Stripe.com payment gateway & merchant services. This payment
        // details we will submit to our API web-service.
        localStorage.setItem("paymentReceipt", JSON.stringify(token))

        // Save our state to be the success page so our component will
        // redirect to the purchaseDevice success page.
        this.setState({
            'referrer': '/devices/create/step-4-purchase-submission'
        });
    }

    onBackClick(e) {
        e.preventDefault();
        this.setState({
            referrer: '/devices/create/step-3-purchase'
        });
    }

    render() {

        const {
            referrer,

            billingGivenName, billingLastName,
            billingCountry, billingRegion, billingLocality,
            billingPostalCode, billingStreetAddress,
            billingEmail, billingTelephone,

            isShippingDifferentThenBilling, shippingGivenName,
            shippingLastName, shippingCountry, shippingRegion,
            shippingLocality, shippingStreetAddress,
            shippingPostalCode,shippingEmail, shippingTelephone,

            errors,
            totalBeforeTax,
            tax,
            totalAfterTax,
            shipping,
            credit,
            grandTotal,
            grandTotalInCents,
        } = this.state;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        console.log(this.state);

        return (
            <div>
                <DeviceCreateStep4PurchaseComponent
                    totalBeforeTax={totalBeforeTax}
                    tax={tax}
                    totalAfterTax={totalAfterTax}
                    shipping={shipping}
                    credit={credit}
                    grandTotal={grandTotal}
                    errors={errors}
                    onBackClick={this.onBackClick}

                    name="Mikaponics Telemetry Device"
                    description=""
                    onToken={(token) => this.onToken(token)}
                    amountInCents={grandTotalInCents}
                    currency={CURRENCY}
                    stripeKey={STRIPE_PUBLISHABLE}

                    billingGivenName={billingGivenName}
                    billingLastName={billingLastName}
                    billingCountry={billingCountry}
                    billingRegion={billingRegion}
                    billingLocality={billingLocality}
                    billingStreetAddress={billingStreetAddress}
                    billingPostalCode={billingPostalCode}
                    billingEmail={billingEmail}
                    billingTelephone={billingTelephone}

                    isShippingDifferentThenBilling={isShippingDifferentThenBilling}
                    shippingGivenName={shippingGivenName}
                    shippingLastName={shippingLastName}
                    shippingCountry={shippingCountry}
                    shippingRegion={shippingRegion}
                    shippingLocality={shippingLocality}
                    shippingStreetAddress={shippingStreetAddress}
                    shippingPostalCode={shippingPostalCode}
                    shippingEmail={shippingEmail}
                    shippingTelephone={shippingTelephone}
                />
            </div>
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep4PurchaseContainer);
