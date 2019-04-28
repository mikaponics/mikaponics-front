import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { snakeCase } from 'lodash';

import { pullProfile } from "../../actions/profileAction";
import { pullOnboarding, postOnboarding } from "../../actions/onboardingActions";
import { MIKAPONICS_ONBOARDING_SUBMISSION_API_URL, NOT_INTERESTED_SUBSCRIPTION_STATUS } from "../../constants/api";
import OnboardSuccessComponent from "../../components/onboarding/onboardSuccessComponent";


class OnboardSuccessContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            user: this.props.user
        }

        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            referrer: "/onboard"
        })
    }

    onFailedSubmissionCallback() {
        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Deconstruct the props to get our user and only run the following
        // code if the user has not been subscribed.
        const { user, onboarding } = this.props;

        // Defensive code: If we don't have the details then don't run this
        // function in our code.
        if (onboarding === undefined || onboarding === null) {
            return;
        }

        const paymentReceiptString = localStorage.getItem('paymentReceipt');
        if (paymentReceiptString === undefined || paymentReceiptString === null) {
            return;
        }
        const paymentReceiptDictionary = JSON.parse(paymentReceiptString);

        // Add extra fields that our API requires.
        onboarding['payment_token'] = paymentReceiptDictionary.id;
        onboarding['payment_created_at'] = paymentReceiptDictionary.created;

        // SUBMIT OUR PAYMENT TOKEN RECEIVED FROM OUR PAYMENT MERCHANT.
        // Asynchronously submit our ``update`` to our API endpoint.
        this.props.postOnboarding(
            this.props.user,
            onboarding,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );

    } // end FUNC.

    render() {
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
        pullProfile: (user) => {
            dispatch(pullProfile(user))
        },
        postOnboarding: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                postOnboarding(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardSuccessContainer);
