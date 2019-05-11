import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../bootstrap/bootstrapTextarea";
import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from '../bootstrap/bootstrapSingleSelect';
import {
    PRODUCTION_CROP_STATE_AT_FINISH_OPTION_CHOICES,
    PRODUCTION_CROPS_HARVEST_REVIEW_AT_FINISH_OPTION_CHOICES,
    PRODUCTION_CROPS_DIED,
    PRODUCTION_CROPS_WERE_TERMINATED,
    PRODUCTION_CROPS_TERRIBLE_HARVEST_REVIEW,
    PRODUCTION_CROPS_BAD_HARVEST_REVIEW
} from '../../constants/api';


class PlantTerminationSurveyFormSection extends Component {
    render() {
        const { plants, errors, onSelectChange } = this.props;
        let elements = [];
        for (let i = 0; i < plants.length; i++) {
            let plantItem = plants[i];

            // IF THE PLANTS DIED OR WERE TERMINATED.
            let shouldDisplayStateFailure = false;
            if (plantItem.stateAtFinish === PRODUCTION_CROPS_DIED || plantItem.stateAtFinish === PRODUCTION_CROPS_WERE_TERMINATED) {
                shouldDisplayStateFailure = true;
            }

            // IF THE HARVEST FAILED.
            let shouldDisplayHarvestFailure = false;
            if (plantItem.harvestAtFinish === PRODUCTION_CROPS_TERRIBLE_HARVEST_REVIEW || plantItem.harvestAtFinish === PRODUCTION_CROPS_BAD_HARVEST_REVIEW) {
                shouldDisplayHarvestFailure = true;
            }

            elements.push(
                <div>
                    <p className="border-bottom mb-3 pb-1 text-secondary">{plantItem.crop}</p>
                    <BootstrapSingleSelect
                        label="What happened to the crops? (*)"
                        name="stateAtFinish"
                        defaultOptionLabel="Please select the monitoring hardware for your production."
                        options={PRODUCTION_CROP_STATE_AT_FINISH_OPTION_CHOICES}
                        value={plantItem.stateAtFinish}
                        error={errors.stateAtFinish}
                        onSelectChange={ option => onSelectChange('plants', plantItem.slug, option.selectName, option.value) }
                    />

                    {shouldDisplayStateFailure &&
                        <BootstrapTextarea
                            name="description"
                            borderColour="border-primary"
                            label="Please describe the reason:"
                            placeholder="Please describe why this happend to the crop"
                            rows={5}
                            value={null}
                            helpText={null}
                            onChange={null}
                            error={errors.description}
                        />
                    }

                    <BootstrapSingleSelect
                        label="How would you describe the plant harvest? (*)"
                        name="harvestAtFinish"
                        defaultOptionLabel="Please select the monitoring hardware for your production."
                        options={PRODUCTION_CROPS_HARVEST_REVIEW_AT_FINISH_OPTION_CHOICES}
                        value={plantItem.harvestAtFinish}
                        error={errors.harvestAtFinish}
                        onSelectChange={ option => onSelectChange('plants', plantItem.slug, option.selectName, option.value) }
                    />

                    {shouldDisplayHarvestFailure &&
                        <BootstrapTextarea
                            name="descriptionsss"
                            borderColour="border-primary"
                            label="Please what happened:"
                            placeholder="Please describe why this happend to the crop"
                            rows={5}
                            value={null}
                            helpText={null}
                            onChange={null}
                            error={errors.description}
                        />
                    }

                    <BootstrapTextarea
                        name="description"
                        borderColour="border-success"
                        label="Any comments?"
                        placeholder="Please describe why this happend to the crop"
                        rows={5}
                        value={null}
                        helpText={null}
                        onChange={null}
                        error={errors.description}
                    />

                </div>
            );
        }
        return (
            <div>
                {elements}
            </div>
        );
    }
}


class FishTerminationSurveyFormSection extends Component {
    render() {
        const { fish, errors, onSelectChange } = this.props;
        let elements = [];
        for (let i = 0; i < fish.length; i++) {
            let fishItem = fish[i];

            let shouldDisplayStateFailure = false;
            if (fishItem.stateAtFinish === PRODUCTION_CROPS_DIED || fishItem.stateAtFinish === PRODUCTION_CROPS_WERE_TERMINATED) {
                shouldDisplayStateFailure = true;
            }

            elements.push(
                <div>
                    <p className="border-bottom mb-3 pb-1 text-secondary">{fishItem.crop}</p>

                    <BootstrapSingleSelect
                        label="What happened to the fish? (*)"
                        name="stateAtFinish"
                        defaultOptionLabel="Please select the monitoring hardware for your production."
                        options={PRODUCTION_CROP_STATE_AT_FINISH_OPTION_CHOICES}
                        value={fishItem.stateAtFinish}
                        error={errors.stateAtFinish}
                        onSelectChange={ option => onSelectChange('fish', fishItem.slug, option.selectName, option.value) }
                    />

                    {shouldDisplayStateFailure &&
                        <BootstrapTextarea
                            name="description"
                            borderColour="border-primary"
                            label="Reason"
                            placeholder="Please describe why this happend to the crop"
                            rows={5}
                            value={null}
                            helpText={null}
                            onChange={null}
                            error={errors.description}
                        />
                    }

                    <BootstrapSingleSelect
                        label="How would you describe the fish harvest? (*)"
                        name="harvestAtFinish"
                        defaultOptionLabel="Please select the monitoring hardware for your production."
                        options={PRODUCTION_CROPS_HARVEST_REVIEW_AT_FINISH_OPTION_CHOICES}
                        value={fishItem.harvestAtFinish}
                        error={errors.harvestAtFinish}
                        onSelectChange={ option => onSelectChange('fish', fishItem.slug, option.selectName, option.value) }
                    />

                    <BootstrapTextarea
                        name="description"
                        borderColour="border-success"
                        label="Any comments?"
                        placeholder="Please describe why this happend to the crop"
                        rows={5}
                        value={null}
                        helpText={null}
                        onChange={null}
                        error={errors.description}
                    />

                </div>
            );
        }
        return (
            <div>
                {elements}
            </div>
        );
    }
}

class ProductionTerminateComponent extends Component {
    render() {
        const { name, slug, plants, fish, errors, finishedAt, onBackClick, onSubmit, onSelectChange } = this.props;
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
                            <i className="fas fa-shopping-basket"></i>&nbsp;Harvest - Terminate
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-shopping-basket"></i>&nbsp;Harvest or Terminate</h1>

                <div className="col-md-5 mx-auto mt-2">
                    <form className="needs-validation" noValidate>
                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <h3 className="pt-4 pb-2 text-center">Crops Review</h3>
                        <p>All fields which have the (*) symbol are required to be filled out.</p>

                        <PlantTerminationSurveyFormSection
                            plants={plants}
                            errors={errors}
                            onSelectChange={onSelectChange}
                        />

                        <FishTerminationSurveyFormSection
                            fish={fish}
                            errors={errors}
                            onSelectChange={onSelectChange}
                        />

                        <h3 className="pt-4 pb-2 text-center">Overall Review</h3>

                        <BootstrapTextarea
                            name="description"
                            borderColour="border-success"
                            label="Any comments?"
                            placeholder="Please describe why this happend to the crop"
                            rows={5}
                            value={null}
                            helpText={"This is the description of the production."}
                            onChange={null}
                            error={errors.description}
                        />

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


export default ProductionTerminateComponent;
