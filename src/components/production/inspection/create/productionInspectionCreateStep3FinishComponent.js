import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shortid from "shortid";
import isEmpty from 'lodash/isEmpty';

import {
    PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW,
    PRODUCTION_CROPS_INSPECTION_BAD_REVIEW,
} from '../../../../constants/api';
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import ProductionInspectionCreateStepNavigationComponent from './productionInspectionCreateStepNavigationComponent';


export default class ProductionInspectionCreateStep3FinishComponent extends Component {
    render() {
        const {
            productionDetail, cropInspections, didPassLabel, didPass, failureReason, notes,
            onBackClick, onSubmitClick, errors, isLoading
        } = this.props;
        const didNotPass = didPass === false || didPass === 'false';
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
                            <Link to={`/production/${productionDetail.slug}`}><i className="fas fa-leaf"></i>&nbsp;{productionDetail.name}</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/production/${productionDetail.slug}/inspection`}>
                                <i className="fas fa-eye"></i>&nbsp;Inspection
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Add</h1>

                <ProductionInspectionCreateStepNavigationComponent
                    cropInspections={cropInspections}
                    cropInspection={null}
                    isFirst={false}
                    isLast={true}
                />

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <p><strong>Please confirm these details before submitting your inspection.</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-stethoscope"></i>&nbsp;Overall
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Did this inspection pass?</th>
                                    <td>{didPassLabel}</td>
                                </tr>
                                {didNotPass &&
                                    <tr>
                                        <th scope="row" className="bg-light">Failure Reason</th>
                                        <td>{failureReason}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Additional Note(s)</th>
                                    <td>{notes}</td>
                                </tr>
                            </tbody>
                        </table>
                        {cropInspections.map(
                            (crop, i) => <ProductionCropInspectionTableComponent crop={crop} key={i} />)
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
                                <i className="fas fa-check-circle"></i>&nbsp;Submit
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

class ProductionCropInspectionTableComponent extends Component {
    render() {
        const {
            prettyName,
            review,
            reviewLabel,
            failureReason,
            stageLabel,
            averageWidth, averageHeight, averageLength, averageMeasureUnit,
            pestProblems, diseaseProblems, abioticProblems,
            notes
        } = this.props.crop;
        const id = shortid.generate();
        const reviewWasFailure = (review === PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW) || (review === PRODUCTION_CROPS_INSPECTION_BAD_REVIEW);
        let shouldDisplayPestProblems = pestProblems !== undefined && pestProblems !== null && isEmpty(pestProblems) === false;
        let shouldDisplayDiseaseProblems = diseaseProblems !== undefined && diseaseProblems !== null && isEmpty(diseaseProblems) === false;
        let shouldDisplayAbioticProblems = abioticProblems !== undefined && abioticProblems !== null && isEmpty(abioticProblems) === false;
        return (
            <table className="table table-bordered custom-cell-w" key={id}>
                <tbody>
                    <tr className="bg-dark">
                        <th scope="row" colSpan="2" className="text-light">
                            <i className="fas fa-eye"></i>&nbsp;{prettyName}
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Review</th>
                        <td>{reviewLabel}</td>
                    </tr>
                    {reviewWasFailure &&
                        <tr>
                            <th scope="row" className="bg-light">Failure reason</th>
                            <td>{failureReason}</td>
                        </tr>
                    }
                    <tr>
                        <th scope="row" className="bg-light">Stage</th>
                        <td>{stageLabel}</td>
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
                    {shouldDisplayPestProblems &&
                        <tr>
                            <th scope="row" className="bg-light">Pest Problems</th>
                            <td>
                                <ProblemUnorderedList problems={pestProblems} />
                            </td>
                        </tr>
                    }
                    {shouldDisplayDiseaseProblems &&
                        <tr>
                            <th scope="row" className="bg-light">Disease Problems</th>
                            <td>
                                <ProblemUnorderedList problems={diseaseProblems} />
                            </td>
                        </tr>
                    }
                    {shouldDisplayAbioticProblems &&
                        <tr>
                            <th scope="row" className="bg-light">Abiotic Problems</th>
                            <td>
                                <ProblemUnorderedList problems={abioticProblems} />
                            </td>
                        </tr>
                    }
                    <tr>
                        <th scope="row" className="bg-light">Additional note(s)</th>
                        <td>{notes}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}


class ProblemUnorderedList extends Component {
    render() {
        const { problems } = this.props;
        return (
            <ul key={shortid.generate()}>
                {problems.map(
                    (problem, i) => <ProblemUnorderedItem problem={problem} key={i+shortid.generate()} />)
                }
            </ul>
        );
    }
}

class ProblemUnorderedItem extends Component {
    render() {
        const { label } = this.props.problem;
        return (
            <li key={shortid.generate()}>{label}</li>
        );
    }
}
