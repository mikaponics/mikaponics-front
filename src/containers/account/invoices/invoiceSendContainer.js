import axios from 'axios';
import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { setFlashMessage } from "../../../actions/flashMessageActions";
import InvoiceSendComponent from "../../../components/account/invoices/invoiceSendComponent";
import { MIKAPONICS_INVOICE_SEND_EMAIL_API_URL } from "../../../constants/api";
import getCustomAxios from '../../../helpers/customAxios';


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
        });

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode({
            'email': this.state.email
        });

        customAxios.put(
            MIKAPONICS_INVOICE_SEND_EMAIL_API_URL+this.props.invoiceDetail.slug, buffer
        ).then( (successResponse) => { // SUCCESS

            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let data = camelizeKeys(responseData);

            this.props.setFlashMessage("success", "Invoice email was sent.");

            this.setState({
                isLoading: false,
                errors: {},
                referrer: this.props.invoiceDetail.absoluteUrl,
                data: data,
            })

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                // console.log(errorResult);
                // alert("Error fetching latest device.");

                let errors = camelizeKeys(responseData);

                this.setState({
                    isLoading: false,
                    errors: errors
                })

                // The following code will cause the screen to scroll to the top of
                // the page. Please see ``react-scroll`` for more information:
                // https://github.com/fisshy/react-scroll
                var scroll = Scroll.animateScroll;
                scroll.scrollToTop();
            }
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

        console.log("-=>", this.props.invoiceDetail);

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
