import React, { Component } from 'react';
import { Link } from "react-router-dom";
import shortid from "shortid";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";


export default class ApplicationCreateStep2Component extends Component {
    render() {
        const { user, name, description, errors, isLoading, onSubmitClick } = this.props;
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
                    <i className="fas fa-plus"></i>&nbsp;Add Device
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/applications/add/step-1">
                                <span className="num">1.</span><span className="">Register</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <span className="num">2.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <p><strong>Please confirm these details before submitting your application.</strong></p>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-id-card"></i>&nbsp;Identification
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{description}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group">
                            <Link to="/applications/add/step-1" className="btn btn-lg float-left pl-4 pr-4 btn-secondary">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                            <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-success" disabled={isLoading} onClick={onSubmitClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Submit
                            </button>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}
