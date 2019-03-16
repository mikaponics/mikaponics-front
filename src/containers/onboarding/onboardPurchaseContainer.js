import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { camelCase, snakeCase } from 'lodash';

import { MIKAPONICS_ONBOARDING_VALIDATE_API_URL } from "../../constants/api";
import { attemptLogout } from "../../actions/loginAction";
import OnboardPurchaseComponent from "../../components/onboardPurchaseComponent";


class OnboardPurchaseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfDevices: "1",
            billingGivenName:"",
            billingLastName:"",
            billingAddressCountry:"",
            billingAddressRegion:"",
            billingAddressLocality:"",
            billingStreetAddress:"",
            billingPostalCode:"",
            billingEmail:"",
            billingTelephone:"",

            shippingGivenName:"",
            shippingLastName:"",
            shippingAddressCountry:"",
            shippingAddressRegion:"",
            shippingAddressLocality:"",
            shippinggStreetAddress:"",
            shippingPostalCode:"",
            shippingEmail:"",
            shippingTelephone:"",

            user: this.props.user,

            errors: {},
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        // Get our `user` from the state.
        const user = this.state.user;

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // Convert our fields to be the fields required for the API service.
        var bodyParameters = {};
        const obj = this.state;
        Object.keys(obj).forEach(key => {
            let value = obj[key];
            let snakeKey = snakeCase(key);
            // console.log(snakeKey, value); // For debugging purposes.
            bodyParameters[snakeKey] = value;
        });

        // Make the authenticated call to our web-service.
        axios.post(
            MIKAPONICS_ONBOARDING_VALIDATE_API_URL,
            bodyParameters,
            config
        ).then( (successResult) => { // SUCCESS
            console.log(successResult);
            alert("GOOD!")
        }).catch( (errorResult) => { // ERROR
            // THE FOLLOWING CODE WILL CONVERT ALL THE "CAMCEL CASE"
            // KEYS IN THE DICTIONARY TO BE "SNAKE CASE" KEYS TO SUPPORT
            // THE STANDARD OF OUR API-WEB SERVICE.
            let errors = {};
            const obj = errorResult.response.data;
            Object.keys(obj).forEach(key => {
                let value = obj[key];
                let camelKey = camelCase(key);
                // console.log(camelKey, value); // For debugging purposes.
                errors[camelKey] = value;
            });

            // SAVE OUR ERROR.
            this.setState({
                errors: errors
            })

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

        const {
            numberOfDevices, billingGivenName, billingLastName,
            billingAddressCountry, billingAddressRegion, billingAddressLocality,
            billingPostalCode, billingStreetAddress,
            billingEmail, billingTelephone, shippingGivenName,
            shippingLastName, shippingAddressCountry, shippingAddressRegion,
            shippingAddressLocality, shippingStreetAddress,
            shippingPostalCode,shippingEmail, shippingTelephone,
            errors, user
        } = this.state;

        return (
            <OnboardPurchaseComponent
                numberOfDevices={numberOfDevices}

                billingGivenName={billingGivenName}
                billingLastName={billingLastName}
                billingAddressCountry={billingAddressCountry}
                billingAddressRegion={billingAddressRegion}
                billingAddressLocality={billingAddressLocality}
                billingStreetAddress={billingStreetAddress}
                billingPostalCode={billingPostalCode}
                billingEmail={billingEmail}
                billingTelephone={billingTelephone}

                shippingGivenName={shippingGivenName}
                shippingLastName={shippingLastName}
                shippingAddressCountry={shippingAddressCountry}
                shippingAddressRegion={shippingAddressRegion}
                shippingAddressLocality={shippingAddressLocality}
                shippingStreetAddress={shippingStreetAddress}
                shippingPostalCode={shippingPostalCode}
                shippingEmail={shippingEmail}
                shippingTelephone={shippingTelephone}

                onChange={this.onChange}
                onSubmit={this.onSubmit}
                user={user}
                errors={errors}
            />
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
        attemptLogout: () => {
            dispatch(
                attemptLogout()
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardPurchaseContainer);
