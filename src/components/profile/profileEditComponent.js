import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../bootstrap/bootstrapInput";
import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";


class ProfileTable extends Component {
    render() {
        const {
            firstName, lastName, email,
            billingCountry, billingRegion, billingLocality, billingStreetAddress, billingPostalCode, billingEmail, billingTelephone,
            shippingCountry, shippingRegion, shippingLocality, shippingStreetAddress, shippingStreetAddressExtra, shippingPostalCode, shippingPostOfficeBoxNumber, shippingEmail, shippingTelephone,
            onChange, onClick, errors, onSubmit
        } = this.props;
        return (
            <form onSubmit={onSubmit}>

                <h3>Basic</h3>
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.firstName}
                    label="First Name (*)"
                    placeholder="Please set first last name"
                    onChange={onChange}
                    value={firstName}
                    name="firstName"
                    type="text"
                />

                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.lastName}
                    label="Last name (*)"
                    placeholder="Please set your last name"
                    onChange={onChange}
                    value={lastName}
                    name="lastName"
                    type="text"
                />

                <br />
                <h3>Contact Detail</h3>

                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.email}
                    label="Email (*)"
                    placeholder="Please set your email"
                    onChange={onChange}
                    value={email}
                    name="email"
                />

                <br />
                <h3>Billing Detail</h3>
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    error={errors.email}
                    type="text"
                    label="Country"
                    placeholder="Please set your billing country"
                    value={billingCountry}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingCountry}
                    name="billingCountry"
                />

                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="billingRegion"
                    type="text"
                    label="Region"
                    placeholder="Please set your billing region"
                    value={billingRegion}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingRegion}
                />

                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="billingLocality"
                    type="text"
                    label="Locality"
                    placeholder="Please set your billing locality"
                    value={billingLocality}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingLocality}
                />

                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="billingStreetAddress"
                    type="text"
                    label="Street Address"
                    placeholder="Please set your billing street address"
                    value={billingStreetAddress}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingStreetAddress}
                />

                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="billingPostalCode"
                    type="text"
                    label="Postal Code"
                    placeholder="Please set your billing postal code"
                    value={billingPostalCode}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingPostalCode}
                />

                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="billingEmail"
                    type="text"
                    label="Email"
                    placeholder="Please set your billing email address"
                    value={billingEmail}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingEmail}
                />

                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="billingTelephone"
                    type="text"
                    label="Telephone"
                    placeholder="Please set your billing telephone"
                    value={billingTelephone}
                    helpText={null}
                    onChange={onChange}
                    error={errors.billingTelephone}
                />

                <br />
                <h3>Shipping Detail</h3>
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="shippingCountry"
                    type="text"
                    label="Country"
                    placeholder="Please set your shipping country"
                    value={shippingCountry}
                    helpText={null}
                    onChange={onChange}
                    error={errors.shippingCountry}
                />
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="shippingRegion"
                    type="text"
                    label="Region"
                    placeholder="Please set your shipping region"
                    value={shippingRegion}
                    helpText={null}
                    onChange={onChange}
                    error={errors.shippingRegion}
                />
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="shippingLocality"
                    type="text"
                    label="Locality"
                    placeholder="Please set your shipping locality"
                    value={shippingLocality}
                    helpText={null}
                    onChange={onChange}
                    error={errors.shippingLocality}
                />
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="shippingStreetAddress"
                    type="text"
                    label="Street address"
                    placeholder="Please set your shipping street address"
                    value={shippingStreetAddress}
                    helpText={null}
                    onChange={onChange}
                    error={errors.shippingStreetAddress}
                />
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-success"
                    name="shippingStreetAddressExtra"
                    type="text"
                    label="Street address (extra)"
                    placeholder="Please set your shipping street address (extra)"
                    value={shippingStreetAddressExtra}
                    helpText={null}
                    onChange={onChange}
                    error={errors.shippingStreetAddressExtra}
                />
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="shippingPostalCode"
                    type="text"
                    label="Postal code"
                    placeholder="Please set your shipping postal code"
                    value={shippingPostalCode}
                    helpText={null}
                    onChange={onChange}
                    error={errors.shippingPostalCode}
                />
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-success"
                    name="shippingPostOfficeBoxNumber"
                    type="text"
                    label="Post office box #"
                    placeholder="Please set your shipping post office box number"
                    value={shippingPostOfficeBoxNumber}
                    helpText={null}
                    onChange={onChange}
                    error={errors.shippingPostOfficeBoxNumber}
                />
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="shippingEmail"
                    type="text"
                    label="Email"
                    placeholder="Please set your shipping email address"
                    value={shippingEmail}
                    helpText={null}
                    onChange={onChange}
                    error={errors.shippingEmail}
                />
                <BootstrapInput
                    className="form-control form-control-lg"
                    borderColour="border-primary"
                    name="shippingTelephone"
                    type="text"
                    label="Telephone"
                    placeholder="Please set your shipping telephone"
                    value={shippingTelephone}
                    helpText={null}
                    onChange={onChange}
                    error={errors.shippingTelephone}
                />

            </form>
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
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/profile"><i className="fas fa-user-circle"></i>&nbsp;Profile</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-pencil-alt"></i>&nbsp;Edit</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-pencil-alt"></i>&nbsp;Edit Profile</h1>
                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
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

                        <br />
                        <Link to="/profile" className="btn btn-secondary btn-lg float-left">
                            <i className="fas fa-window-close"></i>&nbsp;Cancel
                        </Link>
                        <button className="btn btn-success btn-lg float-right" onClick={onClick}>
                            <i className="fas fa-check"></i>&nbsp;Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileEditComponent;
