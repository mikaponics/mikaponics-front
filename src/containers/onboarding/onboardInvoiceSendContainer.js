import axios from 'axios';
import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { camelizeKeys } from 'humps';

import { setFlashMessage } from "../../actions/flashMessageActions";
import OnboardInvoiceSendComponent from "../../components/onboarding/onboardInvoiceSendComponent";
import { MIKAPONICS_INVOICE_SEND_EMAIL_API_URL } from "../../constants/api";


class OnboardInvoiceSendContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            referrer: '',
            isLoading: false,
            errors: {}
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

        this.setState({
            isLoading: true,
            errors: {}
        })

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + this.props.user.token}
        };

        axios.put(
            MIKAPONICS_INVOICE_SEND_EMAIL_API_URL+this.props.onboarding.slug, {
                email: this.state.email
            }, config
        ).then( (successResult) => { // SUCCESS

            this.props.setFlashMessage("success", "Invoice email was sent.");

            this.setState({
                isLoading: false,
                errors: {},
                referrer: '/onboard/receipt'
            })

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            // alert("Error fetching latest device.");

            const responseData = errorResult.response.data;
            let errors = camelizeKeys(responseData);

            console.log(errors);
            this.setState({
                isLoading: false,
                errors: errors
            })

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();

        }).then( () => { // FINALLY
            // Do nothing.
        });
    }

    onChange(option) {
        this.setState({
            [option.selectName]: option.value
        })
    }

    render() {
        const { email, errors, isLoading, referrer} = this.state;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
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
