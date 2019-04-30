import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullOnboarding } from "../../actions/onboardingActions";
import { clearFlashMessage } from "../../actions/flashMessageActions";
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
        return (
            <OnboardInvoiceComponent
                onboarding={this.props.onboarding}
                flashMessage={this.props.flashMessage}
                onPrintClick={this.onPrintClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        onboarding: store.onboardingState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullOnboarding: (user) => {
            dispatch(pullOnboarding(user))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardInvoiceContainer);
