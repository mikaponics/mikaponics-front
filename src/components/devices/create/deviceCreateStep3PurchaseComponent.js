import React from 'react';
import { Link } from "react-router-dom";

import { BootstrapCheckbox } from "../../bootstrap/bootstrapCheckbox";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';
import { BootstrapCountrySelect } from '../../bootstrap/bootstrapCountrySelect'
import { BootstrapRegionSelect } from '../../bootstrap/bootstrapRegionSelect'


class PurchaseDeviceComponent extends React.Component {
    render() {
        const {
            isShippingDifferentThenBilling,
            onCheckboxChange,

            billingGivenName, billingLastName, billingCountry,
            billingRegion, billingLocality, billingPostalCode, billingEmail,
            billingTelephone, billingStreetAddress,

            shippingGivenName, shippingLastName, shippingCountry,
            shippingRegion, shippingLocality, shippingStreetAddress,
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
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/devices"><i className="fas fa-cubes"></i>&nbsp;Devices</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"></i>&nbsp;Add (Purchase)</li>
                    </ol>
                </nav>
                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Device
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/devices/create/step-2-purchase">
                                <span className="num">1.</span><span className="">Cart</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <span className="num">2.</span><span className="">Billing / Shipping</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Checkout</span>
                        </div>
                    </div>
                </div>

                <h3 className="pt-4 pb-2 text-center">Purchase Form</h3>
                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form className="needs-validation" noValidate>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-address-card"></i>&nbsp;Billing Details
                            </p>

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.billingGivenName}
                                label="First name (*)"
                                onChange={onTextChange}
                                value={billingGivenName}
                                name="billingGivenName"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.billingLastName}
                                label="Last name (*)"
                                onChange={onTextChange}
                                value={billingLastName}
                                name="billingLastName"
                                type="text"
                            />

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
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.billingRegion}
                                label="Province / state (*)"
                                country={billingCountry}
                                value={billingRegion}
                                onChange={onBillingRegionChange}
                                name="billingRegion"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.billingLocality}
                                label="City (*)"
                                onChange={onTextChange}
                                value={billingLocality}
                                name="billingLocality"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.billingStreetAddress}
                                label="Street address (*)"
                                onChange={onTextChange}
                                value={billingStreetAddress}
                                name="billingStreetAddress"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.billingPostalCode}
                                label="Postal / zip (*)"
                                onChange={onTextChange}
                                value={billingPostalCode}
                                name="billingPostalCode"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.billingEmail}
                                label="Email (*)"
                                onChange={onTextChange}
                                value={billingEmail}
                                name="billingEmail"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.billingTelephone}
                                label="Telephone (*)"
                                onChange={onTextChange}
                                value={billingTelephone}
                                name="billingTelephone"
                                type="text"
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-map-marker"></i>&nbsp;Shipping Details
                            </p>

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.isShippingDifferentThenBilling}
                                label="Is shipping different then billing?"
                                onChange={onCheckboxChange}
                                checked={isShippingDifferentThenBilling}
                                name="isShippingDifferentThenBilling"
                            />

                            {isShippingDifferentThenBilling && <div>
                                <BootstrapInput
                                    inputClassName="form-control"
                                    borderColour="border-primary"
                                    error={errors.shippingGivenName}
                                    label="First name (*)"
                                    onChange={onTextChange}
                                    value={shippingGivenName}
                                    name="shippingGivenName"
                                    type="text"
                                />

                                <BootstrapInput
                                    inputClassName="form-control"
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
                                    inputClassName="form-control"
                                    borderColour="border-primary"
                                    error={errors.shippingLocality}
                                    label="City (*)"
                                    onChange={onTextChange}
                                    value={shippingLocality}
                                    name="shippingLocality"
                                    type="text"
                                />

                                <BootstrapInput
                                    inputClassName="form-control"
                                    borderColour="border-primary"
                                    error={errors.shippingStreetAddress}
                                    label="Street address (*)"
                                    onChange={onTextChange}
                                    value={shippingStreetAddress}
                                    name="shippingStreetAddress"
                                    type="text"
                                />

                                <BootstrapInput
                                    inputClassName="form-control"
                                    borderColour="border-primary"
                                    error={errors.shippingPostalCode}
                                    label="Postal / zip (*)"
                                    onChange={onTextChange}
                                    value={shippingPostalCode}
                                    name="shippingPostalCode"
                                    type="text"
                                />

                                <BootstrapInput
                                    inputClassName="form-control"
                                    borderColour="border-primary"
                                    error={errors.shippingEmail}
                                    label="Email (*)"
                                    onChange={onTextChange}
                                    value={shippingEmail}
                                    name="shippingEmail"
                                    type="text"
                                />

                                <BootstrapInput
                                    inputClassName="form-control"
                                    borderColour="border-primary"
                                    error={errors.shippingTelephone}
                                    label="Telephone (*)"
                                    onChange={onTextChange}
                                    value={shippingTelephone}
                                    name="shippingTelephone"
                                    type="text"
                                />
                            </div>}

                            <div className="form-group">
                                <Link to="/devices/create/step-2-purchase" className="btn btn-lg float-left pl-4 pr-4 btn-secondary">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                                <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-primary" disabled={isLoading} onClick={onNextClick}>
                                    Proceed to Checkout&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
}


export default PurchaseDeviceComponent
