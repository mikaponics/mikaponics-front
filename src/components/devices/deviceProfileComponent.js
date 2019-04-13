import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../bootstrap/bootstrapTextarea";
import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";


class DeviceProfileComponent extends Component {
    render() {
        const { device, name, description, errors, isLoading, onChange, onClick } = this.props;
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
                           <Link to={`/device/${device.slug}`}><i className="fas fa-cube"></i>&nbsp;Device</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-info"></i>&nbsp;Profile</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-info"></i>&nbsp;Device Profile</h1>
                <div className="row">
                    <div className="col-md-12">
                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <BootstrapInput
                            className="form-control form-control-lg"
                            borderColour="border-primary"
                            error={errors.email}
                            label="Name (*)"
                            onChange={onChange}
                            value={name}
                            name="name"
                            helpText="This is the name of the device."
                            placeholder="Please set the device name"
                            type="text"
                        />
                        <BootstrapTextarea
                            name="description"
                            borderColour="border-primary"
                            label="Description"
                            placeholder="Please set the device description"
                            rows="5"
                            value={description}
                            helpText="This is the description of the device."
                            onChange={onChange}
                            error={errors.description}
                        />
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

export default DeviceProfileComponent;
