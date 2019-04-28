import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullOnboarding } from "../../actions/onboardingActions";
import OnboardInvoiceComponent from "../../components/onboarding/onboardInvoiceComponent";


class OnboardInvoiceContainer extends Component {

    constructor(props) {
        super(props);
        this.onPrintClick = this.onPrintClick.bind(this)
    }

    onPrintClick() {
        window.print();
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullOnboarding(this.props.user)  // Fetch latest data.
    } // end FUNC.

    render() {
        return (
            <OnboardInvoiceComponent
                onboarding={this.props.onboarding}
                onPrintClick={this.onPrintClick}
            />
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
