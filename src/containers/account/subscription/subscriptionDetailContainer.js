import React, { Component } from "react";
import { connect } from 'react-redux';

import SubscriptionDetailComponent from "../../../components/account/subscription/subscriptionDetailComponent";
import { pullProfile } from "../../../actions/profileAction";
import { pullSubscription } from "../../../actions/subscriptionActions";


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

    render() {
        return(
            <SubscriptionDetailComponent
                user={this.props.user}
                subscription={this.props.subscription}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        subscription: store.subscriptionState,
        user: store.userState,
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionDetailContainer);
