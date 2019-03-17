import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { camelCase, snakeCase } from 'lodash';

import { MIKAPONICS_ONBOARDING_CALCULATOR_API_URL } from "../../constants/api";
import { setOnboardingPurchaseInfo } from "../../actions/onboardingActions";
import OnboardCheckoutComponent from "../../components/onboarding/onboardCheckoutComponent";
import StripeComponent from "../../components/stripeComponent";

const STRIPE_PUBLISHABLE = "pk_test_fw1OJnoeXL2Zp8zMTvxD3s5M";
const PAYMENT_SERVER_URL = "http://127.0.0.1:8080";
const CURRENCY = 'CAD';
const DESCRIPTION = "this is a test.";

const fromCadToCent = amount => amount * 100;


class OnboardCheckoutContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onboarding: this.props.onboarding,
            user: this.props.user,
            referrer: '',
            errors: {},

            monthlyFee: 0,
            numberOfDevices: 0,
            pricePerDevice: 0,
            totalBeforeTax: 0,
            tax: 0,
            totalAfterTax: 0,
            shipping: 0,
            credit: 0,
            grandTotal: 0,
        }
    }

    componentDidMount() {
        const { user, onboarding } = this.props;

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        const bodyParameters = {
            number_of_devices: onboarding.numberOfDevices,
            shipping_address_country: "Canada",
            shipping_address_region: "Ontario",
        }

        // Make the authenticated call to our web-service.
        axios.post(
            MIKAPONICS_ONBOARDING_CALCULATOR_API_URL,
            bodyParameters,
            config
        ).then( (successResult) => { // SUCCESS
            //console.log(successResult);
            this.setState({
                monthlyFee: successResult.data.calculation.monthlyFee,
                numberOfDevices: successResult.data.calculation.numberOfDevices,
                pricePerDevice: successResult.data.calculation.pricePerDevice,
                totalBeforeTax: successResult.data.calculation.totalBeforeTax,
                tax: successResult.data.calculation.tax,
                totalAfterTax: successResult.data.calculation.totalAfterTax,
                shipping: successResult.data.calculation.shipping,
                credit: successResult.data.calculation.credit,
                grandTotal: successResult.data.calculation.grandTotal,
            })
        }).catch( (errorResult) => { // ERROR
            console.log(errorResult);
            alert("ERROR WITH ONBOARDING CALCULATOR");
        }).then( () => { // FINALLY
            // Do nothing.
        });
    }

    /**
     *  Function used to callback to this parent from the ``Stripe`` compoent
     *  when the transaction was successful and the token was returned.
     */
    onToken = (token) => {
        console.log(token);
        alert("TODO: SUBMIT TOKEN TO BACKEND.");
        this.setState({
            'referrer': '/onboard/success'
        });
    }

    render() {

        const { referrer, errors,
            monthlyFee,
            numberOfDevices,
            pricePerDevice,
            totalBeforeTax,
            tax,
            totalAfterTax,
            shipping,
            credit,
            grandTotal
        } = this.state;
        const { user } = this.props;

        const {
            billingEmail
        } = this.props.onboarding;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        return (
            <div>
                <OnboardCheckoutComponent
                    monthlyFee={monthlyFee}
                    numberOfDevices={numberOfDevices}
                    pricePerDevice={pricePerDevice}
                    totalBeforeTax={totalBeforeTax}
                    tax={tax}
                    totalAfterTax={totalAfterTax}
                    shipping={shipping}
                    credit={credit}
                    grandTotal={grandTotal}
                    errors={errors}

                    name="Mikaponics Onboarding"
                    description=""
                    onToken={(token) => this.onToken(token)}
                    billingEmail={billingEmail}
                    amountInCents={fromCadToCent(grandTotal)}
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
        onboarding: store.onboardingState
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardCheckoutContainer);
