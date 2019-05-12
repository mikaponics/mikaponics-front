import React, { Component } from 'react';
import { Link } from "react-router-dom";

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


class ProductionTerminateCropComponent extends Component {
    render() {
        const { crops, crop, name, slug, plants, fish, errors, finishedAt, onBackClick, onSubmit, onSelectChange, onTextChange } = this.props;

        // IF THE PLANTS DIED OR WERE TERMINATED.
        let shouldDisplayStateFailure = false;
        let shouldDisplayHarvestFailure = false;

        // DEFENSIVE CODE: PREVENT NULLS.
        if (crop === undefined || crop === null) {
            console.error("ProductionTerminateCropComponent | render | null crop.");
            return null;
        }

        // IF THE CROP FAILED.
        if (crop.stateAtFinish === PRODUCTION_CROPS_DIED || crop.stateAtFinish === PRODUCTION_CROPS_WERE_TERMINATED) {
            shouldDisplayStateFailure = true;
        }

        // IF THE HARVEST FAILED.
        if (crop.harvestAtFinish === PRODUCTION_CROPS_TERRIBLE_HARVEST_REVIEW || crop.harvestAtFinish === PRODUCTION_CROPS_BAD_HARVEST_REVIEW) {
            shouldDisplayHarvestFailure = true;
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
                   crop={crop}
                   isFirst={false}
                   isLast={false}
                />

                <div className="col-md-5 mx-auto mt-2">
                    <form className="needs-validation" noValidate>
                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <h3>{crop.prettyName}</h3>
                        <p className="border-bottom mb-3 pb-1 text-secondary">Lifespan</p>

                        <BootstrapSingleSelect
                            label="What happened to the crops? (*)"
                            name="stateAtFinish"
                            defaultOptionLabel="Please select the monitoring hardware for your production."
                            options={PRODUCTION_CROP_STATE_AT_FINISH_OPTION_CHOICES}
                            value={crop.stateAtFinish}
                            error={errors.stateAtFinish}
                            onSelectChange={ option => onSelectChange(option.selectName, option.value) }
                        />

                        {shouldDisplayStateFailure &&
                            <BootstrapTextarea
                                name="stateFailureReasonAtFinish"
                                borderColour="border-primary"
                                label="Why? (*)"
                                placeholder="Please describe why this happend to the crop(s)."
                                rows={5}
                                value={crop.stateFailureReasonAtFinish}
                                helpText={null}
                                onChange={ onTextChange }
                                error={errors.stateFailureReasonAtFinish}
                            />
                        }

                        <p className="border-bottom mb-3 pb-1 text-secondary">Harvest</p>

                        <BootstrapSingleSelect
                            label="How would you describe the plant harvest? (*)"
                            name="harvestAtFinish"
                            defaultOptionLabel="Please select the monitoring hardware for your production."
                            options={PRODUCTION_CROPS_HARVEST_REVIEW_AT_FINISH_OPTION_CHOICES}
                            value={crop.harvestAtFinish}
                            error={errors.harvestAtFinish}
                            onSelectChange={ option => onSelectChange(option.selectName, option.value) }
                        />

                        {shouldDisplayHarvestFailure &&
                            <BootstrapTextarea
                                name="harvestFailureReasonAtFinish"
                                borderColour="border-primary"
                                label="Why? (*)"
                                placeholder="Please describe why this happend to the crop"
                                rows={5}
                                value={crop.harvestFailureReasonAtFinish}
                                helpText={null}
                                onChange={ onTextChange }
                                error={errors.harvestFailureReasonAtFinish}
                            />
                        }

                        <BootstrapTextarea
                            name="harvestNotesAtFinish"
                            borderColour="border-success"
                            label="Any notes about the harvest?"
                            placeholder="Add any additional notes you have out the harves."
                            rows={5}
                            value={crop.harvestNotesAtFinish}
                            helpText={null}
                            onChange={ onTextChange }
                            error={errors.harvestNotesAtFinish}
                        />

                        <p className="border-bottom mb-3 pb-1 text-secondary">Additional</p>

                        <BootstrapTextarea
                            name="notesAtFinish"
                            borderColour="border-success"
                            label="Any final comments?"
                            placeholder="Add any final comments about this crop?"
                            rows={5}
                            value={crop.notesAtFinish}
                            helpText={null}
                            onChange={ onTextChange }
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


export default ProductionTerminateCropComponent;
