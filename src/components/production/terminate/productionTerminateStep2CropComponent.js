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
    PRODUCTION_CROPS_BAD_HARVEST_REVIEW
} from '../../../constants/api';
import ProductionTerminateWizardComponent from './productionTerminateWizardComponent';


export default class ProductionTerminateStep2CropComponent extends Component {
    render() {
        const {
            productionSlug, productionName, crop, crops, errors, isLoading,
            onBackClick, onNextClick, onTextChange, onSelectChange, onRadioChange,

            // DEVELOPER NOTE: BELOW IS WHERE YOU ADD MORE FIELDS TO COLLECT
            wasHarvested, wasHarvestedOptions, harvestFailureReason, harvestFailureReasonOptions,
        } = this.props;

        let shouldDisplayHarvestFailureReasons = wasHarvested === false || wasHarvested === 'false';

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
                            <BootstrapSingleSelect
                                label="Reason for harvest failure (*)"
                                name="harvestFailureReason"
                                defaultOptionLabel="Please select the monitoring hardware for your production."
                                options={harvestFailureReasonOptions}
                                value={harvestFailureReason}
                                error={errors.harvestFailureReason}
                                onSelectChange={ option => onSelectChange(option.selectName, option.value, option.label) }
                            />
                        }

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
