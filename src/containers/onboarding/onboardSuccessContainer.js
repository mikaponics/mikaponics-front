import axios from 'axios';
import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { snakeCase } from 'lodash';

import { attemptLogout } from "../../actions/loginAction"
import { refreshUser } from "../../actions/profileAction";
import { MIKAPONICS_ONBOARDING_SUBMISSION_API_URL, NOT_INTERESTED_SUBSCRIPTION_STATUS } from "../../constants/api";
import OnboardSuccessComponent from "../../components/onboarding/onboardSuccessComponent";


class OnboardSuccessContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            user: this.props.user
        }
    }

    componentDidMount() {
        // Deconstruct the props to get our user and only run the following
        // code if the user has not been subscribed.
        const { user, onboarding } = this.props;
        if (user.subscriptionStatus === NOT_INTERESTED_SUBSCRIPTION_STATUS) {

            // Create our oAuth 2.0 authenticated API header to use with our
            // submission.
            const config = {
                headers: {'Authorization': "Bearer " + user.token}
            };

            // Create the data we will be submitting.
            let bodyParameters = {};
            Object.keys(onboarding).forEach(key => {
                let value = onboarding[key];
                let snakeKey = snakeCase(key);
                // console.log(snakeKey, value); // For debugging purposes.
                bodyParameters[snakeKey] = value;
            });

            // Add extra fields that our API requires.
            bodyParameters['payment_token'] = onboarding.paymentDetail.id;
            bodyParameters['payment_created_at'] = onboarding.paymentDetail.created;

            // // For debugging purposes only.
            // console.log(bodyParameters);

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
                alert("ERROR WITH ONBOARDING SUBMISSION.");
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
                        <li className="breadcrumb-item">
                            <Link to="/onboard">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Success</li>
                    </ol>
                </nav>

                <OnboardSuccessComponent />

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
