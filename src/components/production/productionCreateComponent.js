import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../bootstrap/bootstrapSingleSelect';
import { BootstrapTextarea } from '../bootstrap/bootstrapTextarea';


class ProductionCreateComponent extends Component {
    render() {
        const {
            name, description, deviceOptions, device,
            onTextChange, onSelectChange, onSubmit, errors
        } = this.props;

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

                <h3 className="pt-4 pb-2 text-center">Purchase Form</h3>
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
                                rows="5"
                                value={description}
                                helpText="This is the description of the production."
                                onChange={onTextChange}
                                error={errors.description}
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

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductionCreateComponent;
