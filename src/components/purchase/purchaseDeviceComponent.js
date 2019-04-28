import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../bootstrap/bootstrapSingleSelect';
// import { BootstrapCountrySelect } from '../bootstrap/bootstrapCountrySelect'
// import { BootstrapRegionSelect } from '../bootstrap/bootstrapRegionSelect'


class PurchaseDeviceComponent extends Component {
    render() {
        const {
            errors, onSelectChange, onTextChange, onCancelClick, onNextClick, isLoading,
            quantity, quantityOptions,

            billingGivenName
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-shopping-cart"></i>&nbsp;Purchase
                        </li>
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


export default PurchaseDeviceComponent;
