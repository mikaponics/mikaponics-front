import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../bootstrap/bootstrapInput';


class OnboardInvoiceSendComponent extends Component {
    render() {
        const { email, onChange, errors, onSendEmailClick } = this.props;
        return (
            <div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/onboard">
                                <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                            </Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/onboard/receipt">
                                <i className="fas fa-book"></i>&nbsp;Invoice
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-share-square"></i>&nbsp;Send Invoice
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-share-square"></i>&nbsp;Send Invoice
                </h1>


                <div className="col-md-5 mx-auto mt-2">
                    <h3 className="pt-4 pb-2 text-center">Invoice Send Form</h3>
                    <form className="needs-validation" noValidate>

                        <p>All fields which have the (*) symbol are required to be filled out.</p>

                        <BootstrapErrorsProcessingAlert errors={errors} />


                        <div className="form-row">

                            <BootstrapInput
                                inputClassName="form-control"
                                divClassName="form-group col-md-12 mb-4"
                                borderColour="border-primary"
                                error={errors.email}
                                label="Email (*)"
                                onChange={onChange}
                                value={email}
                                name="billingEmail"
                                type="text"
                                disabled={false}
                            />

                            <div className="form-group col-md-12 mb-3 mx-auto text-center">
                                <Link to="/onboard/receipt" className="btn btn-secondary btn-lg btn-fxw mt-4 float-left">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Cancel
                                </Link>
                                <button className="btn btn-success btn-lg btn-fxw mt-4 float-right" type="button" onClick={onSendEmailClick}>
                                    <i className="fas fa-paper-plane"></i>&nbsp;Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>


            </div>
        );
    }
}


export default OnboardInvoiceSendComponent
