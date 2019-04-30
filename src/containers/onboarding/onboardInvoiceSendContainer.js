import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import { setFlashMessage } from "../../actions/flashMessageActions";
import OnboardInvoiceSendComponent from "../../components/onboarding/onboardInvoiceSendComponent";


class OnboardInvoiceSendContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            referrer: '',
            isLoading: false
        };
        this.onSendEmailClick = this.onSendEmailClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.setState({
            email: this.props.onboarding.billingEmail
        })
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    onSendEmailClick(e) {
        e.preventDefault();
        this.props.setFlashMessage("success", "Invoice email was sent.");
        this.setState({
            referrer: '/onboard/receipt'
        });
    }

    onChange(option) {
        this.setState({
            [option.selectName]: option.value
        })
    }

    render() {
        const { email, referrer} = this.state;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        let errors = {};
        let isLoading = false;
        if (this.props.onboarding !== undefined && this.props.onboarding !== null) {
            errors = this.props.onboarding.errors;
            if (errors === undefined || errors === null) {
                errors = {};
            }
            isLoading = this.props.onboarding.isAPIRequestRunning;
        }

        return (
            <OnboardInvoiceSendComponent
                email={email}
                errors={errors}
                isLoading={isLoading}
                onChange={this.props.onChange}
                onSendEmailClick={this.onSendEmailClick}
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardInvoiceSendContainer);
