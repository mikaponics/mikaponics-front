import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProductionInspectionGetOrCreateComponent from "../../../components/production/inspection/productionInspectionGetOrCreateComponent";


class ProductionInspectionGetOrCreateContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            slug: null,
        }

        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            referrer: "/onboard/success"
        })
    }

    onFailedSubmissionCallback() {
        // Do nothing.
    }

    componentDidMount() {
        // // Deconstruct the props to get our user and only run the following
        // // code if the user has not been subscribed.
        // const { onboarding } = this.props;
        //
        // // Defensive code: If we don't have the details then don't run this
        // // function in our code.
        // if (onboarding === undefined || onboarding === null) {
        //     return;
        // }
        //
        // const paymentReceiptString = localStorage.getItem('paymentReceipt');
        // if (paymentReceiptString === undefined || paymentReceiptString === null) {
        //     return;
        // }
        // const paymentReceiptDictionary = JSON.parse(paymentReceiptString);
        //
        // // Add extra fields that our API requires.
        // onboarding['payment_token'] = paymentReceiptDictionary.id;
        // onboarding['payment_created_at'] = paymentReceiptDictionary.created;
        //
        // // SUBMIT OUR PAYMENT TOKEN RECEIVED FROM OUR PAYMENT MERCHANT.
        // // Asynchronously submit our ``update`` to our API endpoint.
        // this.props.postOnboarding(
        //     this.props.user,
        //     onboarding,
        //     this.onSuccessfulSubmissionCallback,
        //     this.onFailedSubmissionCallback
        // );

    } // end FUNC.

    render() {
        return (
            <ProductionInspectionGetOrCreateComponent />
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
        // pullProfile: (user) => {
        //     dispatch(pullProfile(user))
        // },
        // postOnboarding: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
        //     dispatch(
        //         postOnboarding(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
        //     )
        // },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionGetOrCreateContainer);
