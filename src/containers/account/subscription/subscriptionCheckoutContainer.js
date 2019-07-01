import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullProfile, postProfile } from "../../../actions/profileAction";
import SubscriptionCheckoutComponent from "../../../components/account/subscription/subscriptionCheckoutComponent";


class SubscriptionCheckoutContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {}
        }

        // Attach the custom functions we will be using.
        this.onNextClick = this.onNextClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onBillingCountryChange = this.onBillingCountryChange.bind(this);
        this.onBillingRegionChange = this.onBillingRegionChange.bind(this);
        this.onShippingCountryChange = this.onShippingCountryChange.bind(this);
        this.onShippingRegionChange = this.onShippingRegionChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onNextClick(e) {
        e.preventDefault();

        const isShippingSameAsBilling = this.state.isShippingDifferentThenBilling === false;

        // CASE 1 OF 2:
        // The shipping address is SIMILAR to billing address.
        if (isShippingSameAsBilling) {
            this.setState(
                {
                    shippingGivenName: this.state.billingGivenName,
                    shippingLastName: this.state.billingLastName,
                    shippingCountry: this.state.billingCountry,
                    shippingRegion: this.state.billingRegion,
                    shippingLocality: this.state.billingLocality,
                    shippingPostalCode: this.state.billingPostalCode,
                    shippingTelephone: this.state.billingTelephone,
                    shippingEmail: this.state.billingEmail,
                    shippingStreetAddress: this.state.billingStreetAddress,
                },
                () => {
                    // Asynchronously submit our ``update`` to our API endpoint.
                    this.props.postProfile(
                        this.props.user,
                        this.state,
                        this.onSuccessfulSubmissionCallback,
                        this.onFailedSubmissionCallback
                    );
                }
            );

        // The shipping address is DIFFERENT to billing address.
        } else {
            // Asynchronously submit our ``update`` to our API endpoint.
            this.props.postProfile(
                this.props.user,
                this.state,
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );
        }
    }

    onSuccessfulSubmissionCallback() {
        this.props.history.push("/subscription/checkout/review");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ // Update our state with our latest errors.
            errors: errors
        });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onCancelClick(e) {
        e.preventDefault();
        this.props.history.push("/subscription");
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

    /**
     *  Function handles the "isShippingDifferentThenBilling" checkbox.
     */
    onCheckboxChange(e) {
        const value =  e.target.checked;

        // If the shipping address is different then the blling address then
        // we need to cleare the shipping fields else we pre-populate them
        // with the billing address.
        if (value) { // Shipping IS different.
            this.setState({
                [e.target.name]: value,
                shippingGivenName: this.props.user.shippingGivenName,
                shippingLastName: this.props.user.shippingLastName,
                shippingCountry: null,
                shippingRegion: null,
                shippingLocality: null,
                shippingPostalCode: null,
                shippingTelephone: null,
                shippingEmail: this.props.user.shippingEmail,
                shippingStreetAddress: null,
            })
        } else {  // Shipping is NOT different.
            this.setState({
                [e.target.name]: value,
                shippingGivenName: this.state.billingGivenName,
                shippingLastName: this.state.billingLastName,
                shippingCountry: this.state.billingCountry,
                shippingRegion: this.state.billingRegion,
                shippingLocality: this.state.billingLocality,
                shippingPostalCode: this.state.billingPostalCode,
                shippingTelephone: this.state.billingTelephone,
                shippingEmail: this.state.billingEmail,
                shippingStreetAddress: this.state.billingStreetAddress,
            })
        }
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
        this.props.pullProfile(this.props.user)
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // When the `react` page finishes loading up, take our `user` data
        // and assign it the state data.
        this.setState({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,

            billingGivenName: this.props.user.billingGivenName,
            billingLastName: this.props.user.billingLastName,
            billingCountry: this.props.user.billingCountry,
            billingRegion: this.props.user.billingRegion,
            billingLocality: this.props.user.billingLocality,
            billingPostalCode: this.props.user.billingPostalCode,
            billingTelephone: this.props.user.billingTelephone,
            billingEmail: this.props.user.billingEmail,
            billingStreetAddress: this.props.user.billingStreetAddress,

            isShippingDifferentThenBilling: this.props.user.isShippingDifferentThenBilling,
            shippingGivenName: this.props.user.shippingGivenName,
            shippingLastName: this.props.user.shippingLastName,
            shippingCountry: this.props.user.shippingCountry,
            shippingRegion: this.props.user.shippingRegion,
            shippingLocality: this.props.user.shippingLocality,
            shippingPostalCode: this.props.user.shippingPostalCode,
            shippingTelephone: this.props.user.shippingTelephone,
            shippingEmail: this.props.user.shippingEmail,
            shippingStreetAddress: this.props.user.shippingStreetAddress,

            errors: {}
        });
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
        const {
            errors, isLoading,

            billingGivenName, billingLastName,
            billingCountry, billingRegion, billingLocality,
            billingPostalCode, billingStreetAddress,
            billingEmail, billingTelephone,

            isShippingDifferentThenBilling, shippingGivenName,
            shippingLastName, shippingCountry, shippingRegion,
            shippingLocality, shippingStreetAddress,
            shippingPostalCode,shippingEmail, shippingTelephone,
        } = this.state;
        const { user } = this.props;
        return (
            <SubscriptionCheckoutComponent
                billingGivenName={billingGivenName}
                billingLastName={billingLastName}
                billingCountry={billingCountry}
                billingRegion={billingRegion}
                billingLocality={billingLocality}
                billingStreetAddress={billingStreetAddress}
                billingPostalCode={billingPostalCode}
                billingEmail={billingEmail}
                billingTelephone={billingTelephone}

                isShippingDifferentThenBilling={isShippingDifferentThenBilling}
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
                onCheckboxChange={this.onCheckboxChange}
                onBillingCountryChange={this.onBillingCountryChange}
                onBillingRegionChange={this.onBillingRegionChange}
                onShippingCountryChange={this.onShippingCountryChange}
                onShippingRegionChange={this.onShippingRegionChange}

                onNextClick={this.onNextClick}
                onCancelClick={this.onCancelClick}
                user={user}
                errors={errors}
                isLoading={isLoading}
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
        postProfile: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                postProfile(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
        pullProfile: (user) => {
            dispatch(
                pullProfile(user)
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionCheckoutContainer);
