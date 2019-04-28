import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { pullPurchaseDevice, postPurchaseDevice } from "../../actions/purchaseDeviceActions";
import PurchaseDeviceComponent from "../../components/purchase/purchaseDeviceComponent";


class PurchaseDeviceContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: this.props.purchaseDevice.quantity,

            billingGivenName: this.props.purchaseDevice.billingGivenName,
            billingLastName: this.props.purchaseDevice.billingLastName,
            billingCountry: this.props.purchaseDevice.billingCountry,
            billingRegion: this.props.purchaseDevice.billingRegion,
            billingLocality: this.props.purchaseDevice.billingLocality,
            billingPostalCode: this.props.purchaseDevice.billingPostalCode,
            billingTelephone: this.props.purchaseDevice.billingTelephone,
            billingEmail: this.props.purchaseDevice.billingEmail,
            billingStreetAddress: this.props.purchaseDevice.billingStreetAddress,

            shippingGivenName: this.props.purchaseDevice.shippingGivenName,
            shippingLastName: this.props.purchaseDevice.shippingLastName,
            shippingCountry: this.props.purchaseDevice.shippingCountry,
            shippingRegion: this.props.purchaseDevice.shippingRegion,
            shippingLocality: this.props.purchaseDevice.shippingLocality,
            shippingPostalCode: this.props.purchaseDevice.shippingPostalCode,
            shippingTelephone: this.props.purchaseDevice.shippingTelephone,
            shippingEmail: this.props.purchaseDevice.shippingEmail,
            shippingStreetAddress: this.props.purchaseDevice.shippingStreetAddress,

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
        this.props.postPurchaseDevice(
            this.props.user,
            this.state,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            referrer: "/purchase/checkout"
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
            referrer: '/dashboard'
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
        this.props.pullPurchaseDevice(this.props.user)
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

        let errors = {};
        let isLoading = false;
        if (this.props.purchaseDevice !== undefined && this.props.purchaseDevice !== null) {
            errors = this.props.purchaseDevice.errors;
            if (errors === undefined || errors === null) {
                errors = {};
            }
            isLoading = this.props.purchaseDevice.isAPIRequestRunning;
        }

        let quantityValue = 0;
        if (quantity) {
            quantityValue = quantity;
        }

        return (
            <PurchaseDeviceComponent
                quantity={quantityValue}
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
                errors={errors}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        purchaseDevice: store.purchaseDeviceState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postPurchaseDevice: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                postPurchaseDevice(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
        pullPurchaseDevice: (user) => {
            dispatch(
                pullPurchaseDevice(user)
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PurchaseDeviceContainer);
