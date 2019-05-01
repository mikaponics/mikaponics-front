import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import OnboardCheckoutComponent from "../../components/purchase/checkoutDeviceComponent";

const STRIPE_PUBLISHABLE = "pk_test_fw1OJnoeXL2Zp8zMTvxD3s5M";
// const PAYMENT_SERVER_URL = "http://127.0.0.1:8080";
const CURRENCY = 'CAD';
// const DESCRIPTION = "this is a test.";


class CheckoutDeviceContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            referrer: '',
        }
        this.onBackClick = this.onBackClick.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
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
            'referrer': '/purchase/submission'
        });
    }

    onBackClick(e) {
        e.preventDefault();
        this.setState({
            referrer: '/purchase'
        });
    }

    render() {

        const {
            referrer,
        } = this.state;

        const {
            invoiceItems,
            errors,
            totalBeforeTax,
            tax,
            totalAfterTax,
            shipping,
            credit,
            grandTotal,
            grandTotalInCents,

            billingGivenName, billingLastName,
            billingCountry, billingRegion, billingLocality,
            billingPostalCode, billingStreetAddress,
            billingEmail, billingTelephone,

            isShippingDifferentThenBilling, shippingGivenName,
            shippingLastName, shippingCountry, shippingRegion,
            shippingLocality, shippingStreetAddress,
            shippingPostalCode,shippingEmail, shippingTelephone,
        } = this.props.purchaseDevice;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        return (
            <div>
                <OnboardCheckoutComponent
                    invoiceItems={invoiceItems}
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
)(CheckoutDeviceContainer);
