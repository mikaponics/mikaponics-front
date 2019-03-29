import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../flashMessageComponent";


class ProfileTable extends Component {
    render() {
        const { profile } = this.props;
        return (
            <div>
                <h3>Basic</h3>
                <p>First name: {profile.firstName}</p>
                <p>Middle name: {profile.middleName}</p>
                <p>Last name: {profile.lastName}</p>
                <p>Email: {profile.email}</p>
                <br />
                <h3>Billing</h3>
                <p>Country: {profile.billingCountry}</p>
                <p>Region: {profile.billingRegion}</p>
                <p>Locality: {profile.billingLocality}</p>
                <p>Street Address: {profile.billingStreetAddress}</p>
                <p>Street Address (extra): {profile.billingStreetAddressExtra}</p>
                <p>Postal: {profile.billingPostalCode}</p>
                <p>Telephone: {profile.billingTelephone}</p>
                <br />
                <h3>Shipping</h3>
                <p>Country: {profile.shippingCountry}</p>
                <p>Region: {profile.shippingRegion}</p>
                <p>Locality: {profile.shippingLocality}</p>
                <p>Street Address: {profile.shippingStreetAddress}</p>
                <p>Street Address (Extra): {profile.shippingStreetAddressExtra}</p>
                <p>Postal: {profile.shippingPostalCode}</p>
                <p>Post Office Box Number: {profile.shippingPostOfficeBoxNumber}</p>
                <p>Email: {profile.shippingEmail}</p>
                <p>Telephone: {profile.shippingTelephone}</p>
                <Link to="/profile/edit">Edit</Link>
            </div>
        )
    }
}


class ProfileComponent extends Component {
    render() {
        const { profile, flashMessage } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Profile</li>
                    </ol>
                </nav>
                <h1>Profile</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <FlashMessageComponent object={flashMessage} />
                        <ProfileTable profile={profile} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileComponent;
