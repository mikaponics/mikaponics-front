import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from '../../bootstrap/bootstrapInput';
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';


class ProductionStep2CreateComponent extends Component {
    render() {
        const {
            variety, stageOptions, stage, plantOptions, plant, plantOther, showPlantOther, quantity, plantsArray, onPlantSelectChange, onStageSelectChange,
            substrateOptions, substrate, substrateOther, showSubstrateOther, substratesArray, onSubstrateSelectChange,
            onTextChange, onAddButtonClick, onRemoveButtonClick, onSaveModalClick, onCloseModalClick,  errors, showModal, onBackClick, onNextClick,
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
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Plants</span>
                            </strong>
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

                <h3 className="pt-4 pb-2 text-center"><i className="fas fa-leaf"></i>&nbsp;Plants Form</h3>
                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form className="needs-validation" noValidate>

                            <p>Please add all the plants you will be growing if any.</p>

                            <PlantsTable
                               plantsArray={plantsArray}
                               onAddButtonClick={onAddButtonClick}
                               onRemoveButtonClick={onRemoveButtonClick}
                            />

                            <ReactModal
                               isOpen={showModal}
                                style={customStyles}
                               contentLabel="Minimal Modal Example">
                               <div>

                                    <h1>
                                      Add Plant
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
                                                   label="Plant (*)"
                                                   name="plant"
                                                   defaultOptionLabel="Please plant to add."
                                                   options={plantOptions}
                                                   value={plant}
                                                   error={errors.plant}
                                                   onSelectChange={onPlantSelectChange}
                                               />

                                               {showPlantOther &&
                                                   <BootstrapInput
                                                       inputClassName="form-control"
                                                       borderColour="border-primary"
                                                       error={errors.plantOther}
                                                       label="Other - Please specify plant (*)"
                                                       onChange={onTextChange}
                                                       value={plantOther}
                                                       name="plantOther"
                                                       type="text"
                                                       placeholder="Please specify the plant you will be growing."
                                                   />
                                               }

                                               <BootstrapInput
                                                   inputClassName="form-control"
                                                   borderColour="border-success"
                                                   error={errors.variety}
                                                   label="Variety"
                                                   onChange={onTextChange}
                                                   value={variety}
                                                   name="variety"
                                                   type="text"
                                                   placeholder="Please specify the plant variety if it is unique."
                                                   helpText="Fill in this field if your plant is variety plant. For example, a valid `Tomato` variety choice would be `Kumato` or `Heirloom tomato`."
                                               />

                                               <BootstrapSingleSelect
                                                   label="Stage of growth (*)"
                                                   name="stage"
                                                   defaultOptionLabel="Please plant to add."
                                                   options={stageOptions}
                                                   value={stage}
                                                   error={errors.stage}
                                                   onSelectChange={onStageSelectChange}
                                               />

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

                                               <BootstrapSingleSelect
                                                   label="Substrate (*)"
                                                   name="substrate"
                                                   defaultOptionLabel="Please substrate to add."
                                                   options={substrateOptions}
                                                   value={substrate}
                                                   error={errors.substrate}
                                                   onSelectChange={onSubstrateSelectChange}
                                               />

                                               {showSubstrateOther &&
                                                   <BootstrapInput
                                                       inputClassName="form-control"
                                                       borderColour="border-primary"
                                                       error={errors.substrateOther}
                                                       label="Other - Please specify substrate (*)"
                                                       onChange={onTextChange}
                                                       value={substrateOther}
                                                       name="substrateOther"
                                                       type="text"
                                                       placeholder="Please specify the substrate you will be growing."
                                                   />
                                               }

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


class PlantsTableRow extends Component {
    render() {
        const { plantSlug, plant, quantity, onRemoveButtonClick } = this.props;
        return (
            <tr key={plantSlug}>
                <td>
                    {plant}
                </td>
                <td>
                    {quantity}
                </td>
                <td>
                    <button type="button" className="btn btn-danger float-right" aria-label="prev" onClick={() => onRemoveButtonClick(plantSlug)}>
                        <span className="fa fa-minus"></span>
                    </button>
                </td>
            </tr>
        );
    }
}


class PlantsTable extends Component {
    render() {
        const { plantsArray, onAddButtonClick, onRemoveButtonClick } = this.props;

        let elements = [];
        if (plantsArray !== undefined && plantsArray !== null) {
            for (let i = 0; i < plantsArray.length; i++) {
                let rowData = plantsArray[i];
                if (rowData !== null && rowData !== undefined) {
                    elements.push(
                        <PlantsTableRow
                            key={rowData.plantSlug}
                            plantSlug={rowData.plantSlug}
                            plant={rowData.plant}
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
                    <th>Plant</th>
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
