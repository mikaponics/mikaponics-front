import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { pullProfile } from "../../../actions/profileAction";
import { postSubscription } from "../../../actions/subscriptionActions";
import SubscriptionCheckoutSubmissionComponent from "../../../components/account/subscription/subscriptionCheckoutSubmissionComponent";


class SubscriptionCheckoutSubmissionContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
        }

        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            referrer: "/subscription/checkout/success"
        });
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })
    }

    componentDidMount() {
        // Deconstruct the props to get our user and only run the following
        // code if the user has not been subscribed.
        const { subscription } = this.props;

        // Defensive code: If we don't have the details then don't run this
        // function in our code.
        if (subscription === undefined || subscription === null) {
            return;
        }

        const paymentReceiptString = localStorage.getItem('subscriptionPaymentReceipt');
        if (paymentReceiptString === undefined || paymentReceiptString === null) {
            return;
        }
        const paymentReceiptDictionary = JSON.parse(paymentReceiptString);

        // Add extra fields that our API requires.
        subscription['payment_token'] = paymentReceiptDictionary.id;
        subscription['payment_created_at'] = paymentReceiptDictionary.created;

        // SUBMIT OUR PAYMENT TOKEN RECEIVED FROM OUR PAYMENT MERCHANT.
        // Asynchronously submit our ``update`` to our API endpoint.
        this.props.postSubscription(
            this.props.user,
            subscription,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    render() {
        if (this.state.referrer !== undefined && this.state.referrer !== null && this.state.referrer !== '') {
            return <Redirect to={this.state.referrer} />
        }
        return (
            <SubscriptionCheckoutSubmissionComponent />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        subscription: store.subscriptionState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (user) => {
            dispatch(pullProfile(user))
        },
        postSubscription: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                postSubscription(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionCheckoutSubmissionContainer);
