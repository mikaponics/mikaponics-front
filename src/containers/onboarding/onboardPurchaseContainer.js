import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { pullOnboarding, postOnboarding } from "../../actions/onboardingActions";
import OnboardPurchaseComponent from "../../components/onboarding/onboardPurchaseComponent";


class OnboardPurchaseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: this.props.onboarding.quantity,

            billingGivenName: this.props.onboarding.billingGivenName,
            billingLastName: this.props.onboarding.billingLastName,
            billingCountry: this.props.onboarding.billingCountry,
            billingRegion: this.props.onboarding.billingRegion,
            billingLocality: this.props.onboarding.billingLocality,
            billingPostalCode: this.props.onboarding.billingPostalCode,
            billingTelephone: this.props.onboarding.billingTelephone,
            billingEmail: this.props.onboarding.billingEmail,
            billingStreetAddress: this.props.onboarding.billingStreetAddress,

            shippingGivenName: this.props.onboarding.shippingGivenName,
            shippingLastName: this.props.onboarding.shippingLastName,
            shippingCountry: this.props.onboarding.shippingCountry,
            shippingRegion: this.props.onboarding.shippingRegion,
            shippingLocality: this.props.onboarding.shippingLocality,
            shippingPostalCode: this.props.onboarding.shippingPostalCode,
            shippingTelephone: this.props.onboarding.shippingTelephone,
            shippingEmail: this.props.onboarding.shippingEmail,
            shippingStreetAddress: this.props.onboarding.shippingStreetAddress,

            referrer: '',
            errors: {}
        }

        // Attach the custom functions we will be using.
        this.onNextClick = this.onNextClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onBillingCountryChange = this.onBillingCountryChange.bind(this);
        this.onBillingRegionChange = this.onBillingRegionChange.bind(this);
        this.onShippingCountryChange = this.onShippingCountryChange.bind(this);
        this.onShippingRegionChange = this.onShippingRegionChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onNextClick(e) {
        e.preventDefault();

        // Asynchronously submit our ``update`` to our API endpoint.
        this.props.postOnboarding(
            this.props.user,
            this.state,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            referrer: "/onboard/checkout"
        })
    }

    onFailedSubmissionCallback() {
        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
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

    onBillingCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ billingCountry: null, billingRegion: null })
        } else {
            this.setState({ billingCountry: value, billingRegion: null })
        }
    }

    onBillingRegionChange(value) {
        this.setState({ billingRegion: value })
    }

    onShippingCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ shippingCountry: null, shippingRegion: null })
        } else {
            this.setState({ shippingCountry: value, shippingRegion: null })
        }
    }

    onShippingRegionChange(value) {
        this.setState({ shippingRegion: value })
    }

    componentDidMount() {
        this.props.pullOnboarding(this.props.user)
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

        const { referrer } = this.state;
        const {
            quantity,

            billingGivenName, billingLastName,
            billingCountry, billingRegion, billingLocality,
            billingPostalCode, billingStreetAddress,
            billingEmail, billingTelephone,

            shippingGivenName,
            shippingLastName, shippingCountry, shippingRegion,
            shippingLocality, shippingStreetAddress,
            shippingPostalCode,shippingEmail, shippingTelephone,
        } = this.state;
        const { user } = this.props;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        // Generate our list of options to choose from for the "quantity".
        const quantityOptions = [];
        for (let i = 1; i <= 20; i++) {
            quantityOptions.push({
                selectName: "quantity",
                value: i,
                label: i
            });
        }

        return (
            <OnboardPurchaseComponent
                quantity={quantity}
                quantityOptions={quantityOptions}
                billingGivenName={billingGivenName}
                billingLastName={billingLastName}
                billingCountry={billingCountry}
                billingRegion={billingRegion}
                billingLocality={billingLocality}
                billingStreetAddress={billingStreetAddress}
                billingPostalCode={billingPostalCode}
                billingEmail={billingEmail}
                billingTelephone={billingTelephone}

                shippingGivenName={shippingGivenName}
                shippingLastName={shippingLastName}
                shippingCountry={shippingCountry}
                shippingRegion={shippingRegion}
                shippingLocality={shippingLocality}
                shippingStreetAddress={shippingStreetAddress}
                shippingPostalCode={shippingPostalCode}
                shippingEmail={shippingEmail}
                shippingTelephone={shippingTelephone}

                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onBillingCountryChange={this.onBillingCountryChange}
                onBillingRegionChange={this.onBillingRegionChange}
                onShippingCountryChange={this.onShippingCountryChange}
                onShippingRegionChange={this.onShippingRegionChange}
                onNextClick={this.onNextClick}
                onCancelClick={this.onCancelClick}
                user={user}
                errors={this.props.onboarding.errors}
                isLoading={this.props.onboarding.isAPIRequestRunning}
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
        postOnboarding: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                postOnboarding(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
        pullOnboarding: (user) => {
            dispatch(
                pullOnboarding(user)
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardPurchaseContainer);
