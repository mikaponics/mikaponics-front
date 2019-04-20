import axios from 'axios';
import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { camelCase, snakeCase } from 'lodash';

import { MIKAPONICS_ONBOARDING_VALIDATE_API_URL } from "../../constants/api";
import { setOnboardingInfo } from "../../actions/onboardingActions";
import OnboardPurchaseComponent from "../../components/onboarding/onboardPurchaseComponent";


class OnboardPurchaseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfDevices: this.props.onboarding.numberOfDevices,

            billingGivenName: this.props.onboarding.billingGivenName,
            billingLastName: this.props.onboarding.billingLastName,
            billingAddressCountry: this.props.onboarding.billingAddressCountry,
            billingAddressRegion: this.props.onboarding.billingAddressRegion,
            billingAddressLocality: this.props.onboarding.billingAddressLocality,
            billingPostalCode: this.props.onboarding.billingPostalCode,
            billingTelephone: this.props.onboarding.billingTelephone,
            billingEmail: this.props.onboarding.billingEmail,
            billingStreetAddress: this.props.onboarding.billingStreetAddress,

            shippingGivenName: this.props.onboarding.shippingGivenName,
            shippingLastName: this.props.onboarding.shippingLastName,
            shippingAddressCountry: this.props.onboarding.shippingAddressCountry,
            shippingAddressRegion: this.props.onboarding.shippingAddressRegion,
            shippingAddressLocality: this.props.onboarding.shippingAddressLocality,
            shippingPostalCode: this.props.onboarding.shippingPostalCode,
            shippingTelephone: this.props.onboarding.shippingTelephone,
            shippingEmail: this.props.onboarding.shippingEmail,
            shippingStreetAddress: this.props.onboarding.shippingStreetAddress,

            referrer: '',
            errors: {}
        }

        this.onNextClick = this.onNextClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onNextClick(e) {
        e.preventDefault();
        const { user } = this.props;

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // CONVERT OUR "CAMCELCASE" FIELDS TO BE "SNAKE_CASE" FIELDS.
        var bodyParameters = {};
        Object.keys(this.state).forEach(key => {
            let value = this.state[key];
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
            this.props.setOnboardingInfo(this.state);
            this.setState({
                referrer: '/onboard/checkout'
            })

        }).catch( (errorResult) => { // ERROR
            // THE FOLLOWING CODE WILL CONVERT ALL THE "CAMCEL CASE"
            // KEYS IN THE DICTIONARY TO BE "SNAKE CASE" KEYS TO SUPPORT
            // THE STANDARD OF OUR API-WEB SERVICE.
            let errors = {};
            const responseData = errorResult.response.data;
            Object.keys(responseData).forEach(key => {
                let value = responseData[key];
                let camelKey = camelCase(key);
                // console.log(camelKey, value); // For debugging purposes.
                errors[camelKey] = value;
            });

            // SAVE OUR ERRORS LOCALLY.
            this.setState({
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

    onCancelClick(e) {
        e.preventDefault();
        this.setState({
            referrer: '/onboard'
        });
    }

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSelectChange(option) {
        this.setState({
            [option.selectName]: option.value
        })
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

    render() {

        const { referrer, errors } = this.state;
        const {
            numberOfDevices,

            billingGivenName, billingLastName,
            billingAddressCountry, billingAddressRegion, billingAddressLocality,
            billingPostalCode, billingStreetAddress,
            billingEmail, billingTelephone,

            shippingGivenName,
            shippingLastName, shippingAddressCountry, shippingAddressRegion,
            shippingAddressLocality, shippingStreetAddress,
            shippingPostalCode,shippingEmail, shippingTelephone,
        } = this.state;
        const { user } = this.props;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        // Generate our list of options to choose from for the "numberOfDevices".
        const numberOfDevicesOptions = [];
        for (let i = 1; i <= 20; i++) {
            numberOfDevicesOptions.push({
                selectName: "numberOfDevices",
                value: i,
                label: i
            });
        }

        return (
            <OnboardPurchaseComponent
                numberOfDevices={numberOfDevices}
                numberOfDevicesOptions={numberOfDevicesOptions}
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

                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onNextClick={this.onNextClick}
                onCancelClick={this.onCancelClick}
                user={user}
                errors={errors}
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
        setOnboardingInfo: (info) => {
            dispatch(
                setOnboardingInfo(info)
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardPurchaseContainer);
