import React, { Component } from "react";
import { connect } from 'react-redux';

import SubscriptionDetailComponent from "../../../components/account/subscription/subscriptionDetailComponent";
import { pullProfile } from "../../../actions/profileAction";
import { pullSubscription } from "../../../actions/subscriptionActions";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class SubscriptionDetailContainer extends Component {
    componentDidMount() {
        const { user } = this.props;

        // Run the async code to fetch the latest profile information from the
        // server and save the latest user's details into our global state.
        // Make the authenticated call to our web-service.
        this.props.pullProfile(user)
        this.props.pullSubscription(user);

        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(); // Clear the messages.

        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        return(
            <SubscriptionDetailComponent
                user={this.props.user}
                subscription={this.props.subscription}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        subscription: store.subscriptionState,
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (user) => {
            dispatch(
                pullProfile(user)
            )
        },
        pullSubscription: (user) => {
            dispatch(
                pullSubscription(user)
            )
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionDetailContainer);
