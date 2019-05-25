import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW,
    PRODUCTION_CROPS_INSPECTION_BAD_REVIEW,
} from '../../../constants/api';
import TaskProductionInspectionCreateStepNavigationComponent from './taskProductionInspectionCreateStepNavigationComponent';


class TaskProductionCropInspectionTableComponent extends Component {
    render() {
        const {
            productionCropName,
            prettyReview,
            review,
            failureReason,
            stage,
            notes
        } = this.props.crop;
        const reviewWasFailure = (review === PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW) || (review === PRODUCTION_CROPS_INSPECTION_BAD_REVIEW);
        return (
            <table className="table table-bordered custom-cell-w">
                <tbody>
                    <tr className="bg-dark">
                        <th scope="row" colSpan="2" className="text-light">{productionCropName}</th>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Review</th>
                        <td>{prettyReview}</td>
                    </tr>
                    {reviewWasFailure &&
                        <tr>
                            <th scope="row" className="bg-light">Failure reason</th>
                            <td>{failureReason}</td>
                        </tr>
                    }
                    <tr>
                        <th scope="row" className="bg-light">Stage</th>
                        <td>{stage.name}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Additional note(s)</th>
                        <td>{notes}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}


class TaskProductionInspectionCreateFinishComponent extends Component {
    render() {
        const {
            productionDetail,
            productionInspectionDetail,
            onBackClick,
            onSubmit
        } = this.props;
        const {
            didPass,
            failureReason,
            crops,
            notes,
        } = productionInspectionDetail;
        const didPassText = didPass === true ? "Yes" : "No";
        const didNotPass = didPass === false;
        return (
            <div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <Link to="/tasks"><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <Link to={`/task-start/${productionDetail.slug}`}><i className="fas fa-tasks"></i>&nbsp;Task</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-eye"></i>&nbsp;Production Inspection Task
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Add</h1>

                <TaskProductionInspectionCreateStepNavigationComponent
                   productionInspectionDetail={productionInspectionDetail}
                   productionCropInspectionDetail={null}
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
                                    <th scope="row" className="bg-light">Did this inspection pass?</th>
                                    <td>{didPassText}</td>
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
                        {crops.map(
                            (crop, i) => <TaskProductionCropInspectionTableComponent crop={crop} key={i} />)
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

export default TaskProductionInspectionCreateFinishComponent;
