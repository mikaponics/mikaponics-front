import React from 'react';
import { Redirect, Link } from "react-router-dom";
import map from 'lodash/map';
import classnames from 'classnames';

import TextFieldGroup from "./textFieldGroup"


class OnboardPurchaseComponent extends React.Component {
    render() {
        const {
            numberOfDevices,

            billingFirstName, billingLastName, billingCountry,
            billingProvince, billingCity, billingPostal, billingEmail,
            billingTelephone,

            shippingFirstName, shippingLastName, shippingCountry,
            shippingProvince, shippingCity, shippingPostal, shippingEmail,
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

                               {errors && <div className="alert alert-danger" role="alert">TODO: Implement render.</div>}

                               <TextFieldGroup
                                   error={errors.numberOfDevices}
                                   label="# of devices"
                                   onChange={onChange}
                                   value={numberOfDevices}
                                   field="numberOfDevices"
                                   type="number"
                               />

                               <TextFieldGroup
                                    error={errors.billingFirstName}
                                    label="Billing first name (*)"
                                    onChange={onChange}
                                    value={billingFirstName}
                                    field="billingFirstName"
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
                                    error={errors.billingCountry}
                                    label="Billing country (*)"
                                    onChange={onChange}
                                    value={billingCountry}
                                    field="billingCountry"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingProvince}
                                    label="Billing province / state (*)"
                                    onChange={onChange}
                                    value={billingProvince}
                                    field="billingProvince"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingCity}
                                    label="Billing city (*)"
                                    onChange={onChange}
                                    value={billingCity}
                                    field="billingCity"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.billingPostal}
                                    label="Billing postal / zip (*)"
                                    onChange={onChange}
                                    value={billingPostal}
                                    field="billingPostal"
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
                                    error={errors.shippingFirstName}
                                    label="Shipping first name (*)"
                                    onChange={onChange}
                                    value={shippingFirstName}
                                    field="shippingFirstName"
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
                                    error={errors.shippingCountry}
                                    label="Shipping country (*)"
                                    onChange={onChange}
                                    value={shippingCountry}
                                    field="shippingCountry"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingProvince}
                                    label="Shipping province / state (*)"
                                    onChange={onChange}
                                    value={shippingProvince}
                                    field="shippingProvince"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingCity}
                                    label="Shipping city (*)"
                                    onChange={onChange}
                                    value={shippingCity}
                                    field="shippingCity"
                                    type="text"
                               />

                               <TextFieldGroup
                                    error={errors.shippingPostal}
                                    label="Shipping postal / zip (*)"
                                    onChange={onChange}
                                    value={shippingPostal}
                                    field="shippingPostal"
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
