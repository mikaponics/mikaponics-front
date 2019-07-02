import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullProfile } from "../../../actions/profileAction";
import SubscriptionCheckoutSuccessComponent from "../../../components/account/subscription/subscriptionCheckoutSuccessComponent";


class SubscriptionCheckoutSuccessContainer extends Component {
    componentDidMount() {
        this.props.pullProfile(this.props.user)
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    render() {
        return (
            <SubscriptionCheckoutSuccessComponent />
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionCheckoutSuccessContainer);
