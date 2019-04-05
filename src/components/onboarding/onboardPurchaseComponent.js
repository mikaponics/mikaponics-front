import React from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../bootstrap/bootstrapInput';


class OnboardPurchaseComponent extends React.Component {
    render() {
        const {
            numberOfDevices,

            billingGivenName, billingLastName, billingAddressCountry,
            billingAddressRegion, billingAddressLocality, billingPostalCode, billingEmail,
            billingTelephone, billingStreetAddress,

            shippingGivenName, shippingLastName, shippingAddressCountry,
            shippingAddressRegion, shippingAddressLocality, shippingStreetAddress,
            shippingPostalCode, shippingEmail,
            shippingTelephone,

            errors, onChange, onNextClick, onCancelClick, isLoading
        } = this.props;

        return (
            <div className="container">
                <main id="main">

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">
                                <Link to="/onboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-shopping-cart"></i>&nbsp;Purchase</li>
                        </ol>
                    </nav>

                    <h1><i className="fas fa-shopping-cart"></i>&nbsp;Purchase</h1>
                    <h3 className="pt-4 pb-2 text-center">Purchase Form</h3>
                    <div className="row">
                        <div className="col-md-5 mx-auto mt-2">
                            <form className="needs-validation" noValidate>

                                <p>All fields which have the (*) symbol are required to be filled out.</p>

                                <BootstrapErrorsProcessingAlert errors={errors} />

                                <p className="border-bottom mb-3 pb-1 text-secondary">Device(s)</p>

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.numberOfDevices}
                                    label="# of devices (*)"
                                    onChange={onChange}
                                    value={numberOfDevices}
                                    name="numberOfDevices"
                                    type="number"
                                />

                                <p className="border-bottom mb-3 pb-1 text-secondary">Billing Details</p>

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.billingGivenName}
                                    label="First name (*)"
                                    onChange={onChange}
                                    value={billingGivenName}
                                    name="billingGivenName"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.billingLastName}
                                    label="Last name (*)"
                                    onChange={onChange}
                                    value={billingLastName}
                                    name="billingLastName"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.billingAddressCountry}
                                    label="Country (*)"
                                    onChange={onChange}
                                    value={billingAddressCountry}
                                    name="billingAddressCountry"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.billingAddressRegion}
                                    label="Province / state (*)"
                                    onChange={onChange}
                                    value={billingAddressRegion}
                                    name="billingAddressRegion"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.billingAddressLocality}
                                    label="City (*)"
                                    onChange={onChange}
                                    value={billingAddressLocality}
                                    name="billingAddressLocality"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.billingAddressLocality}
                                    label="Street address (*)"
                                    onChange={onChange}
                                    value={billingStreetAddress}
                                    name="billingStreetAddress"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.billingPostalCode}
                                    label="Postal / zip (*)"
                                    onChange={onChange}
                                    value={billingPostalCode}
                                    name="billingPostalCode"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.billingEmail}
                                    label="Email (*)"
                                    onChange={onChange}
                                    value={billingEmail}
                                    name="billingEmail"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.billingTelephone}
                                    label="Telephone (*)"
                                    onChange={onChange}
                                    value={billingTelephone}
                                    name="billingTelephone"
                                    type="text"
                                />

                                <p className="border-bottom mb-3 pb-1 text-secondary">Shipping Details</p>

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.shippingGivenName}
                                    label="First name (*)"
                                    onChange={onChange}
                                    value={shippingGivenName}
                                    name="shippingGivenName"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.shippingLastName}
                                    label="Last name (*)"
                                    onChange={onChange}
                                    value={shippingLastName}
                                    name="shippingLastName"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.shippingAddressCountry}
                                    label="Country (*)"
                                    onChange={onChange}
                                    value={shippingAddressCountry}
                                    name="shippingAddressCountry"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.shippingAddressRegion}
                                    label="Province / state (*)"
                                    onChange={onChange}
                                    value={shippingAddressRegion}
                                    name="shippingAddressRegion"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.shippingAddressLocality}
                                    label="City (*)"
                                    onChange={onChange}
                                    value={shippingAddressLocality}
                                    name="shippingAddressLocality"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.shippingStreetAddress}
                                    label="Street address (*)"
                                    onChange={onChange}
                                    value={shippingStreetAddress}
                                    name="shippingStreetAddress"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.shippingPostalCode}
                                    label="Postal / zip (*)"
                                    onChange={onChange}
                                    value={shippingPostalCode}
                                    name="shippingPostalCode"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.shippingEmail}
                                    label="Email (*)"
                                    onChange={onChange}
                                    value={shippingEmail}
                                    name="shippingEmail"
                                    type="text"
                                />

                                <BootstrapInput
                                    className="form-control"
                                    error={errors.shippingTelephone}
                                    label="Telephone (*)"
                                    onChange={onChange}
                                    value={shippingTelephone}
                                    name="shippingTelephone"
                                    type="text"
                                />

                                <div className="form-group">
                                    <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" disabled={isLoading} onClick={onCancelClick}>
                                        <i className="fas fa-times"></i>&nbsp;Cancel
                                    </button>
                                    <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-primary" disabled={isLoading} onClick={onNextClick}>
                                        Next&nbsp;<i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </main>
            </div>
        );
    }
}


export default OnboardPurchaseComponent
