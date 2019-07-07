import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from '../../../bootstrap/bootstrapSingleSelect';
import {
    PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW,
    PRODUCTION_CROPS_INSPECTION_BAD_REVIEW,
    PRODUCTION_CROPS_INSPECTION_REVIEW_OPTION_CHOICES
} from '../../../../constants/api';
import ProductionInspectionCreateStepNavigationComponent from './productionInspectionCreateStepNavigationComponent';



class ProductionInspectionCreateStep2CropComponent extends Component {
    render() {
        const {
            cropInspection, cropInspections,
            productionInspectionDetail,
            stageOptions=[], productionDetail,
            review, failureReason, stage, notes, errors,
            onBackClick, onNextClick, onSelectChange, onTextChange
        } = this.props;
        const { name, slug } = productionDetail;

        // IF THE PLANTS DIED OR WERE TERMINATED.
        let shouldDisplayReviewFailure = false;

        // IF THE REVIEW FAILED.
        if (review === PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW || review === PRODUCTION_CROPS_INSPECTION_BAD_REVIEW) {
            shouldDisplayReviewFailure = true;
        }

        // DEVELOPERS NOTE:
        // IF PREVIOUS RESULT IS NULL THEN SET THIS TO BE EMPTY.
        const theNotes = (notes === null || notes === undefined) ? "" : notes

        // Check to see if this crop has a variety.
        let prettyNameWithVariety = cropInspection.prettyName;
        if (cropInspection.variety !== undefined || cropInspection.variety !== null || cropInspection.variety !== "") {
            prettyNameWithVariety += " (" + cropInspection.variety + ")";
        }

        // RENDER OUR JSX CODE.
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
                    cropInspection={cropInspection}
                    isFirst={false}
                    isLast={false}
                />

                <div className="col-md-5 mx-auto mt-2">
                    <form className="needs-validation" noValidate>
                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <h2><i className="fas fa-eye"></i>&nbsp;{prettyNameWithVariety} Inspection</h2>
                        <p className="border-bottom mb-3 pb-1 text-secondary">Growth</p>

                        <BootstrapSingleSelect
                            label="What stage is your crop at? (*)"
                            name="stage"
                            defaultOptionLabel="Please select a choice."
                            options={stageOptions}
                            value={stage}
                            error={errors.stage}
                            onSelectChange={ option => onSelectChange(option.selectName, option.value, option.label) }
                        />

                        <p className="border-bottom mb-3 pb-1 text-secondary">Quality</p>

                        <BootstrapSingleSelect
                            label="How do the crops look today? (*)"
                            name="review"
                            defaultOptionLabel="Please select a choice."
                            options={PRODUCTION_CROPS_INSPECTION_REVIEW_OPTION_CHOICES}
                            value={review}
                            error={errors.review}
                            onSelectChange={ option => onSelectChange(option.selectName, option.value, option.label) }
                        />

                        {shouldDisplayReviewFailure &&
                            <BootstrapTextarea
                                name="failureReason"
                                borderColour="border-primary"
                                label="Why? (*)"
                                placeholder="Please describe why this rating?"
                                rows={5}
                                value={failureReason}
                                helpText={null}
                                onChange={ onTextChange }
                                error={errors.failureReason}
                            />
                        }

                        <p className="border-bottom mb-3 pb-1 text-secondary">Additional</p>

                        <BootstrapTextarea
                            name="notes"
                            borderColour="border-success"
                            label="Any final comments?"
                            placeholder="Add any final comments about this crop?"
                            rows={5}
                            value={theNotes}
                            helpText={null}
                            onChange={ onTextChange }
                            error={errors.notes}
                        />

                        <div className="form-group">
                            <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onBackClick}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
                            <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-primary" onClick={onNextClick}>
                                Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>
                        </div>

                    </form>
                </div>


            </div>
        );
    }
}

export default ProductionInspectionCreateStep2CropComponent;
