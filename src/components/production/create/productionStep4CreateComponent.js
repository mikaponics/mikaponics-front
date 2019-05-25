import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';


class ProductionStep4CreateComponent extends Component {
    render() {
        const {
            inspectionFrequency, inspectionFrequencyOptions, onSelectChange,
            redBelowValue, redAlertDelayInSeconds, redAlertDelayInSecondsOptions,
            inspectionsStartAt, onInspectionsStartAtChange,
            errors, onTextChange, onBackClick, onNextClick,
        } = this.props;


        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/productions"><i className="fas fa-industry"></i>&nbsp;Plant Production</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-plus"></i>&nbsp;Add</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/add-production-step-1">
                                <span className="num">1.</span><span className="">General Information</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/add-production-step-2">
                                <span className="num">2.</span><span className="">Plants</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/add-production-step-3">
                                <span className="num">3.</span><span className="">Fish</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <span className="num">4.</span><span className="">Notifications</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <h3 className="pt-4 pb-2 text-center"><i className="fas fa-bullhorn"></i>&nbsp;Notifications</h3>
                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form className="needs-validation" noValidate>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary"><i className="fas fa-eye"></i>&nbsp;Scheduled Quality Inspections</p>

                            <BootstrapDatePicker
                                label="Inspections start at"
                                name="inspectionsStartAt"
                                dateObj={inspectionsStartAt}
                                onTimeChange={onInspectionsStartAtChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                            />

                            <BootstrapSingleSelect
                                label="Inspection Frequency (*)"
                                name="inspectionFrequency"
                                defaultOptionLabel="Please select how frequently you will be performing quality inspections."
                                options={inspectionFrequencyOptions}
                                value={inspectionFrequency}
                                error={errors.inspectionFrequency}
                                onSelectChange={onSelectChange}
                            />

                            <br />

                            <p className="border-bottom mb-3 pb-1 text-secondary"><i className="fas fa-fire"></i>&nbsp;Evaluation Red Alerts</p>
                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                name="redBelowValue"
                                type="number"
                                label="Red alert when below value (*)"
                                placeholder="Pick any number from 0% to 100%."
                                value={redBelowValue}
                                helpText="Any evaluation score below this value will cause a red alert."
                                onChange={onTextChange}
                                error={errors.redBelowValue}
                            />

                            <BootstrapSingleSelect
                                label="Red alert delay in seconds (*)"
                                name="redAlertDelayInSeconds"
                                defaultOptionLabel="Please select how frequently you will be performing quality inspections."
                                options={redAlertDelayInSecondsOptions}
                                value={redAlertDelayInSeconds}
                                error={errors.redAlertDelayInSeconds}
                                onSelectChange={onSelectChange}
                            />

                            <br />
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
            </div>
        );
    }
}

export default ProductionStep4CreateComponent;
