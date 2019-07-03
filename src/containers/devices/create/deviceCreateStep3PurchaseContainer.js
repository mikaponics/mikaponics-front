import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import DeviceCreateStep3PurchaseComponent from "../../../components/devices/create/deviceCreateStep3PurchaseComponent";
import { validatePurchaseStep3Input } from "../../../validations/addDeviceValidator";
import { localStorageSetObjectOrArrayItem, localStorageGetArrayItem } from "../../../helpers/localStorageUtility";


class DeviceCreateStep3PurchaseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            errors: {},
            cart: localStorageGetArrayItem("add-device-cart"),
            billingGivenName: localStorage.getItem("add-device-billingGivenName"),
            billingLastName: localStorage.getItem("add-device-billingLastName"),
            billingCountry: localStorage.getItem("add-device-billingCountry"),
            billingRegion: localStorage.getItem("add-device-billingRegion"),
            billingLocality: localStorage.getItem("add-device-billingLocality"),
            billingPostalCode: localStorage.getItem("add-device-billingPostalCode"),
            billingTelephone: localStorage.getItem("add-device-billingTelephone"),
            billingEmail: localStorage.getItem("add-device-billingEmail"),
            billingStreetAddress: localStorage.getItem("add-device-billingStreetAddress"),

            isShippingDifferentThenBilling: localStorage.getItem("add-device-isShippingDifferentThenBilling"),
            shippingGivenName: localStorage.getItem("add-device-shippingGivenName"),
            shippingLastName: localStorage.getItem("add-device-shippingLastName"),
            shippingCountry: localStorage.getItem("add-device-shippingCountry"),
            shippingRegion: localStorage.getItem("add-device-shippingRegion"),
            shippingLocality: localStorage.getItem("add-device-shippingLocality"),
            shippingPostalCode: localStorage.getItem("add-device-shippingPostalCode"),
            shippingTelephone: localStorage.getItem("add-device-shippingTelephone"),
            shippingEmail: localStorage.getItem("add-device-shippingEmail"),
            shippingStreetAddress: localStorage.getItem("add-device-shippingStreetAddress"),
        }

        // Attach the custom functions we will be using.
        this.onNextClick = this.onNextClick.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onBillingCountryChange = this.onBillingCountryChange.bind(this);
        this.onBillingRegionChange = this.onBillingRegionChange.bind(this);
        this.onShippingCountryChange = this.onShippingCountryChange.bind(this);
        this.onShippingRegionChange = this.onShippingRegionChange.bind(this);
        this.processState = this.processState.bind(this);
    }

    processState() {
        // Perform client-side validation.
        const { errors, isValid } = validatePurchaseStep3Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/devices/create/step-4-purchase");
            return;
        }

        // CASE 2 OF 2: Validation failed.
        this.setState(
            { errors: errors },
            () => {
                // The following code will cause the screen to scroll to the top of
                // the page. Please see ``react-scroll`` for more information:
                // https://github.com/fisshy/react-scroll
                var scroll = Scroll.animateScroll;
                scroll.scrollToTop();
            }
        );
    }

    onNextClick(e) {
        e.preventDefault();

        // IF SHIPPING IS SIMILAR TO BILLING THEN WE NEED TO UPDATE THE STATE,
        // WAIT FOR THE STATE TO UPDATE AND THE PROCEED TO VALIDATE AND
        // REDIRECT THE USER TO THE NEXT PAGE.
        if (this.state.isShippingDifferentThenBilling === false || this.state.isShippingDifferentThenBilling === null) { // Shipping IS SIMILAR to billing.

            // Update persistent storage.
            localStorage.setItem('add-device-isShippingDifferentThenBilling', false);
            localStorage.setItem('add-device-shippingGivenName', this.state.billingGivenName);
            localStorage.setItem('add-device-shippingLastName', this.state.billingLastName);
            localStorage.setItem('add-device-shippingCountry', this.state.billingCountry);
            localStorage.setItem('add-device-shippingRegion', this.state.billingRegion);
            localStorage.setItem('add-device-shippingLocality', this.state.billingLocality);
            localStorage.setItem('add-device-shippingPostalCode', this.state.billingPostalCode);
            localStorage.setItem('add-device-shippingTelephone', this.state.billingTelephone);
            localStorage.setItem('add-device-shippingEmail', this.state.billingEmail);
            localStorage.setItem('add-device-shippingStreetAddress', this.state.billingStreetAddress);

            // Update the state and once updated load the code for processing
            // the state.
            this.setState({
                shippingGivenName: this.state.billingGivenName,
                shippingLastName: this.state.billingLastName,
                shippingCountry: this.state.billingCountry,
                shippingRegion: this.state.billingRegion,
                shippingLocality: this.state.billingLocality,
                shippingPostalCode: this.state.billingPostalCode,
                shippingTelephone: this.state.billingTelephone,
                shippingEmail: this.state.billingEmail,
                shippingStreetAddress: this.state.billingStreetAddress,
            }, ()=> { this.processState(); }
            );
            return;
        }
        this.processState();
    }

    onTextChange(e) {
        // Update our state.
        this.setState({
            [e.target.name]: e.target.value,
        });

        // Update our persistent storage.
        const key = "add-device-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('add-device-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('add-device-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
        // console.log(this.state);
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
            // Update storage.
            this.setState({
                [e.target.name]: value,
                shippingGivenName: "",
                shippingLastName: "",
                shippingCountry: "",
                shippingRegion: "",
                shippingLocality: "",
                shippingPostalCode: "",
                shippingTelephone: "",
                shippingEmail: "",
                shippingStreetAddress: null,
            });

            // Update persistent storage.
            localStorage.setItem('add-device-isShippingDifferentThenBilling', true);
            localStorage.setItem('add-device-shippingGivenName', "");
            localStorage.setItem('add-device-shippingLastName', "");
            localStorage.setItem('add-device-shippingCountry', "");
            localStorage.setItem('add-device-shippingRegion', "");
            localStorage.setItem('add-device-shippingLocality', "");
            localStorage.setItem('add-device-shippingPostalCode', "");
            localStorage.setItem('add-device-shippingTelephone', "");
            localStorage.setItem('add-device-shippingEmail', "");
            localStorage.setItem('add-device-shippingStreetAddress', "");
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
            });
            // Update persistent storage.
            localStorage.setItem('add-device-isShippingDifferentThenBilling', false);
            localStorage.setItem('add-device-shippingGivenName', this.state.billingGivenName);
            localStorage.setItem('add-device-shippingLastName', this.state.billingLastName);
            localStorage.setItem('add-device-shippingCountry', this.state.billingCountry);
            localStorage.setItem('add-device-shippingRegion', this.state.billingRegion);
            localStorage.setItem('add-device-shippingLocality', this.state.billingLocality);
            localStorage.setItem('add-device-shippingPostalCode', this.state.billingPostalCode);
            localStorage.setItem('add-device-shippingTelephone', this.state.billingTelephone);
            localStorage.setItem('add-device-shippingEmail', this.state.billingEmail);
            localStorage.setItem('add-device-shippingStreetAddress', this.state.billingStreetAddress);
        }
    }

    onBillingCountryChange(value) {
        // Update state.
        if (value === null || value === undefined || value === '') {
            this.setState({ billingCountry: null, billingRegion: null })
        } else {
            this.setState({ billingCountry: value, billingRegion: null })
        }

        // Update persistent storage.
        localStorage.setItem('add-device-billingCountry', value);
        localStorage.setItem('add-device-billingRegion', null);
    }

    onBillingRegionChange(value) {
        this.setState({ billingRegion: value }); // Update state.
        localStorage.setItem('add-device-billingRegion', value); // Update persistent storage.
    }

    onShippingCountryChange(value) {
        // Update state.
        if (value === null || value === undefined || value === '') {
            this.setState({ shippingCountry: null, shippingRegion: null })
        } else {
            this.setState({ shippingCountry: value, shippingRegion: null })
        }
        // Update persistent storage.
        localStorage.setItem('add-device-shippingCountry', value);
        localStorage.setItem('add-device-shippingRegion', null);
    }

    onShippingRegionChange(value) {
        this.setState({ shippingRegion: value }); // Update state.
        localStorage.setItem('add-device-shippingRegion', value); // Update persistent storage.
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

        const { referrer, errors, isLoading } = this.state;
        const {
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
            <DeviceCreateStep3PurchaseComponent
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
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep3PurchaseContainer);
