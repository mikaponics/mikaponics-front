import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../../../bootstrap/bootstrapInput';
import { BootstrapTextarea } from '../../../bootstrap/bootstrapTextarea';


export default class ApplicationCreateStep1Component extends Component {
    render() {
        const {
            name, description, onTextChange,
            user, errors, isLoading, onNextClick
        } = this.props;
        const isSubscribed = user.subscriptionStatus === "active";
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/applications">
                                <i className="fas fa-server"></i>&nbsp;Applications
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Application
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <span className="num">1.</span><span className="">Register</span>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <h2 className="pt-4 pb-2 text-center"><i className="fas fa-scroll"></i>&nbsp;OAuth Application Register Form</h2>
                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form className="needs-validation" noValidate>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-id-card"></i>&nbsp;Identification
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.name}
                                label="Name (*)"
                                onChange={onTextChange}
                                value={name}
                                name="name"
                                helpText="This is the name of the application."
                                placeholder="Please set the device name"
                                type="text"
                            />

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-primary"
                                label="Description (*)"
                                placeholder="Please enter description"
                                rows="5"
                                value={description}
                                helpText="This is the description of the application."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <div className="form-group">
                                <Link to="/devices/create/step-1" className="btn btn-lg float-left pl-4 pr-4 btn-secondary">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                                <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-primary" disabled={isLoading} onClick={onNextClick}>
                                    Proceed to Review&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>


            </div>
        );
    }
}
