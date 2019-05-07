import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../bootstrap/bootstrapSingleSelect';
import { BootstrapTextarea } from '../bootstrap/bootstrapTextarea';


class ProductionStep5CreateComponent extends Component {
    render() {
        const {
            name, description, deviceOptions, device, onTextChange, onSelectChange, errors, onBackClick, onNextClick
        } = this.props;

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/productions"><i className="fas fa-industry"></i>&nbsp;Crop Production</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-plus"></i>&nbsp;Add</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/add-production-step-1">
                                <span className="num">1.</span><span className="">General Information</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/add-production-step-2">
                                <span className="num">2.</span><span className="">Plants</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Fish</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Review</span>
                        </div>
                        <div id="step-5" className="st-grey active">
                            <span className="num">5.</span><span className="">Confirmation</span>
                        </div>
                    </div>
                </div>

                <h3 className="pt-4 pb-2 text-center">General Information Form</h3>
                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form className="needs-validation" noValidate>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">General Information</p>

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.name}
                                label="Name (*)"
                                onChange={onTextChange}
                                value={name}
                                name="name"
                                type="text"
                                placeholder="Please write a title for your production. Ex: My Aquaponic Setup."
                            />
                            <BootstrapTextarea
                                name="description"
                                borderColour="border-primary"
                                label="Description"
                                placeholder="Please write a short description of your production."
                                rows="5"
                                value={description}
                                helpText="This is the description of the production."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">Telemetry</p>

                            <BootstrapSingleSelect
                                label="Device (*)"
                                name="device"
                                defaultOptionLabel="Please select the monitoring hardware for your production."
                                options={deviceOptions}
                                value={device}
                                error={errors.device}
                                onSelectChange={onSelectChange}
                            />

                            <br />


                            <div className="form-group">
                                <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onBackClick}>
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </button>
                                <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-primary" onClick={onNextClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductionStep5CreateComponent;
