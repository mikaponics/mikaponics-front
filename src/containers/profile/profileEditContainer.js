import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import ProfileEditComponent from "../../components/profile/profileEditComponent";
import { pullProfile } from "../../actions/profileAction";
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
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e){
        this.props.setFlashMessage("success", "Profile was successfully updated.");
        this.setState({
            referrer: '/profile'
        });
    }

    componentDidMount() {
        const { user } = this.props;

        // Run the async code to fetch the latest profile information from the
        // server and save the latest user's details into our global state.
        // Make the authenticated call to our web-service.
        this.props.pullProfile(user);

        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    } // end FUNC.

    render() {
        const {
            referrer,
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
                onChange={this.onChange}
                onClick={this.onClick}
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
        pullProfile: (user) => {
            dispatch(pullProfile(user))
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
