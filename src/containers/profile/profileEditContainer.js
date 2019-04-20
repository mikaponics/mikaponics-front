import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import ProfileEditComponent from "../../components/profile/profileEditComponent";
import { postProfile } from "../../actions/profileAction";
import { setFlashMessage } from "../../actions/flashMessageActions";


class ProfileEditContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            instrumentSlug: slug,
            referrer: null,

            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            billingCountry: this.props.user.billingCountry,
            billingRegion: this.props.user.billingRegion,
            billingLocality: this.props.user.billingLocality,
            billingStreetAddress: this.props.user.billingStreetAddress,
            billingPostalCode: this.props.user.billingPostalCode,
            billingEmail: this.props.user.billingEmail,
            billingTelephone: this.props.user.billingTelephone,
            shippingCountry: this.props.user.shippingCountry,
            shippingRegion: this.props.user.shippingRegion,
            shippingLocality: this.props.user.shippingLocality,
            shippingStreetAddress: this.props.user.shippingStreetAddress,
            shippingStreetAddressExtra: this.props.user.shippingStreetAddressExtra,
            shippingPostalCode: this.props.user.shippingPostalCode,
            shippingPostOfficeBoxNumber: this.props.user.shippingPostOfficeBoxNumber,
            shippingEmail: this.props.user.shippingEmail,
            shippingTelephone: this.props.user.shippingTelephone,
        }

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);

        this.onBillingCountryChange = this.onBillingCountryChange.bind(this);
        this.onBillingRegionChange = this.onBillingRegionChange.bind(this);
        this.onShippingCountryChange = this.onShippingCountryChange.bind(this);
        this.onShippingRegionChange = this.onShippingRegionChange.bind(this);
    }

    onSuccessfulSubmissionCallback() {
        this.props.setFlashMessage("success", "The device has been successfully updated.");
        this.setState({
            referrer: "/profile"
        })
    }

    onFailedSubmissionCallback() {
        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e){
        e.preventDefault();

        // Asynchronously submit our ``update`` to our API endpoint.
        this.props.postProfile(
            this.props.user,
            this.state,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    onBillingCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({
                billingCountry: null,
                billingRegion: null
            })
        } else {
            this.setState({
                billingCountry: value,
                billingRegion: null,
            })
        }
    }

    onBillingRegionChange(value) {
        this.setState({ billingRegion: value })
    }

    onShippingCountryChange(value) {
        if (value === null || value === undefined || value === '') {
            this.setState({ shippingCountry: null, shippingRegion: null })
        } else {
            this.setState({ shippingCountry: value })
        }
    }

    onShippingRegionChange(value) {
        this.setState({ shippingRegion: value })
    }

    componentDidMount() {
        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    } // end FUNC.

    render() {
        const { referrer } = this.state;
        const {
            firstName,
            lastName,
            email,
            billingCountry,
            billingRegion,
            billingLocality,
            billingStreetAddress,
            billingPostalCode,
            billingEmail,
            billingTelephone,
            shippingCountry,
            shippingRegion,
            shippingLocality,
            shippingStreetAddress,
            shippingStreetAddressExtra,
            shippingPostalCode,
            shippingPostOfficeBoxNumber,
            shippingEmail,
            shippingTelephone,
            errors,
        } = this.state;
        if (referrer) {
            return <Redirect to={"/profile"} />;
        }
        return (
            <ProfileEditComponent
                profile={this.props.user}
                firstName={firstName}
                lastName={lastName}
                email={email}
                billingCountry={billingCountry}
                billingRegion={billingRegion}
                billingLocality={billingLocality}
                billingStreetAddress={billingStreetAddress}
                billingPostalCode={billingPostalCode}
                billingEmail={billingEmail}
                billingTelephone={billingTelephone}
                shippingCountry={shippingCountry}
                shippingRegion={shippingRegion}
                shippingLocality={shippingLocality}
                shippingStreetAddress={shippingStreetAddress}
                shippingStreetAddressExtra={shippingStreetAddressExtra}
                shippingPostalCode={shippingPostalCode}
                shippingPostOfficeBoxNumber={shippingPostOfficeBoxNumber}
                shippingEmail={shippingEmail}
                shippingTelephone={shippingTelephone}
                errors={errors}
                onChange={this.onChange}
                onClick={this.onClick}
                onBillingCountryChange={this.onBillingCountryChange}
                onBillingRegionChange={this.onBillingRegionChange}
                onShippingCountryChange={this.onShippingCountryChange}
                onShippingRegionChange={this.onShippingRegionChange}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postProfile: (user, data, successCallback, failedCallback) => {
            dispatch(postProfile(user, data, successCallback, failedCallback))
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileEditContainer);
