import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullOnboarding } from "../../actions/onboardingActions";
import OnboardInvoiceComponent from "../../components/onboarding/onboardInvoiceComponent";


class OnboardInvoiceContainer extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullOnboarding(this.props.user)  // Fetch latest data.
    } // end FUNC.

    render() {
        return (
            <OnboardInvoiceComponent onboarding={this.props.onboarding} />
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
        pullOnboarding: (user) => {
            dispatch(pullOnboarding(user))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardInvoiceContainer);
