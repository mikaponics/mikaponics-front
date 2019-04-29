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
            errors: {},

            invoiceItems: this.props.purchaseDevice.invoiceItems,
            totalBeforeTax:  this.props.purchaseDevice.totalBeforeTax,
            tax:  this.props.purchaseDevice.tax,
            totalAfterTax:  this.props.purchaseDevice.totalAfterTax,
            shipping:  this.props.purchaseDevice.shipping,
            credit:  this.props.purchaseDevice.credit,
            grandTotal:  this.props.purchaseDevice.grandTotal,
            grandTotalInCents:  this.props.purchaseDevice.grandTotalInCents,
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
            'referrer': '/purchase/success'
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
            errors,
            invoiceItems,
            totalBeforeTax,
            tax,
            totalAfterTax,
            shipping,
            credit,
            grandTotal,
            grandTotalInCents
        } = this.state;
        const { user } = this.props;

        const {
            billingEmail
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
                    billingEmail={billingEmail}
                    amountInCents={grandTotalInCents}
                    currency={CURRENCY}
                    stripeKey={STRIPE_PUBLISHABLE}
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
