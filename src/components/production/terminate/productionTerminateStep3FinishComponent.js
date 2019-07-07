import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';

import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';
import ProductionTerminateWizardComponent from './productionTerminateWizardComponent';
import {
    PRODUCITON_OTHER_HARVEST_FAILURE_REASON
} from '../../../constants/api';


export default class ProductionTerminateStep3FinishComponent extends Component {
    render() {
        const {
            user, productionSlug, productionName, crops, finishedAt, wasSuccess,
            wasSuccessLabel, failureReason, notes, errors, isLoading,
            onBackClick, onSubmitClick
        } = this.props;
        const wasNotSuccessful = wasSuccess === false || wasSuccess === 'false';

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
                            <Link to={`/production/${productionSlug}`}><i className="fas fa-leaf"></i>&nbsp;{productionName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-shopping-basket"></i>&nbsp;Harvest
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-shopping-basket"></i>&nbsp;Harvest</h1>

                <ProductionTerminateWizardComponent
                   crops={crops}
                   isFirst={false}
                   isLast={true}
                />

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <p><strong>Please confirm these details before checking out your order.</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-glasses"></i>&nbsp;Executive Summary
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Production finished at</th>
                                    <td>
                                        <Moment tz={user.timezone} format="YYYY/MM/DD">
                                            {finishedAt}
                                        </Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Was successful</th>
                                    <td>{wasSuccessLabel}</td>
                                </tr>
                                {wasNotSuccessful &&
                                    <tr>
                                        <th scope="row" className="bg-light">Failure reason</th>
                                        <td>{failureReason}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Additional notes / comments</th>
                                    <td>{notes}</td>
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
                            <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onSubmitClick} disabled={isLoading}>
                                <i className="fas fa-check"></i>&nbsp;Submit
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}


class CropTable extends Component {
    render() {

        /**

        harvestFailureReasonOptions: PRODUCTION_HARVEST_FAILURE_REASON_OPTION_CHOICES,
        : crop.harvestFailureReason,
        harvestFailureReasonOther: crop.harvestFailureReasonOther,
         */
        console.log(this.props.crop); // For debugging purposes only.
        const {
            prettyName, wasHarvested, wasHarvestedLabel,
            harvestYieldLabel, harvestQualityLabel, harvestNotes, harvestWeight, harvestWeightUnit,
            harvestFailureReason, harvestFailureReasonLabel, harvestFailureReasonOther,
            averageWidth, averageHeight, averageLength, averageMeasureUnit,
            wasAliveAfterHarvestLabel
        } = this.props.crop;

        let shouldDisplayHarvestFailureGUI = wasHarvested === false || wasHarvested === 'false';
        let shouldDisplayHarvestSuccessGUI = wasHarvested === true || wasHarvested === 'true';
        let shouldDisplayHarvestFailureReasonOther = harvestFailureReason === PRODUCITON_OTHER_HARVEST_FAILURE_REASON;
        let shoulNotdDisplayHarvestFailureReasonOther = harvestFailureReason !== PRODUCITON_OTHER_HARVEST_FAILURE_REASON;

        return (
            <div>
                {shouldDisplayHarvestSuccessGUI &&
                    <table className="table table-bordered custom-cell-w">
                        <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">
                                    <i className="fas fa-shopping-basket"></i>&nbsp;{prettyName}
                                </th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Was harvested</th>
                                <td>{wasHarvestedLabel}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Harvest yield</th>
                                <td>{harvestYieldLabel}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Harvest quality</th>
                                <td>{harvestQualityLabel}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Harvest note(s) / additional comments</th>
                                <td>{harvestNotes}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Harvested weight & unit</th>
                                <td>{harvestWeight}&nbsp;{harvestWeightUnit}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Crop measurements</th>
                                <td>
                                    <ul>
                                        <li>Length:&nbsp;{averageLength}&nbsp;{averageMeasureUnit}</li>
                                        <li>Width:&nbsp;{averageWidth}&nbsp;{averageMeasureUnit}</li>
                                        <li>Height:&nbsp;{averageHeight}&nbsp;{averageMeasureUnit}</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Was crop alive after harvest?</th>
                                <td>{wasAliveAfterHarvestLabel}</td>
                            </tr>
                        </tbody>
                    </table>
                }
                {shouldDisplayHarvestFailureGUI &&
                    <table className="table table-bordered custom-cell-w">
                        <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">
                                    <i className="fas fa-shopping-basket"></i>&nbsp;{prettyName}
                                </th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Was harvested</th>
                                <td>{wasHarvestedLabel}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Reason for harvest failure</th>
                                <td>
                                {shouldDisplayHarvestFailureReasonOther &&
                                    <div>{harvestFailureReasonOther}</div>
                                }
                                {shoulNotdDisplayHarvestFailureReasonOther &&
                                    <div>{harvestFailureReasonLabel}</div>
                                }
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Crop measurements</th>
                                <td>
                                    <ul>
                                        <li>Length:&nbsp;{averageLength}&nbsp;{averageMeasureUnit}</li>
                                        <li>Width:&nbsp;{averageWidth}&nbsp;{averageMeasureUnit}</li>
                                        <li>Height:&nbsp;{averageHeight}&nbsp;{averageMeasureUnit}</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Was crop alive after harvest?</th>
                                <td>{wasAliveAfterHarvestLabel}</td>
                            </tr>
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}
