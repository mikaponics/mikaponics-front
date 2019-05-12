import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';
import {
    PRODUCTION_CROP_STATE_AT_FINISH_OPTION_CHOICES,
    PRODUCTION_CROPS_HARVEST_REVIEW_AT_FINISH_OPTION_CHOICES,
    PRODUCTION_CROPS_DIED,
    PRODUCTION_CROPS_WERE_TERMINATED,
    PRODUCTION_CROPS_TERRIBLE_HARVEST_REVIEW,
    PRODUCTION_CROPS_BAD_HARVEST_REVIEW
} from '../../../constants/api';
import ProductionTerminateWizard from './productionTerminateWizard';


class CropTable extends Component {
    render() {
        const { crop, stateAtFinish, stateFailureReasonAtFinish, harvestAtFinish, harvestFailureReasonAtFinish, harvestNotesAtFinish, notesAtFinish } = this.props.crop;
        const displayCropFailureError = (stateAtFinish===PRODUCTION_CROPS_DIED)||(stateAtFinish===PRODUCTION_CROPS_WERE_TERMINATED)
        const displayHarvestFailureError = (harvestAtFinish===PRODUCTION_CROPS_TERRIBLE_HARVEST_REVIEW)||(harvestAtFinish===PRODUCTION_CROPS_BAD_HARVEST_REVIEW)
        return (
            <table className="table table-bordered custom-cell-w">
                <tbody>
                    <tr className="bg-dark">
                        <th scope="row" colSpan="2" className="text-light">{crop}</th>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Crop</th>
                        <td>{stateAtFinish}</td>
                    </tr>
                    {displayCropFailureError &&
                        <tr>
                            <th scope="row" className="bg-light">Crop failure reason</th>
                            <td>{stateFailureReasonAtFinish}</td>
                        </tr>
                    }
                    <tr>
                        <th scope="row" className="bg-light">Harvest</th>
                        <td>{harvestAtFinish}</td>
                    </tr>
                    {displayHarvestFailureError &&
                        <tr>
                            <th scope="row" className="bg-light">Crop failure reason</th>
                            <td>{harvestFailureReasonAtFinish}</td>
                        </tr>
                    }
                    <tr>
                        <th scope="row" className="bg-light">Harvest Note(s)</th>
                        <td>{harvestNotesAtFinish}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Additional Note(s)</th>
                        <td>{notesAtFinish}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

class ProductionTerminateStartComponent extends Component {
    render() {
        const { productionDetail, onBackClick, onSubmit } = this.props;
        const { crops=[], name, slug, errors, wasSuccessAtFinish, failureReason, finishedAt, notesAtFinish } = productionDetail;

        const wasSuccessAtFinishText = wasSuccessAtFinish === true ? "Yes" : "No";
        const wasNotSuccessful = wasSuccessAtFinish === false;

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
                        <li className="breadcrumb-item">
                            <Link to={`/production/${slug}`}><i className="fas fa-leaf"></i>&nbsp;{name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-shopping-basket"></i>&nbsp;Harvest
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-shopping-basket"></i>&nbsp;Harvest</h1>

                <ProductionTerminateWizard
                   pageIndex={0}
                   crops={crops}
                   isFirst={false}
                   isLast={true}
                />

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <p><strong>Please confirm these details before checking out your order.</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Overall</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Was Successful</th>
                                    <td>{wasSuccessAtFinishText}</td>
                                </tr>
                                {wasNotSuccessful &&
                                    <tr>
                                        <th scope="row" className="bg-light">Failure Reason</th>
                                        <td>{failureReason}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Finished at</th>
                                    <td>{finishedAt}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Notes</th>
                                    <td>{notesAtFinish}</td>
                                </tr>
                            </tbody>
                        </table>
                        {crops.map(
                            (crop, i) => <CropTable crop={crop} key={i} />)
                        }
                    </div>
                </div>

                <div className="col-md-6 mx-auto mt-2">
                    <form className="needs-validation" noValidate>
                        <div className="form-group">
                            <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onBackClick}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
                            <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onSubmit}>
                                <i className="fas fa-check"></i>&nbsp;Submit
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        );
    }
}


export default ProductionTerminateStartComponent;
