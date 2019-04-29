import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullProfile } from "../../actions/profileAction";
import { postPurchaseDevice } from "../../actions/purchaseDeviceActions";
import PurchaseDeviceSuccessComponent from "../../components/purchase/purchaseDeviceSuccessComponent";


class PurchaseDeviceSuccessContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            slug: this.props.purchaseDevice.slug,
        }

        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            referrer: "/dashboard"
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
        const { purchaseDevice } = this.props;

        // Defensive code: If we don't have the details then don't run this
        // function in our code.
        if (purchaseDevice === undefined || purchaseDevice === null) {
            return;
        }

        const paymentReceiptString = localStorage.getItem('paymentReceipt');
        if (paymentReceiptString === undefined || paymentReceiptString === null) {
            return;
        }
        const paymentReceiptDictionary = JSON.parse(paymentReceiptString);

        // Add extra fields that our API requires.
        purchaseDevice['payment_token'] = paymentReceiptDictionary.id;
        purchaseDevice['payment_created_at'] = paymentReceiptDictionary.created;

        // SUBMIT OUR PAYMENT TOKEN RECEIVED FROM OUR PAYMENT MERCHANT.
        // Asynchronously submit our ``update`` to our API endpoint.
        this.props.postPurchaseDevice(
            this.props.user,
            purchaseDevice,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );

    } // end FUNC.

    render() {
        return (
            <PurchaseDeviceSuccessComponent
                slug={this.state.slug}
            />
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
        pullProfile: (user) => {
            dispatch(pullProfile(user))
        },
        postPurchaseDevice: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                postPurchaseDevice(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PurchaseDeviceSuccessContainer);
