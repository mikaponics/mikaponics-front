import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../bootstrap/bootstrapSingleSelect';
import { BootstrapTextarea } from '../bootstrap/bootstrapTextarea';


class ProductionStep2CreateComponent extends Component {
    render() {
        const {
            name, description, deviceOptions, device, cropOptions, crop, cropQuantity, cropsTableData,
            onTextChange, onSelectChange, onCropSelectChange, onAddButtonClick, onRemoveButtonClick, onSaveModalClick, onCloseModalClick, onSubmit, errors, showModal
        } = this.props;

        // Apply our styling for our modal component.
        const customStyles = {
            content : {
                marginRight           : '0%',
                marginLeft            : '0%',
                marginTop             : '65px',
                marginBottom          : '0%',
            }
        };

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

                            <p className="border-bottom mb-3 pb-1 text-secondary">Crops</p>

                            <CropsTable
                               cropsTableData={cropsTableData}
                               onAddButtonClick={onAddButtonClick}
                               onRemoveButtonClick={onRemoveButtonClick}
                            />

                            <ReactModal
                               isOpen={showModal}
                                style={customStyles}
                               contentLabel="Minimal Modal Example">
                               <div>
                                    <h1>
                                      Add Crop
                                       <button type="button" className="btn btn-secondary btn-lg float-right" onClick={onCloseModalClick}>
                                           <span className="fa fa-times"></span>
                                       </button>
                                    </h1>

                                   <div className="row">
                                       <div className="col-md-8 mx-auto mt-2">
                                           <form className="needs-validation" noValidate>

                                               <p>All fields which have the (*) symbol are required to be filled out.</p>

                                               <BootstrapSingleSelect
                                                   label="Crop (*)"
                                                   name="crop"
                                                   defaultOptionLabel="Please crop to add."
                                                   options={cropOptions}
                                                   value={crop}
                                                   error={errors.crop}
                                                   onSelectChange={onCropSelectChange}
                                               />

                                               <BootstrapInput
                                                   inputClassName="form-control"
                                                   borderColour="border-primary"
                                                   error={errors.cropQuantity}
                                                   label="Quantity (*)"
                                                   onChange={onTextChange}
                                                   value={cropQuantity}
                                                   name="cropQuantity"
                                                   type="number"
                                                   placeholder="Please write a title for your production. Ex: My Aquaponic Setup."
                                               />
                                               <button
                                                   onClick={onCloseModalClick}
                                                   type="button"
                                                   className="btn btn-lg btn-secondary float-left">
                                                   <i className="fas fa-times"></i>&nbsp;Close
                                               </button>
                                               <button
                                                   onClick={onSaveModalClick}
                                                   type="button"
                                                   className="btn btn-lg btn-success float-right">
                                                   <i className="fas fa-check"></i>&nbsp;Save
                                               </button>
                                           </form>
                                       </div>
                                   </div>
                               </div>
                            </ReactModal>




                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductionStep2CreateComponent;


class CropsTableRow extends Component {
    render() {
        const { slug, name, quantity, onRemoveButtonClick } = this.props;
        console.log(this.props);
        return (
            <tr key={slug}>
                <td>
                    {name}
                </td>
                <td>
                    {quantity}
                </td>
                <td>
                    <button type="button" className="btn btn-danger float-right" aria-label="prev" onClick={() => onRemoveButtonClick(slug)}>
                        <span className="fa fa-minus"></span>
                    </button>
                </td>
            </tr>
        );
    }
}


class CropsTable extends Component {
    render() {
        const { cropsTableData, onAddButtonClick, onRemoveButtonClick } = this.props;

        console.log("cropsTableData >", cropsTableData);

        let elements = [];
        for (let i = 0; i < cropsTableData.length; i++) {
            let rowData = cropsTableData[i];
            console.log("cropsTableData > rowData >", rowData);
            elements.push(
                <CropsTableRow
                    slug={rowData.slug}
                    name={rowData.name}
                    quantity={rowData.quantity}
                    onRemoveButtonClick={onRemoveButtonClick} />
            );
        }
        return (
            <div className="table-responsive">

               <p>Please the plants and or fish you will be growing.</p>
                <table className="table table-striped">

                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>
                    <button type="button" className="btn btn-success float-right" onClick={onAddButtonClick}>
                        <span className="fa fa-plus"></span>
                    </button>

                    </th>
                </tr>
                </thead>
                    <tbody>
                        {elements}
                    </tbody>
                </table>
            </div>
        );
    }
}
