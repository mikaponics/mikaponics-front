import React from 'react';
import { Redirect, Link } from "react-router-dom";
import map from 'lodash/map';
import classnames from 'classnames';

import { BootstrapErrorsProcessingAlert } from "./bootstrap/bootstrapAlert";
import TextFieldGroup from "./textFieldGroup"


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

            errors, onChange, onSubmit, isLoading
        } = this.props;

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">
                            <Link to="/onboard">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Purchase</li>
                    </ol>
                </nav>

                <div className="Onboarding-Purchase">
                   <div className="row">
                       <div className="col-md-4 offset-md-4">
                           <form onSubmit={onSubmit}>
                                <h1>Purchase</h1>
                                <p>All fields which have the (*) symbol are required to be filled out.</p>

                               <BootstrapErrorsProcessingAlert errors={errors} />

                               <TextFieldGroup
                                   error={errors.numberOfDevices}
                                   label="# of devices"
                                   onChange={onChange}
                                   value={numberOfDevices}
                                   field="numberOfDevices"
                                   type="number"
                               />

                               <TextFieldGroup
                                    error={errors.billingGivenName}
                                    label="Billing first name (*)"
                                    onChange={onChange}
                                    value={billingGivenName}
                                    field="billingGivenName"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingLastName}
                                    label="Billing last name (*)"
                                    onChange={onChange}
                                    value={billingLastName}
                                    field="billingLastName"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingAddressCountry}
                                    label="Billing country (*)"
                                    onChange={onChange}
                                    value={billingAddressCountry}
                                    field="billingAddressCountry"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingAddressRegion}
                                    label="Billing province / state (*)"
                                    onChange={onChange}
                                    value={billingAddressRegion}
                                    field="billingAddressRegion"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingAddressLocality}
                                    label="Billing city (*)"
                                    onChange={onChange}
                                    value={billingAddressLocality}
                                    field="billingAddressLocality"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingAddressLocality}
                                    label="Billing street address (*)"
                                    onChange={onChange}
                                    value={billingStreetAddress}
                                    field="billingStreetAddress"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingPostalCode}
                                    label="Billing postal / zip (*)"
                                    onChange={onChange}
                                    value={billingPostalCode}
                                    field="billingPostalCode"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingEmail}
                                    label="Billing email (*)"
                                    onChange={onChange}
                                    value={billingEmail}
                                    field="billingEmail"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingTelephone}
                                    label="Billing telephone (*)"
                                    onChange={onChange}
                                    value={billingTelephone}
                                    field="billingTelephone"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingGivenName}
                                    label="Shipping first name (*)"
                                    onChange={onChange}
                                    value={shippingGivenName}
                                    field="shippingGivenName"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingLastName}
                                    label="Shipping last name (*)"
                                    onChange={onChange}
                                    value={shippingLastName}
                                    field="shippingLastName"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingAddressCountry}
                                    label="Shipping country (*)"
                                    onChange={onChange}
                                    value={shippingAddressCountry}
                                    field="shippingAddressCountry"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingAddressRegion}
                                    label="Shipping province / state (*)"
                                    onChange={onChange}
                                    value={shippingAddressRegion}
                                    field="shippingAddressRegion"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingAddressLocality}
                                    label="Shipping city (*)"
                                    onChange={onChange}
                                    value={shippingAddressLocality}
                                    field="shippingAddressLocality"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingStreetAddress}
                                    label="Shipping street address (*)"
                                    onChange={onChange}
                                    value={shippingStreetAddress}
                                    field="shippingStreetAddress"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingPostalCode}
                                    label="Shipping postal / zip (*)"
                                    onChange={onChange}
                                    value={shippingPostalCode}
                                    field="shippingPostalCode"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingEmail}
                                    label="Shipping email (*)"
                                    onChange={onChange}
                                    value={shippingEmail}
                                    field="shippingEmail"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingTelephone}
                                    label="Shipping telephone (*)"
                                    onChange={onChange}
                                    value={shippingTelephone}
                                    field="shippingTelephone"
                                    type="text"
                               />

                               <div className="form-group">
                                   <button className="btn btn-primary btn-lg" disabled={isLoading}>
                                       Next
                                   </button>
                               </div>

                           </form>
                       </div>
                   </div>
                </div>

            </div>
        );
    }
}


export default OnboardPurchaseComponent
