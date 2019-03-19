import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { attemptLogout } from "../../actions/loginAction"
import { refreshUser } from "../../actions/profileAction";
import { MIKAPONICS_ONBOARDING_SUBMISSION_API_URL, NOT_INTERESTED_SUBSCRIPTION_STATUS } from "../../constants/api";


class OnboardWelcomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: ''
        }
    }

    render() {
        return (
            <div className="Onboarding-Greetings">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="jumbotron">
                            <h1 className="display-4">Success!</h1>
                            <p className="lead">Your order has been placed.</p>
                            <hr className="my-4" />
                            <p>Please check your email periodically to get the latest information about your shipment.</p>
                        </div>

                        <button className="btn btn-primary" onClick={this.props.onLogoutClick}>Logout</button>

                    </div>
                </div>
            </div>
        );
    }
}


class OnboardSuccessContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            user: this.props.user
        }

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        // Update the global state of the application to store our
        // user's details for the application.
        this.props.attemptLogout()

        // Re-direct.
        this.setState({
            referrer: '/'
        })
    }

    componentDidMount() {
        // Deconstruct the props to get our user and only run the following
        // code if the user has not been subscribed.
        const { user, onboarding } = this.props;
        if (user.subscription_status === NOT_INTERESTED_SUBSCRIPTION_STATUS) {

            // Create our oAuth 2.0 authenticated API header to use with our
            // submission.
            const config = {
                headers: {'Authorization': "Bearer " + user.token}
            };

            // Create the data we will be submitting.
            const bodyParameters = {
                // --- Purchase ---
                number_of_devices: onboarding.numberOfDevices,
                payment_token: onboarding.paymentDetail.id,
                payment_created_at: onboarding.paymentDetail.created,

                // --- Billing address ---
                billing_given_name: onboarding.billingGivenName,
                billing_last_name: onboarding.billingLastName,
                billing_address_country: onboarding.billingAddressCountry,
                billing_address_region: onboarding.billingAddressRegion,
                billing_address_locality: onboarding.billingAddressLocality,
                billing_postal_code: onboarding.billingPostalCode,
                billing_street_address: onboarding.billingStreetAddress,
                billing_post_office_box_number: '',
                billing_email: onboarding.billingEmail,
                billing_telephone: onboarding.billingTelephone,

                // --- Shipping address ---
                shipping_given_name: onboarding.shippingGivenName,
                shipping_last_name: onboarding.shippingLastName,
                shipping_address_country: onboarding.shippingAddressCountry,
                shipping_address_region: onboarding.shippingAddressRegion,
                shipping_address_locality: onboarding.shippingAddressLocality,
                shipping_postal_code: onboarding.shippingPostalCode,
                shipping_street_address: onboarding.shippingStreetAddress,
                shipping_post_office_box_number: '',
                shipping_email: onboarding.shippingEmail,
                shipping_telephone: onboarding.shippingTelephone,
            }

            // Make the authenticated call to our web-service.
            axios.post(
                MIKAPONICS_ONBOARDING_SUBMISSION_API_URL,
                bodyParameters,
                config
            ).then( (successResult) => { // SUCCESS
                console.log(successResult);

                // Run the async code to fetch the latest profile information from the
                // server and save the latest user's details into our global state.
                // Make the authenticated call to our web-service.
                this.props.refreshUser(user);

            }).catch( (errorResult) => { // ERROR
                console.log(errorResult);
                // alert("ERROR WITH ONBOARDING CALCULATOR");
            }).then( () => { // FINALLY
                // Do nothing.
            });

        } // end IF
    } // end FUNC.

    render() {
        const { referrer } = this.state;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Home</li>
                    </ol>
                </nav>

                <OnboardWelcomeComponent
                    onLogoutClick={this.onLogoutClick}
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
        attemptLogout: () => {
            dispatch(
                attemptLogout()
            )
        },
        refreshUser: (user) => {
            dispatch(refreshUser(user))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardSuccessContainer);
