import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../bootstrap/bootstrapInput";
import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapSelect } from "../bootstrap/bootstrapSelect";


class InstrumentAlertConfigComponent extends Component {
    render() {
        const {
            instrument, redAboveValue, redBelowValue,
            orangeAboveValue, orangeBelowValue, yellowAboveValue, yellowBelowValue,
            errors = {}, wasSubmissionOK, isLoading, onChange, onSelectChange,
            onClick, options
        } = this.props;

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li class="breadcrumb-item">
                            {instrument.absoluteParentUrl &&
                                <Link to={`${instrument.absoluteParentUrl}`}>Device</Link>
                            }
                        </li>
                        {instrument.absoluteUrl &&
                            <li class="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}`}>Instrument</Link>
                            </li>
                        }
                        <li class="breadcrumb-item">
                            <Link to={`${instrument.absoluteUrl}/alerts`}>Alerts</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Configuration</li>
                    </ol>
                </nav>
                <h1>Alerts Configuration</h1>

                <div className="row">
                    <div className="col-md-12">
                        {wasSubmissionOK && <div class="alert alert-success" role="alert"><strong>Instrument alarm</strong> was successfully updated.</div>}
                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <h2>Red Alarm</h2>
                        <hr />
                        <BootstrapInput
                            id="idRAV"
                            field="redAboveValue"
                            type="number"
                            label="Above value"
                            placeholder="℃"
                            value={redAboveValue}
                            helpText="Maximum value cannot be larger then some ℃."
                            onChange={onChange}
                            error={errors.redAboveValue}
                        />
                        <BootstrapInput
                            id="idRBV"
                            field="redBelowValue"
                            type="number"
                            label="Below value"
                            placeholder="℃"
                            value={redBelowValue}
                            helpText="Minimum value cannot be smaller then some ℃."
                            onChange={onChange}
                            error={errors.redBelowValue}
                        />
                        <BootstrapSelect
                            id="idRD"
                            name="redAlertDelayInSeconds"
                            label="After delay"
                            allowMultipleSelect={true}
                            defaultOptionLabel="Please select..."
                            selectedValues={[]}
                            options={options}
                            helpText="The time that red alerts will be sent from the last time the red alert was sent."
                            error={errors.redAlertDelayInSeconds}
                            onChange={onSelectChange}
                        />

                        <br />
                        <h2>Orange Alarm</h2>
                        <hr />
                        <BootstrapInput
                            id="idOAV"
                            field="orangeAboveValue"
                            type="number"
                            label="Above value"
                            placeholder="℃"
                            value={orangeAboveValue}
                            helpText="Maximum value cannot be larger then some ℃."
                            onChange={onChange}
                            error={errors.orangeAboveValue}
                        />
                        <BootstrapInput
                            id="IDOBV"
                            field="orangeBelowValue"
                            type="number"
                            label="Below value"
                            placeholder="℃"
                            value={orangeBelowValue}
                            helpText="Minimum value cannot be smaller then some ℃."
                            onChange={onChange}
                            error={errors.orangeBelowValue}
                        />

                        <br />
                        <h2>Yellow Alarm</h2>
                        <hr />
                        <BootstrapInput
                            id="idYAV"
                            field="yellowAboveValue"
                            type="number"
                            label="Above value"
                            placeholder="℃"
                            value={yellowAboveValue}
                            helpText="Maximum value cannot be larger then some ℃."
                            onChange={onChange}
                            error={errors.yellowAboveValue}
                        />
                        <BootstrapInput
                            id="idYBV"
                            field="yellowBelowValue"
                            type="number"
                            label="Below value"
                            placeholder="℃"
                            value={yellowBelowValue}
                            helpText="Minimum value cannot be smaller then some ℃."
                            onChange={onChange}
                            error={errors.yellowBelowValue}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={isLoading}
                            onClick={onClick}>Save
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default InstrumentAlertConfigComponent;
