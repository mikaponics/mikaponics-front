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
                            <span className="num">1.</span><span className="">General Information</span>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Plants</span>
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

                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h1 className="display-4">
                                <i className="fas fa-bullhorn"></i>&nbsp;Attention
                            </h1>
                            <p className="lead">You have successfully started a growing operation!</p>
                            <hr className="my-4" />
                            <p>Click below to go back to the listing page.</p>
                            <p className="lead">
                                <Link className="btn btn-primary btn-lg" to="/productions">
                                    <i className="fas fa-check"></i>&nbsp;Finish
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductionStep5CreateComponent;
