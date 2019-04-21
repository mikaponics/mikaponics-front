import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { MIKAPONICS_ONBOARDING_CALCULATOR_API_URL } from "../../constants/api";
import { setOnboardingInfo } from "../../actions/onboardingActions";
import { pullProfile } from "../../actions/profileAction";
import OnboardCheckoutComponent from "../../components/onboarding/onboardCheckoutComponent";

const STRIPE_PUBLISHABLE = "pk_test_fw1OJnoeXL2Zp8zMTvxD3s5M";
// const PAYMENT_SERVER_URL = "http://127.0.0.1:8080";
const CURRENCY = 'CAD';
// const DESCRIPTION = "this is a test.";


class OnboardCheckoutContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onboarding: this.props.onboarding,
            user: this.props.user,
            referrer: '',
            errors: {},

            monthlyFee: 0,
            quantity: 0,
            pricePerDevice: 0,
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

        const { user, onboarding } = this.props;

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        const bodyParameters = {
            quantity: onboarding.quantity,
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
                quantity: successResult.data.calculation.quantity,
                pricePerDevice: successResult.data.calculation.pricePerDevice,
                totalBeforeTax: successResult.data.calculation.totalBeforeTax,
                tax: successResult.data.calculation.tax,
                totalAfterTax: successResult.data.calculation.totalAfterTax,
                shipping: successResult.data.calculation.shipping,
                credit: successResult.data.calculation.credit,
                grandTotal: successResult.data.calculation.grandTotal,
                grandTotalInCents: successResult.data.calculation.grandTotalInCents,
            })
        }).catch( (errorResult) => { // ERROR
            console.log(errorResult);
            alert("ERROR WITH ONBOARDING CALCULATOR");
        }).then( () => { // FINALLY
            // Do nothing.
        });

        // Run the async code to fetch the latest profile information from the
        // server and save the latest user's details into our global state.
        // Make the authenticated call to our web-service.
        this.props.pullProfile(user);
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
        this.props.setOnboardingInfo({
            paymentDetail: token,
        });

        // Save our state to be the success page so our component will
        // redirect to the onboarding success page.
        this.setState({
            'referrer': '/onboard/success'
        });
    }

    onBackClick(e) {
        e.preventDefault();
        this.setState({
            referrer: '/onboard/purchase'
        });
    }

    render() {

        const { referrer, errors,
            monthlyFee,
            quantity,
            pricePerDevice,
            totalBeforeTax,
            tax,
            totalAfterTax,
            shipping,
            credit,
            grandTotal,
            grandTotalInCents
        } = this.state;
        // const { user } = this.props;

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
                    quantity={quantity}
                    pricePerDevice={pricePerDevice}
                    totalBeforeTax={totalBeforeTax}
                    tax={tax}
                    totalAfterTax={totalAfterTax}
                    shipping={shipping}
                    credit={credit}
                    grandTotal={grandTotal}
                    errors={errors}
                    onBackClick={this.onBackClick}

                    name="Mikaponics Onboarding"
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
        onboarding: store.onboardingState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setOnboardingInfo: (info) => {
            dispatch(setOnboardingInfo(info))
        },
        pullProfile: (user) => {
            dispatch(pullProfile(user))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardCheckoutContainer);
