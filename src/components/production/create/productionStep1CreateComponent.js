import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';
import { BootstrapTextarea } from '../../bootstrap/bootstrapTextarea';
import { BootstrapCheckbox } from "../../bootstrap/bootstrapCheckbox";
import { BootstrapTimePicker } from "../../bootstrap/bootstrapTimePicker";
import { PRODUCTION_OTHER_SYSTEM, PRODUCTION_OTHER_TYPE } from "../../../constants/api";


class ProductionStep1CreateComponent extends Component {
    render() {
        const {
            name, description, isCommercial, deviceOptions, device, environmentOptions, environment, typeOfOptions, typeOf, typeOfOther, growSystemOptions, growSystem, growSystemOther,
            hasDayAndNightCycle, dayStartsAt, dayFinishesAt, onNightStartTimeChange, onNightFinishTimeChange,
            onTextChange, onSelectChange, onCheckboxChange, onCancelClick, onNextClick, errors
        } = this.props;

        const showGrowSystemOtherField = growSystem === PRODUCTION_OTHER_SYSTEM;
        const showTypeOfOtherField = typeOf === PRODUCTION_OTHER_TYPE;
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
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-plus"></i>&nbsp;Add</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">General Information</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Plants</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Fish</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Notifications</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <h3 className="pt-4 pb-2 text-center"><i className="fas fa-file-alt"></i>&nbsp;General Information Form</h3>
                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form className="needs-validation" noValidate>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">General Information</p>

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.name}
                                label="Name (*)"
                                onChange={onTextChange}
                                value={name}
                                name="name"
                                type="text"
                                placeholder="Please write a title for your production. Ex: My Aquaponic Setup."
                            />

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-primary"
                                label="Description"
                                placeholder="Please write a short description of your production."
                                rows={5}
                                value={description}
                                helpText="This is the description of the production."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.isCommercial}
                                label="Is this being grown in a commercial setting or for commercial purposes?"
                                onChange={onCheckboxChange}
                                value={isCommercial}
                                name="isCommercial"
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">Telemetry</p>

                            <BootstrapSingleSelect
                                label="Device (*)"
                                name="device"
                                defaultOptionLabel="Please select the monitoring hardware for your production."
                                options={deviceOptions}
                                value={device}
                                error={errors.device}
                                onSelectChange={onSelectChange}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">Operation</p>

                            <BootstrapSingleSelect
                                label="Environment (*)"
                                name="environment"
                                defaultOptionLabel="Please select operating environment."
                                options={environmentOptions}
                                value={environment}
                                error={errors.environment}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapSingleSelect
                                label="Type (*)"
                                name="typeOf"
                                defaultOptionLabel="Please select the type of grow setup."
                                options={typeOfOptions}
                                value={typeOf}
                                error={errors.typeOf}
                                onSelectChange={onSelectChange}
                            />

                            {showTypeOfOtherField &&
                                <BootstrapInput
                                    inputClassName="form-control"
                                    borderColour="border-primary"
                                    error={errors.typeOfOther}
                                    label="Type - Other (*)"
                                    onChange={onTextChange}
                                    value={typeOfOther}
                                    name="typeOfOther"
                                    type="text"
                                    placeholder="Please write the type of."
                                />
                            }

                            <BootstrapSingleSelect
                                label="Grow System (*)"
                                name="growSystem"
                                defaultOptionLabel="Please select the grow system used."
                                options={growSystemOptions}
                                value={growSystem}
                                error={errors.growSystem}
                                onSelectChange={onSelectChange}
                            />
                            {showGrowSystemOtherField &&
                                <BootstrapInput
                                    inputClassName="form-control"
                                    borderColour="border-primary"
                                    error={errors.growSystemOther}
                                    label="Other (*)"
                                    onChange={onTextChange}
                                    value={growSystemOther}
                                    name="growSystemOther"
                                    type="text"
                                    placeholder="Please write the name of your grow system."
                                />
                            }

                            <p className="border-bottom mb-3 pb-1 text-secondary">Night Period</p>

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.hasDayAndNightCycle}
                                label="Does your production have dark period, a.k.a. night time?"
                                onChange={onCheckboxChange}
                                value={hasDayAndNightCycle}
                                name="hasDayAndNightCycle"
                            />

                            {hasDayAndNightCycle &&
                                <div>
                                    <p>Please specify the hours that makes up a day.</p>
                                    <BootstrapTimePicker
                                        label="Day start at"
                                        name="dayStartsAt"
                                        dateObj={dayStartsAt}
                                        onTimeChange={onNightStartTimeChange}
                                        datePickerClassName="form-control form-control-lg border"
                                        divClassName="form-group p-0 col-md-7 mb-4"
                                    />
                                    <BootstrapTimePicker
                                        label="Day finishes at"
                                        name="dayFinishesAt"
                                        dateObj={dayFinishesAt}
                                        onTimeChange={onNightFinishTimeChange}
                                        datePickerClassName="form-control form-control-lg border"
                                        borderClassname="border-primary"
                                        divClassName="form-group p-0 col-md-7 mb-4"
                                    />
                                </div>
                            }

                            <br />

                            <div className="form-group">
                                <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onCancelClick}>
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </button>
                                <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-primary" onClick={onNextClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductionStep1CreateComponent;
