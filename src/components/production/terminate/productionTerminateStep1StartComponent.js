import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import { BootstrapCheckbox } from "../../bootstrap/bootstrapCheckbox";
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


export default class ProductionTerminateStep1StartComponent extends Component {
    render() {
        const {
            pageIndex, name, slug, crops, errors, finishedAt,
            wasSuccessAtFinish, failureReason, notesAtFinish,
            onBackClick, onSubmit, onSelectChange, onFinishedAtChange,
            onTextChange, onCheckboxChange
        } = this.props;

        // IF THE HARVEST FAILED.
        let shouldDisplaWasFailure = false;
        if (wasSuccessAtFinish === false) {
            shouldDisplaWasFailure = true;
        }

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

                <ProductionTerminateWizardComponent
                   crops={crops}
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
                            error={errors.wasSuccessAtFinish}
                            label="Overall this production was a success."
                            onChange={onCheckboxChange}
                            value={wasSuccessAtFinish}
                            name="wasSuccessAtFinish"
                        />

                        {shouldDisplaWasFailure &&
                            <BootstrapTextarea
                                name="failureReason"
                                borderColour="border-primary"
                                label="Why is this a failure? (*)"
                                placeholder="Please describe why this production is consisdered a failure?"
                                rows={5}
                                value={failureReason}
                                helpText={null}
                                onChange={onTextChange}
                                error={errors.failureReason}
                            />
                        }

                        When did this production complete?
                        <DatePicker
                            selected={finishedAt}
                            onChange={onFinishedAtChange}
                        />

                        <br /><br />

                        <BootstrapTextarea
                            name="notesAtFinish"
                            borderColour="border-success"
                            label="Any additional notes / comments?"
                            placeholder="Feel free to add any additional notes or comments."
                            rows={5}
                            value={notesAtFinish}
                            helpText={null}
                            onChange={onTextChange}
                            error={errors.notesAtFinish}
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
