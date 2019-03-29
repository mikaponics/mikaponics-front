import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../bootstrap/bootstrapInput";
import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";


class ProfileTable extends Component {
    render() {
        const {
            firstName, lastName, email,
            billingCountry, billingRegion, billingLocality, billingStreetAddress, billingPostalCode, billingEmail, billingTelephone,
            onChange, onClick, errors
        } = this.props;
        return (
            <div>
                <h3>Basic</h3>
                <BootstrapInput
                    id="idFirstName"
                    field="firstName"
                    type="text"
                    label="First name"
                    placeholder="Please set your first name"
                    value={firstName}
                    helpText={null}
                    onChange={onChange}
                    error={errors.firstName}
                />
                <BootstrapInput
                    id="idLastName"
                    field="lastName"
                    type="text"
                    label="Last name"
                    placeholder="Please set your last name"
                    value={lastName}
                    helpText={null}
                    onChange={onChange}
                    error={errors.lastName}
                />
                <BootstrapInput
                    id="idEmail"
                    field="email"
                    type="email"
                    label="Email"
                    placeholder="Please set your email"
                    value={email}
                    helpText={null}
                    onChange={onChange}
                    error={errors.email}
                />

                <h3>Billing</h3>
                <BootstrapInput
                    id="idBillingCountry"
                    field="billingCountry"
                    type="text"
                    label="Country"
                    placeholder="Please set your billing country"
                    value={billingCountry}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingCountry}
                />
                <BootstrapInput
                    id="idBillingRegion"
                    field="billingRegion"
                    type="text"
                    label="Region"
                    placeholder="Please set your billing region"
                    value={billingRegion}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingRegion}
                />
                <BootstrapInput
                    id="idBillingLocality"
                    field="billingLocality"
                    type="text"
                    label="Locality"
                    placeholder="Please set your billing locality"
                    value={billingLocality}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingLocality}
                />
                <BootstrapInput
                    id="idBillingStreetAddress"
                    field="billingStreetAddress"
                    type="text"
                    label="Locality"
                    placeholder="Please set your billing street address"
                    value={billingStreetAddress}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingStreetAddress}
                />
                <BootstrapInput
                    id="idBillingPostalCode"
                    field="billingPostalCode"
                    type="text"
                    label="Locality"
                    placeholder="Please set your billing postal code"
                    value={billingPostalCode}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingPostalCode}
                />
                <BootstrapInput
                    id="idBillingEmail"
                    field="billingEmail"
                    type="text"
                    label="Email"
                    placeholder="Please set your billing email address"
                    value={billingEmail}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingEmail}
                />
                <BootstrapInput
                    id="idBillingTelephone"
                    field="billingTelephone"
                    type="text"
                    label="Telephone"
                    placeholder="Please set your billing telephone"
                    value={billingTelephone}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingTelephone}
                />
                
                <h3>Shipping</h3>

            </div>
        )
    }
}


class ProfileEditComponent extends Component {
    render() {
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

            onChange,
            onClick,
            errors={}
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Profile</li>
                    </ol>
                </nav>
                <h1>Profile</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <ProfileTable
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
                            onChange={onChange}
                            onClick={onClick}
                            errors={errors}
                        />
                        <button onClick={onClick}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileEditComponent;
