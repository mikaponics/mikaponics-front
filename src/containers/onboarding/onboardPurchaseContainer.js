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

            shippingFirstName:"",
            shippingLastName:"",
            shippingCountry:"",
            shippingProvince:"",
            shippingCity:"",
            shippingPostal:"",
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
        const numberOfDevices = this.state.numberOfDevices;
        const user = this.state.user;

        const billingGivenName = this.state.billingGivenName;
        const billingLastName = this.state.billingLastName;
        const billingAddressCountry = this.state.billingAddressCountry;
        const billingAddressRegion = this.state.billingAddressRegion;
        const billingAddressLocality = this.state.billingAddressLocality;
        const billingStreetAddress = this.state.billingStreetAddress;
        const billingPostalCode = this.state.billingPostalCode;
        const billingEmail = this.state.billingEmail;
        const billingTelephone = this.state.billingTelephone;

        const shippingFirstName = this.state.shippingFirstName;
        const shippingLastName = this.state.shippingLastName;
        const shippingCountry = this.state.shippingCountry;
        const shippingProvince = this.state.shippingProvince;
        const shippingCity = this.state.shippingCity;
        const shippingPostal = this.state.shippingPostal;
        const shippingEmail = this.state.shippingEmail;
        const shippingTelephone = this.state.shippingTelephone;

        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // Convert our fields to be the fields required for the API service.
        var bodyParameters = {};

        // this.state.errors
        const obj = this.state;
        Object.keys(obj).forEach(key => {
            let value = obj[key];
            let snakeKey = snakeCase(key);
            console.log(snakeKey, value);
            bodyParameters[snakeKey] = value;
        });

        axios.post(
            MIKAPONICS_ONBOARDING_VALIDATE_API_URL,
            bodyParameters,
            config
        ).then( (successResult) => {
            console.log(successResult);
            alert("GOOD!")
        }).catch( (errorResult) => {
            let errors = {};
            // this.state.errors
            const obj = errorResult.response.data;
            Object.keys(obj).forEach(key => {
                let value = obj[key];
                let camelKey = camelCase(key);
                // console.log(camelKey, value);
                errors[camelKey] = value;
            });

            this.setState({
                errors: errors
            })

        }).then( () => {
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
            billingEmail, billingTelephone, shippingFirstName,
            shippingLastName, shippingCountry, shippingProvince,
            shippingCity, shippingPostal,shippingEmail, shippingTelephone,
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

                shippingFirstName={shippingFirstName}
                shippingLastName={shippingLastName}
                shippingCountry={shippingCountry}
                shippingProvince={shippingProvince}
                shippingCity={shippingCity}
                shippingPostal={shippingPostal}
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
