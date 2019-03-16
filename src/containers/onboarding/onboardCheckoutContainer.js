import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { camelCase, snakeCase } from 'lodash';

import { MIKAPONICS_ONBOARDING_VALIDATE_API_URL } from "../../constants/api";
import { setOnboardingPurchaseInfo } from "../../actions/onboardingActions";
import OnboardCheckoutComponent from "../../components/onboardCheckoutComponent";


class OnboardCheckoutContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            errors: {},
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {

        const { referrer, errors } = this.state;
        const { user } = this.props;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        return (
            <OnboardCheckoutComponent
                errors={errors}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        onboarding: store.onboardState
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardCheckoutContainer);
