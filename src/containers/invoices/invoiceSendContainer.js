import axios from 'axios';
import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { camelizeKeys } from 'humps';

import { setFlashMessage } from "../../actions/flashMessageActions";
import InvoiceSendComponent from "../../components/invoices/invoiceSendComponent";
import { MIKAPONICS_INVOICE_SEND_EMAIL_API_URL } from "../../constants/api";


class InvoiceSendContainer extends Component {

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        this.state = {
            invoiceSlug: slug,
            email: this.props.invoiceDetail.billingEmail,
            referrer: '',
            isLoading: false,
            errors: {}
        };
        this.onSendEmailClick = this.onSendEmailClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
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
            MIKAPONICS_INVOICE_SEND_EMAIL_API_URL+this.props.invoiceDetail.slug, {
                email: this.state.email
            }, config
        ).then( (successResult) => { // SUCCESS

            this.props.setFlashMessage("success", "Invoice email was sent.");

            this.setState({
                isLoading: false,
                errors: {},
                referrer: this.props.invoiceDetail.absoluteUrl
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

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
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
            <InvoiceSendComponent
                email={email}
                errors={errors}
                isLoading={isLoading}
                onChange={this.onChange}
                onSendEmailClick={this.onSendEmailClick}
                backURL={this.props.invoiceDetail.absoluteUrl}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        invoiceDetail: store.invoiceDetailState,
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
)(InvoiceSendContainer);
