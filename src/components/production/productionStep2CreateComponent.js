import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../bootstrap/bootstrapSingleSelect';


class ProductionStep2CreateComponent extends Component {
    render() {
        const {
            onBackClick, onNextClick,
            cropOptions, crop, cropOther, showOther, quantity, cropsArray,
            onTextChange, onCropSelectChange, onAddButtonClick, onRemoveButtonClick, onSaveModalClick, onCloseModalClick,  errors, showModal
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

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/add-production-step-1">
                                <span className="num">1.</span><span className="">General Information</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <span className="num">2.</span><span className="">Plants</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Fish</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Review</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Confirmation</span>
                        </div>
                    </div>
                </div>

                <h3 className="pt-4 pb-2 text-center">Plants Form</h3>
                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form className="needs-validation" noValidate>

                            <p>Please add all the plants you will be growing if any.</p>

                            <CropsTable
                               cropsArray={cropsArray}
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

                                            <BootstrapErrorsProcessingAlert errors={errors} />

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

                                               {showOther &&
                                                   <BootstrapInput
                                                       inputClassName="form-control"
                                                       borderColour="border-primary"
                                                       error={errors.cropOther}
                                                       label="Other - Please specify plant (*)"
                                                       onChange={onTextChange}
                                                       value={cropOther}
                                                       name="cropOther"
                                                       type="text"
                                                       placeholder="Please specify the plant you will be growing."
                                                   />
                                               }

                                               <BootstrapInput
                                                   inputClassName="form-control"
                                                   borderColour="border-primary"
                                                   error={errors.quantity}
                                                   label="Quantity (*)"
                                                   onChange={onTextChange}
                                                   value={quantity}
                                                   name="quantity"
                                                   type="number"
                                                   placeholder="Please specify how many plants there will be.."
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

export default ProductionStep2CreateComponent;


class CropsTableRow extends Component {
    render() {
        const { slug, name, quantity, onRemoveButtonClick } = this.props;
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
        const { cropsArray, onAddButtonClick, onRemoveButtonClick } = this.props;

        let elements = [];
        if (cropsArray !== undefined && cropsArray !== null) {
            for (let i = 0; i < cropsArray.length; i++) {
                let rowData = cropsArray[i];
                if (rowData !== null && rowData !== undefined) {
                    elements.push(
                        <CropsTableRow
                            key={rowData.slug}
                            slug={rowData.slug}
                            name={rowData.name}
                            quantity={rowData.quantity}
                            onRemoveButtonClick={onRemoveButtonClick}
                        />
                    );
                }
            }
        }

        return (
            <div className="table-responsive">


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
