import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BootstrapCheckbox } from "../../../bootstrap/bootstrapCheckbox";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import ProductionInspectionCreateStepNavigationComponent from './productionInspectionCreateStepNavigationComponent';


class ProductionInspectionCreateStartComponent extends Component {
    render() {

        const {
            productionInspectionDetail,
            productionDetail,
            pageIndex, name, slug, crops, errors={},
            didPass, didPassOptions, failureReason, notes,
            onBackClick, onSubmit, onSelectChange,
            onTextChange, onRadioChange
        } = this.props;

        // IF THE HARVEST FAILED.
        let shouldDisplaWasFailure = false;
        if (didPass === false || didPass === "false") {
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
                   productionInspectionDetail={productionInspectionDetail}
                   productionCropInspectionDetail={null}
                   isFirst={true}
                   isLast={false}
                />

                <div className="col-md-5 mx-auto mt-2">
                    <form className="needs-validation" noValidate>
                        <p>All fields which have the (*) symbol are required to be filled out.</p>

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <BootstrapRadio
                            inputClassName="form-check-input form-check-input-lg"
                            borderColour="border-primary"
                            error={errors.didPass}
                            label="Did the inspection pass? (*)"
                            name="didPass"
                            onChange={onRadioChange}
                            selectedValue={didPass}
                            options={didPassOptions}
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

export default ProductionInspectionCreateStartComponent;
