import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../flashMessageComponent";


class ProfileTable extends Component {
    render() {
        const { profile } = this.props;
        return (
            <table className="table table-bordered custom-cell-w">
                <tbody>
                    <tr className="bg-dark">
                        <th scope="row" colSpan="2" className="text-light">Name</th>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">First name</th>
                        <td>{profile.firstName}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Middle name</th>
                        <td>{profile.middleName}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Last name</th>
                        <td>{profile.lastName}</td>
                    </tr>

                    <tr className="bg-dark">
                        <th scope="row" colSpan="2" className="text-light">Contact details</th>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Email</th>
                        <td>{profile.email}</td>
                    </tr>

                    <tr className="bg-dark">
                        <th scope="row" colSpan="2" className="text-light">Billing details</th>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Country</th>
                        <td>{profile.billingCountry}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Province / State</th>
                        <td>{profile.billingRegion}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Locality</th>
                        <td>{profile.billingLocality}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Street Address</th>
                        <td>{profile.billingStreetAddress}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Street Address (extra)</th>
                        <td>{profile.billingStreetAddressExtra}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Postal</th>
                        <td>{profile.billingPostalCode}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Telephone</th>
                        <td>{profile.billingTelephone}</td>
                    </tr>

                    <tr className="bg-dark">
                        <th scope="row" colSpan="2" className="text-light">Shipping details</th>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Country</th>
                        <td>{profile.shippingCountry}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Province / State</th>
                        <td>{profile.shippingRegion}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Locality</th>
                        <td>{profile.shippingLocality}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Street Address</th>
                        <td>{profile.shippingStreetAddress}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Street Address (extra)</th>
                        <td>{profile.shippingStreetAddressExtra}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Postal</th>
                        <td>{profile.shippingPostalCode}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Telephone</th>
                        <td>{profile.shippingTelephone}</td>
                    </tr>

                </tbody>
            </table>
        )
    }
}

//     <h3>Shipping</h3>
//     <p>Country: {profile.shippingCountry}</p>
//     <p>Region: {profile.shippingRegion}</p>
//     <p>Locality: {profile.shippingLocality}</p>
//     <p>Street Address: {profile.shippingStreetAddress}</p>
//     <p>Street Address (Extra): {profile.shippingStreetAddressExtra}</p>
//     <p>Postal: {profile.shippingPostalCode}</p>
//     <p>Post Office Box Number: {profile.shippingPostOfficeBoxNumber}</p>
//     <p>Email: {profile.shippingEmail}</p>
//     <p>Telephone: {profile.shippingTelephone}</p>
//
// </div>


class ProfileComponent extends Component {
    render() {
        const { profile, flashMessage } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-user-circle"></i>&nbsp;Profile</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-user-circle"></i>&nbsp;Profile</h1>
                <div className="row">
                    <div className="col-md-12">
                        <FlashMessageComponent object={flashMessage} />
                        <ProfileTable profile={profile} />

                        <p className="text-center">
                        <Link to="/profile/edit" className="btn btn-primary btn-lg">
                            <i className="fas fa-pencil-alt"></i>&nbsp;Edit
                        </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileComponent;
