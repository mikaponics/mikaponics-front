import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';

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
import ProductionTerminateWizardComponent from './productionTerminateWizardComponent';



export default class ProductionTerminateStep3FinishComponent extends Component {
    render() {
        const {
            user, productionSlug, productionName, crops, finishedAt, wasSuccessAtFinish,
            wasSuccessAtFinishLabel, failureReason, notes
        } = this.props;
        const wasNotSuccessful = wasSuccessAtFinish === false || wasSuccessAtFinish === 'false';

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

                        <p><strong>Please confirm these details before checking out your order.</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-glasses"></i>&nbsp;Executive Summary
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Finished at</th>
                                    <td>
                                        <Moment tz={user.timezone} format="YYYY/MM/DD hh:mm:ss a">
                                            {finishedAt}
                                        </Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Was successful</th>
                                    <td>{wasSuccessAtFinishLabel}</td>
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
                    </div>
                </div>





            </div>
        );
    }
}
