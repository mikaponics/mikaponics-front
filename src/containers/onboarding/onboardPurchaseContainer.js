import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { MIKAPONICS_ONBOARDING_VALIDATE_API_URL } from "../../constants/api";
import { attemptLogout } from "../../actions/loginAction";
import OnboardPurchaseComponent from "../../components/onboardPurchaseComponent";


class OnboardPurchaseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfDevices: "1",
            billingFirstName:"",
            billingLastName:"",
            billingCountry:"",
            billingProvince:"",
            billingCity:"",
            billingPostal:"",
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

            user: this.props.user
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const numberOfDevices = this.state.numberOfDevices;
        const user = this.state.user;

        const billingFirstName = this.state.billingFirstName;
        const billingLastName = this.state.billingLastName;
        const billingCountry = this.state.billingCountry;
        const billingProvince = this.state.billingProvince;
        const billingCity = this.state.billingCity;
        const billingPostal = this.state.billingPostal;
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

        var bodyParameters = {
            numberOfDevices: numberOfDevices,

            billingFirstName: billingFirstName,
            billingLastName: billingLastName,
            billingCountry: billingCountry,
            billingProvince: billingProvince,
            billingCity: billingCity,
            billingPostal: billingPostal,
            billingEmail: billingEmail,
            billingTelephone: billingTelephone,

            shippingFirstName: shippingFirstName,
            shippingLastName: shippingLastName,
            shippingCountry: shippingCountry,
            shippingProvince: shippingProvince,
            shippingCity: shippingCity,
            shippingPostal: shippingPostal,
            shippingEmail: shippingEmail,
            shippingTelephone: shippingTelephone,
        };

        axios.post(
            MIKAPONICS_ONBOARDING_VALIDATE_API_URL,
            bodyParameters,
            config
        ).then( (successResult) => {
            console.log(successResult);
            alert("GOOD!")
        }).catch( (errorResult) => {
            console.log(errorResult);
            alert("BAD!");
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
            numberOfDevices, billingFirstName, billingLastName,
            billingCountry, billingProvince, billingCity, billingPostal,
            billingEmail, billingTelephone, shippingFirstName,
            shippingLastName, shippingCountry, shippingProvince,
            shippingCity, shippingPostal,shippingEmail, shippingTelephone,
             user
        } = this.state;

        return (
            <OnboardPurchaseComponent
                numberOfDevices={numberOfDevices}

                billingFirstName={billingFirstName}
                billingLastName={billingLastName}
                billingCountry={billingCountry}
                billingProvince={billingProvince}
                billingCity={billingCity}
                billingPostal={billingPostal}
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
                errors={user.errors}
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
