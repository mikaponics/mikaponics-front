import React from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../bootstrap/bootstrapSingleSelect';
import { BootstrapCountrySelect } from '../bootstrap/bootstrapCountrySelect'
import { BootstrapRegionSelect } from '../bootstrap/bootstrapRegionSelect'


class OnboardPurchaseComponent extends React.Component {
    render() {
        const {
            quantity,
            quantityOptions,

            billingGivenName, billingLastName, billingAddressCountry,
            billingAddressRegion, billingAddressLocality, billingPostalCode, billingEmail,
            billingTelephone, billingStreetAddress,

            shippingGivenName, shippingLastName, shippingAddressCountry,
            shippingAddressRegion, shippingAddressLocality, shippingStreetAddress,
            shippingPostalCode, shippingEmail,
            shippingTelephone,

            errors,
            onTextChange,
            onSelectChange,
            onBillingCountryChange,
            onBillingRegionChange,
            onShippingCountryChange,
            onShippingRegionChange,
            onNextClick,
            onCancelClick,
            isLoading
        } = this.props;

        return (
            <div>

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

                            <BootstrapSingleSelect
                                label="# of devices (*)"
                                name="quantity"
                                defaultOptionLabel="Please pick the number of devices to purchase"
                                options={quantityOptions}
                                value={quantity}
                                error={errors.quantity}
                                onSelectChange={onSelectChange}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">Billing Details</p>

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.billingGivenName}
                                label="First name (*)"
                                onChange={onTextChange}
                                value={billingGivenName}
                                name="billingGivenName"
                                type="text"
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.billingLastName}
                                label="Last name (*)"
                                onChange={onTextChange}
                                value={billingLastName}
                                name="billingLastName"
                                type="text"
                            />

                            <BootstrapCountrySelect
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.billingAddressCountry}
                                label="Country (*)"
                                value={billingAddressCountry}
                                onChange={onBillingCountryChange}
                                priorityOptions={["CA", "US", "MX"]}
                                name="billingAddressCountry"
                            />
                            <BootstrapRegionSelect
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.billingAddressRegion}
                                label="Province / state (*)"
                                country={billingAddressCountry}
                                value={billingAddressRegion}
                                onChange={onBillingRegionChange}
                                name="billingAddressRegion"
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.billingAddressLocality}
                                label="City (*)"
                                onChange={onTextChange}
                                value={billingAddressLocality}
                                name="billingAddressLocality"
                                type="text"
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.billingStreetAddress}
                                label="Street address (*)"
                                onChange={onTextChange}
                                value={billingStreetAddress}
                                name="billingStreetAddress"
                                type="text"
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.billingPostalCode}
                                label="Postal / zip (*)"
                                onChange={onTextChange}
                                value={billingPostalCode}
                                name="billingPostalCode"
                                type="text"
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.billingEmail}
                                label="Email (*)"
                                onChange={onTextChange}
                                value={billingEmail}
                                name="billingEmail"
                                type="text"
                                disabled={true}
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.billingTelephone}
                                label="Telephone (*)"
                                onChange={onTextChange}
                                value={billingTelephone}
                                name="billingTelephone"
                                type="text"
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">Shipping Details</p>

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.shippingGivenName}
                                label="First name (*)"
                                onChange={onTextChange}
                                value={shippingGivenName}
                                name="shippingGivenName"
                                type="text"
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.shippingLastName}
                                label="Last name (*)"
                                onChange={onTextChange}
                                value={shippingLastName}
                                name="shippingLastName"
                                type="text"
                            />

                            <BootstrapCountrySelect
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.shippingAddressCountry}
                                label="Country (*)"
                                value={shippingAddressCountry}
                                onChange={onShippingCountryChange}
                                priorityOptions={["CA", "US", "MX"]}
                                name="shippingAddressCountry"
                            />
                            <BootstrapRegionSelect
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.shippingAddressRegion}
                                label="Province / state (*)"
                                country={shippingAddressCountry}
                                value={shippingAddressRegion}
                                onChange={onShippingRegionChange}
                                name="shippingAddressRegion"
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.shippingAddressLocality}
                                label="City (*)"
                                onChange={onTextChange}
                                value={shippingAddressLocality}
                                name="shippingAddressLocality"
                                type="text"
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.shippingStreetAddress}
                                label="Street address (*)"
                                onChange={onTextChange}
                                value={shippingStreetAddress}
                                name="shippingStreetAddress"
                                type="text"
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.shippingPostalCode}
                                label="Postal / zip (*)"
                                onChange={onTextChange}
                                value={shippingPostalCode}
                                name="shippingPostalCode"
                                type="text"
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.shippingEmail}
                                label="Email (*)"
                                onChange={onTextChange}
                                value={shippingEmail}
                                name="shippingEmail"
                                type="text"
                                disabled={true}
                            />

                            <BootstrapInput
                                className="form-control"
                                borderColour="border-primary"
                                error={errors.shippingTelephone}
                                label="Telephone (*)"
                                onChange={onTextChange}
                                value={shippingTelephone}
                                name="shippingTelephone"
                                type="text"
                            />

                            <div className="form-group">
                                <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" disabled={isLoading} onClick={onCancelClick}>
                                    <i className="fas fa-arrow-left"></i>&nbsp;Back
                                </button>
                                <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-primary" disabled={isLoading} onClick={onNextClick}>
                                    Next&nbsp;<i className="fas fa-arrow-right"></i>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
}


export default OnboardPurchaseComponent
