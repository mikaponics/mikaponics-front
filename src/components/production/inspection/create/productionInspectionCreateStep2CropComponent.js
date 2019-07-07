import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapMultipleSelect } from "../../../bootstrap/bootstrapMultipleSelect";
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
            review, failureReason, stage, notes,
            pests, pestOptions, pestsOther,
            averageLength, averageWidth, averageHeight, averageMeasureUnit,
            errors, onBackClick, onNextClick, onSelectChange, onMultiChange, onTextChange
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

                        <h2><i className="fas fa-eye"></i>&nbsp;{cropInspection.prettyName} Inspection</h2>
                        <p>Please inspect your crop and answer the following quesitons.</p>
                        <p>All fields which have the (*) symbol are <strong>required</strong> to be filled out.</p>

                        <p className="border-bottom mb-3 pb-1 text-secondary">
                            <i className="fas fa-heartbeat"></i>&nbsp;Lifeline
                        </p>

                        <BootstrapSingleSelect
                            label="What stage is your crop at? (*)"
                            name="stage"
                            defaultOptionLabel="Please select a choice."
                            options={stageOptions}
                            value={stage}
                            error={errors.stage}
                            onSelectChange={ option => onSelectChange(option.selectName, option.value, option.label) }
                        />

                        <p className="border-bottom mb-3 pb-1 text-secondary">
                            <i className="fas fa-star"></i>&nbsp;Quality
                        </p>

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

                        <p className="border-bottom mb-3 pb-1 text-secondary">
                           <i className="fas fa-spider"></i>&nbsp;Pests
                        </p>

                        <BootstrapMultipleSelect
                            borderColour="border-success"
                            label="Pests"
                            name="pests"
                            defaultOptionLabel="Please select any pest discovered."
                            options={pestOptions}
                            selectedOptions={pests}
                            error={errors.pests}
                            onMultiChange={onMultiChange}
                        />

                        <BootstrapInput
                            inputClassName="form-control"
                            borderColour="border-success"
                            error={errors.pestsOther}
                            label="Other pests"
                            onChange={onTextChange}
                            value={pestsOther}
                            name="pestsOther"
                            type="text"
                            placeholder="Please specify other pests not listed in above."
                        />

                        <p className="border-bottom mb-3 pb-1 text-secondary">
                           <i className="fas fa-ruler"></i>&nbsp;Crop Measurements
                        </p>

                        <BootstrapInput
                            inputClassName="form-control"
                            borderColour="border-success"
                            error={errors.averageLength}
                            label="Average Length"
                            onChange={onTextChange}
                            value={averageLength}
                            name="averageLength"
                            type="number"
                            placeholder="Please specify average length across."
                        />
                        <BootstrapInput
                            inputClassName="form-control"
                            borderColour="border-success"
                            error={errors.averageWidth}
                            label="Average Width"
                            onChange={onTextChange}
                            value={averageWidth}
                            name="averageWidth"
                            type="number"
                            placeholder="Please specify average width across."
                        />
                        <BootstrapInput
                            inputClassName="form-control"
                            borderColour="border-success"
                            error={errors.averageHeight}
                            label="Average Height"
                            onChange={onTextChange}
                            value={averageHeight}
                            name="averageHeight"
                            type="number"
                            placeholder="Please specify average height across."
                        />
                        <BootstrapInput
                            inputClassName="form-control"
                            borderColour="border-success"
                            error={errors.averageMeasureUnit}
                            label="Unit of Measure"
                            onChange={onTextChange}
                            value={averageMeasureUnit}
                            name="averageMeasureUnit"
                            type="text"
                            placeholder="Please enter the unit of measurement used for the averages above."
                            helpText="If pests are not listed above, please specify here."
                        />

                        <p className="border-bottom mb-3 pb-1 text-secondary">
                            <i className="fas fa-asterisk"></i>&nbsp;Additional
                        </p>

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
