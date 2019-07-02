import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { pullProfile } from "../../../actions/profileAction";
import { deleteSubscription } from "../../../actions/subscriptionActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import SubscriptionCancellationComponent from "../../../components/account/subscription/subscriptionCancellationComponent";


class SubscriptionCheckoutCancellationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            errors: {},
            referrer: null,
        }

        // Attach the custom functions we will be using.
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    componentDidMount() {
        this.props.pullProfile(this.props.user)
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    onSuccessfulSubmissionCallback(result) {
        this.props.setFlashMessage("success", "The subscription has been successfully been cancelled.");
        this.setState({
            isLoading: false,
            referrer: "/subscription",
        });
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            isLoading: false,
        });
    }

    onDeleteClick(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
        })
        this.props.deleteSubscription(
            this.props.user,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    render() {
        if (this.state.referrer !== undefined && this.state.referrer !== null && this.state.referrer !== '') {
            return <Redirect to={this.state.referrer} />
        }
        return (
            <SubscriptionCancellationComponent
                onDeleteClick={this.onDeleteClick}
                isLoading={this.state.isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (user) => {
            dispatch(pullProfile(user))
        },
        deleteSubscription: (user, successCallback, failedCallback) => {
            dispatch(deleteSubscription(user, successCallback, failedCallback))
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionCheckoutCancellationContainer);
