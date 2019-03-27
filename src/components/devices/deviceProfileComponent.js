import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../bootstrap/bootstrapTextarea";


class DeviceProfileComponent extends Component {
    render() {
        const { device, name, description, errors, isLoading, onChange, onClick } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li class="breadcrumb-item">
                           <Link to={`/device/${device.slug}`}>Device</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Profile</li>
                    </ol>
                </nav>
                <h1>Device Profile</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <BootstrapInput
                            id="id_name"
                            field="name"
                            type="text"
                            label="Name"
                            placeholder="Please set the device name"
                            value={name}
                            helpText="This is the name of the device."
                            onChange={onChange}
                            error={errors.name}
                        />
                        <BootstrapTextarea
                            id="id_desc"
                            field="description"
                            type="textarea"
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
