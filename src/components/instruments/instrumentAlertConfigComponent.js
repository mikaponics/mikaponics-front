import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';

import { BootstrapInput } from "../bootstrap/bootstrapInput";
import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";


class InstrumentAlertConfigComponent extends Component {
    render() {
        const {
            instrument, options,

            redAboveValue, redBelowValue, redAlertDelayInSecondsOption, onRedAlertDelayInSecondsChange,

            orangeAboveValue, orangeBelowValue, orangeAlertDelayInSecondsOption, onOrangeAlertDelayInSecondsChange,

            yellowAboveValue, yellowBelowValue, yellowAlertDelayInSecondsOption, onYellowAlertDelayInSecondsChange,

            errors = {}, wasSubmissionOK, isLoading, onChange,
            onClick
        } = this.props;

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/devices"><i className="fas fa-cubes"></i>&nbsp;Devices</Link>
                        </li>
                        <li className="breadcrumb-item">
                            {instrument.absoluteParentUrl &&
                                <Link to={`${instrument.absoluteParentUrl}`}><i className="fas fa-cube"></i>&nbsp;Device</Link>
                            }
                        </li>
                        {instrument.absoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}`}><i className={`fas fa-${instrument.icon}`}></i>&nbsp;Instrument</Link>
                            </li>
                        }
                        <li className="breadcrumb-item">
                            <Link to={`${instrument.absoluteUrl}/alerts`}><i className="fas fa-bell"></i>&nbsp;Alerts</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-cogs"></i>&nbsp;Configuration</li>
                    </ol>
                </nav>
                <h1>Alerts Configuration</h1>

                <div className="row">
                    <div className="col-md-12">
                        {wasSubmissionOK && <div className="alert alert-success" role="alert"><strong>Instrument alarm</strong> was successfully updated.</div>}
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
                        <div className="form-group">
                            <label for="redAlertDelayInSeconds">Above value</label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                value={redAlertDelayInSecondsOption}
                                onChange={onRedAlertDelayInSecondsChange}
                                name="redAlertDelayInSeconds"
                                placeholder="Please select..."
                                options={options}
                                clearableValue={false}
                            />
                            <small id="redAlertDelayInSeconds" className="form-text text-muted">The time that red alerts will be sent from the last time the red alert was sent.</small>
                            {errors.redAlertDelayInSeconds && <div className="invalid-feedback">{errors.redAlertDelayInSeconds}</div>}
                        </div>

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
                        <div className="form-group">
                            <label for="orangeAlertDelayInSeconds">Above value</label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                value={orangeAlertDelayInSecondsOption}
                                onChange={onOrangeAlertDelayInSecondsChange}
                                name="orangeAlertDelayInSeconds"
                                placeholder="Please select..."
                                options={options}
                                clearableValue={false}
                            />
                            <small id="orangeAlertDelayInSeconds" className="form-text text-muted">The time that orange alerts will be sent from the last time the orange alert was sent.</small>
                            {errors.orangeAlertDelayInSeconds && <div className="invalid-feedback">{errors.orangeAlertDelayInSeconds}</div>}
                        </div>

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
                        <div className="form-group">
                            <label for="yellowAlertDelayInSeconds">Above value</label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                value={yellowAlertDelayInSecondsOption}
                                onChange={onYellowAlertDelayInSecondsChange}
                                name="yellowAlertDelayInSeconds"
                                placeholder="Please select..."
                                options={options}
                                clearableValue={false}
                            />
                            <small id="yellowAlertDelayInSeconds" className="form-text text-muted">The time that yellow alerts will be sent from the last time the yellow alert was sent.</small>
                            {errors.yellowAlertDelayInSeconds && <div className="invalid-feedback">{errors.yellowAlertDelayInSeconds}</div>}
                        </div>
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
