import React, { Component } from 'react';
import { Link } from "react-router-dom";

import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';
import { BootstrapTextarea } from '../../bootstrap/bootstrapTextarea';


class CropUnorderedList extends Component {
    render() {
        const { cropsArray } = this.props;
        if (isEmpty(cropsArray) === false) {
            let elements = [];
            for (let i = 0; i < cropsArray.length; i++) {
                let cropObj = cropsArray[i];
                elements.push(
                    <div>
                        {cropObj.plant &&
                            <li>{cropObj.plant}&nbsp;x&nbsp;{cropObj.quantity}</li>
                        }
                        {cropObj.fish &&
                            <li>{cropObj.fish}&nbsp;x&nbsp;{cropObj.quantity}</li>
                        }
                    </div>
                );
            }
            return (
                <ul>
                    {elements}
                </ul>
            );
        }
        return <p>-</p>;
    }
}


class ProductionStep4CreateComponent extends Component {
    render() {
        const {
            name, description, isCommercial, device, plantsArray, fishArray, errors, onBackClick, onNextClick
        } = this.props;

        const isCommericalText = isCommercial ? "Yes" : "No";

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
                            <Link to="/add-production-step-3">
                                <span className="num">3.</span><span className="">Fish</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <span className="num">4.</span><span className="">Review</span>
                        </div>
                    </div>
                </div><h3 className="pt-4 text-center"><i className="fas fa-table"></i>&nbsp;Review</h3>


                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">


                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <p><strong>Please confirm these details before submitting the crop production:</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">General details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is commercial?</th>
                                    <td>{isCommericalText}</td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Device details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{device.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{device.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Link</th>
                                    <td>
                                        <Link to={device.absoluteUrl} target="_blank" rel="noopener noreferrer">
                                            View&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Plant Details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Growing</th>
                                    <td>
                                        <CropUnorderedList cropsArray={plantsArray} />
                                    </td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Fish Details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Growing</th>
                                    <td>
                                        <CropUnorderedList cropsArray={fishArray} />
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <br />
                        <div className="form-group">
                            <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onBackClick}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
                            <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onNextClick}>
                                <i className="fas fa-check"></i>&nbsp;Submit
                            </button>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}

export default ProductionStep4CreateComponent;
