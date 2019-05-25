import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { BootstrapCheckbox } from "../../bootstrap/bootstrapCheckbox";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import TaskProductionInspectionCreateStepNavigationComponent from './taskProductionInspectionCreateStepNavigationComponent';


class TaskProductionInspectionCreateStartComponent extends Component {
    render() {

        const {
            productionInspectionDetail,
            productionDetail,
            pageIndex, name, slug, crops, errors={},
            didPass, failureReason, notes,
            onBackClick, onSubmit, onSelectChange,
            onTextChange, onCheckboxChange
        } = this.props;

        // IF THE HARVEST FAILED.
        let shouldDisplaWasFailure = false;
        if (didPass === false) {
            shouldDisplaWasFailure = true;
        }

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

                <h1><i className="fas fa-eye"></i>&nbsp;Production Inspection Task</h1>

                <TaskProductionInspectionCreateStepNavigationComponent
                   productionInspectionDetail={productionInspectionDetail}
                   productionCropInspectionDetail={null}
                   isFirst={true}
                   isLast={false}
                />

                <div className="col-md-5 mx-auto mt-2">
                    <form className="needs-validation" noValidate>
                        <p>All fields which have the (*) symbol are required to be filled out.</p>

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <BootstrapCheckbox
                            inputClassName="form-check-input form-check-input-lg"
                            borderColour="border-success"
                            error={errors.didPass}
                            label="This inspection passed."
                            onChange={onCheckboxChange}
                            value={didPass}
                            name="didPass"
                        />

                        {shouldDisplaWasFailure &&
                            <BootstrapTextarea
                                name="failureReason"
                                borderColour="border-primary"
                                label="Why is this a failure? (*)"
                                placeholder="Please describe why this inspection was consisdered a failure?"
                                rows={5}
                                value={failureReason}
                                helpText={null}
                                onChange={onTextChange}
                                error={errors.failureReason}
                            />
                        }

                        <BootstrapTextarea
                            name="notes"
                            borderColour="border-success"
                            label="Any additional notes / comments?"
                            placeholder="Feel free to add any additional notes or comments."
                            rows={5}
                            value={notes}
                            helpText={null}
                            onChange={onTextChange}
                            error={errors.notes}
                        />

                        <div className="form-group">
                            <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onBackClick}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
                            <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-primary" onClick={onSubmit}>
                                Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        );
    }
}

export default TaskProductionInspectionCreateStartComponent;
