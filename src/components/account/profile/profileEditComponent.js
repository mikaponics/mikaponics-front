import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapCountrySelect } from '../../bootstrap/bootstrapCountrySelect'
import { BootstrapRegionSelect } from '../../bootstrap/bootstrapRegionSelect'


class ProfileTable extends Component {
    render() {
        const {
            firstName, lastName, email,
            billingCountry, billingRegion, billingLocality, billingStreetAddress, billingPostalCode, billingEmail, billingTelephone,
            shippingCountry, shippingRegion, shippingLocality, shippingStreetAddress, shippingStreetAddressExtra, shippingPostalCode, shippingPostOfficeBoxNumber, shippingEmail, shippingTelephone,
            onChange, errors, onSubmit,
            onBillingCountryChange, onBillingRegionChange, onShippingCountryChange, onShippingRegionChange,
        } = this.props;
        return (
            <form onSubmit={onSubmit}>

                <h3>Basic</h3>
                <BootstrapInput
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                <BootstrapCountrySelect
                    inputClassName="form-control"
                    borderColour="border-primary"
                    error={errors.billingCountry}
                    label="Country (*)"
                    value={billingCountry}
                    onChange={onBillingCountryChange}
                    priorityOptions={["CA", "US", "MX"]}
                    name="billingCountry"
                />
                <BootstrapRegionSelect
                    className="form-control"
                    borderColour="border-primary"
                    error={errors.billingRegion}
                    label="Province / state (*)"
                    country={billingCountry}
                    value={billingRegion}
                    onChange={onBillingRegionChange}
                    name="billingRegion"
                />
                <BootstrapInput
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                <BootstrapCountrySelect
                    className="form-control"
                    borderColour="border-primary"
                    error={errors.shippingCountry}
                    label="Country (*)"
                    value={shippingCountry}
                    onChange={onShippingCountryChange}
                    priorityOptions={["CA", "US", "MX"]}
                    name="shippingCountry"
                />
                <BootstrapRegionSelect
                    className="form-control"
                    borderColour="border-primary"
                    error={errors.shippingRegion}
                    label="Province / state (*)"
                    country={shippingCountry}
                    value={shippingRegion}
                    onChange={onShippingRegionChange}
                    name="shippingRegion"
                />
                <BootstrapInput
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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
                    inputClassName="form-control form-control-lg"
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

            profile,
            onChange,
            onClick,
            onBillingCountryChange, onBillingRegionChange, onShippingCountryChange, onShippingRegionChange,
        } = this.props;
        const { errors={}, isAPIRequestRunning } = profile;
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
                            errors={errors}
                            onBillingCountryChange={onBillingCountryChange}
                            onBillingRegionChange={onBillingRegionChange}
                            onShippingCountryChange={onShippingCountryChange}
                            onShippingRegionChange={onShippingRegionChange}
                        />

                        <br />
                        <Link to="/profile" className="btn btn-secondary btn-lg float-left">
                            <i className="fas fa-window-close"></i>&nbsp;Cancel
                        </Link>
                        <button className="btn btn-success btn-lg float-right" onClick={onClick} disabled={isAPIRequestRunning}>
                            <i className="fas fa-check"></i>&nbsp;Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileEditComponent;
