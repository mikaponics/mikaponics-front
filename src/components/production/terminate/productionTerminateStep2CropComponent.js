import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
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
    PRODUCTION_CROPS_BAD_HARVEST_REVIEW,
    PRODUCITON_OTHER_HARVEST_FAILURE_REASON
} from '../../../constants/api';
import ProductionTerminateWizardComponent from './productionTerminateWizardComponent';


export default class ProductionTerminateStep2CropComponent extends Component {
    render() {
        const {
            productionSlug, productionName, crop, crops, errors, isLoading,
            onBackClick, onNextClick, onTextChange, onSelectChange, onRadioChange,

            // DEVELOPER NOTE: BELOW IS WHERE YOU ADD MORE FIELDS TO COLLECT
            wasHarvested, wasHarvestedOptions, harvestFailureReason, harvestFailureReasonOptions, harvestFailureReasonOther,
            harvestYield, harvestYieldOptions, harvestQuality, harvestQualityOptions, harvestNotes, harvestWeight, harvestWeightUnit,
            averageLength, averageWidth, averageHeight,
        } = this.props;

        let shouldDisplayHarvestFailureReasons = wasHarvested === false || wasHarvested === 'false';
        let shouldDisplayHarvestSuccessReasons = wasHarvested === true || wasHarvested === 'true';
        let shouldDisplayHarvestFailureReasonOther = harvestFailureReason === PRODUCITON_OTHER_HARVEST_FAILURE_REASON;

        // DEFENSIVE CODE: PREVENT NULLS.
        if (crop === undefined || crop === null) {
            console.error("ProductionTerminateStep2CropComponent | render | null crop.");
            return null;
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
                   crop={crop}
                   isFirst={false}
                   isLast={false}
                />

                <div className="col-md-5 mx-auto mt-2">
                    <form className="needs-validation" noValidate>
                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <h2><i className="fas fa-shopping-basket"></i>&nbsp;{crop.prettyName}</h2>
                        <p className="border-bottom mb-3 pb-1 text-secondary"><i className="fas fa-shopping-basket"></i>&nbsp;Harvest</p>

                        <BootstrapRadio
                            inputClassName="form-check-input form-check-input-lg"
                            borderColour="border-primary"
                            error={errors.wasHarvested}
                            label="Was this crop harvested? (*)"
                            name="wasHarvested"
                            onChange={onRadioChange}
                            selectedValue={wasHarvested}
                            options={wasHarvestedOptions}
                        />

                        {shouldDisplayHarvestFailureReasons &&
                            <div>
                                <BootstrapSingleSelect
                                    label="Reason for harvest failure (*)"
                                    name="harvestFailureReason"
                                    defaultOptionLabel="Please select the monitoring hardware for your production."
                                    options={harvestFailureReasonOptions}
                                    value={harvestFailureReason}
                                    error={errors.harvestFailureReason}
                                    onSelectChange={ option => onSelectChange(option.selectName, option.value, option.label) }
                                />
                                {shouldDisplayHarvestFailureReasonOther &&
                                    <BootstrapInput
                                        inputClassName="form-control"
                                        borderColour="border-primary"
                                        error={errors.harvestFailureReasonOther}
                                        label="Reason for harvest failure - Other (*)"
                                        onChange={onTextChange}
                                        value={harvestFailureReasonOther}
                                        name="harvestFailureReasonOther"
                                        type="text"
                                        placeholder="Please specify."
                                    />
                                }
                            </div>
                        }
                        {shouldDisplayHarvestSuccessReasons &&
                            <div>
                                <BootstrapSingleSelect
                                    label="Harvest yield (*)"
                                    name="harvestYield"
                                    defaultOptionLabel="Please select the monitoring hardware for your production."
                                    options={harvestYieldOptions}
                                    value={harvestYield}
                                    error={errors.harvestYield}
                                    onSelectChange={ option => onSelectChange(option.selectName, option.value, option.label) }
                                />
                                <BootstrapSingleSelect
                                    label="Harvest quality (*)"
                                    name="harvestQuality"
                                    defaultOptionLabel="Please select the monitoring hardware for your production."
                                    options={harvestQualityOptions}
                                    value={harvestQuality}
                                    error={errors.harvestQuality}
                                    onSelectChange={ option => onSelectChange(option.selectName, option.value, option.label) }
                                />
                                <BootstrapTextarea
                                    name="harvestNotes"
                                    borderColour="border-success"
                                    label="Harvest Notes (*)"
                                    placeholder="Any additional notes or comments (s)."
                                    rows={5}
                                    value={harvestNotes}
                                    helpText={null}
                                    onChange={ onTextChange }
                                    error={errors.harvestNotes}
                                />
                                <BootstrapInput
                                    inputClassName="form-control"
                                    borderColour="border-success"
                                    error={errors.harvestWeight}
                                    label="Total weight of harvest - Value"
                                    onChange={onTextChange}
                                    value={harvestWeight}
                                    name="harvestWeight"
                                    type="text"
                                    placeholder="Please the total weight of the harvest."
                                />
                                <BootstrapInput
                                    inputClassName="form-control"
                                    borderColour="border-success"
                                    error={errors.harvestWeightUnit}
                                    label="Total weight of harvest - Unit of measure"
                                    onChange={onTextChange}
                                    value={harvestWeightUnit}
                                    name="harvestWeightUnit"
                                    type="text"
                                    placeholder="Please specify unit of measure for the weight."
                                />

                            </div>
                        }

                        <p className="border-bottom mb-3 pb-1 text-secondary"><i className="fas fa-chart-line"></i>&nbsp;Crop Growth</p>

                        <BootstrapInput
                            inputClassName="form-control"
                            borderColour="border-success"
                            error={errors.averageLength}
                            label="Average Length"
                            onChange={onTextChange}
                            value={averageLength}
                            name="averageLength"
                            type="text"
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
                            type="text"
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
                            type="text"
                            placeholder="Please specify average height across."
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
