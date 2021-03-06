import React, { Component } from 'react';
import { Link } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
import 'moment-timezone';
import { PRODUCTION_OPERATING_STATE, PRODUCTION_TERMINATED_STATE } from "../../constants/api";

import { FlashMessageComponent } from "../flashMessageComponent";


class ProductionCard extends Component {
    render() {
        const { productionObj } = this.props;
        return (
            <div className="col-sm-4">
                <div className="card box-shadow text-center mx-auto">
                    <div className="card-custom-top-2">
                        <i className="fas fa-leaf fa-3x"></i>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{productionObj.name}</h3>
                        <p className="card-text">{productionObj.description}</p>
                        <Link to={productionObj.absoluteUrl} className="btn btn-success btn-lg">
                            Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

class ProductionCards extends Component {
    render() {
        const { productionList, state } = this.props;
        let elements = [];

        for (let i = 0; i < productionList.results.length; i++) {
            let productionItem = productionList.results[i];
            console.log(productionItem, state);
            if (productionItem.state === state) {
                elements.push(
                    <ProductionCard productionObj={productionItem} key={productionItem.slug} />
                )
            }

        }

        // Attach our "Add Production" GUI element.
        if (state === PRODUCTION_OPERATING_STATE) {
            elements.push(
                <div className="col-sm-4">
                    <div className="card box-shadow text-center mx-auto">
                        <div className="card-custom-top-2">
                            <i className="fas fa-plus fa-3x"></i>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">Add Production</h3>
                            <p className="card-text">Add a crop production to the systen.</p>
                            <Link to="/add-production-step-1" className="btn btn-success btn-lg">
                                Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="card-group row">
                {elements}
            </div>
        );
    }
}


class NoProductionJumbotron extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-bullhorn"></i>&nbsp;Attention
                        </h1>
                        <p className="lead">You currently do not have any crop productions running.</p>
                        <hr className="my-4" />
                        <p>If you would like to have a crop production running, start by clicking below.</p>
                        <p className="lead">
                            <Link className="btn btn-success btn-lg" to="/add-production-step-1">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}


class ProductionListComponent extends Component {
    render() {
        const { user, productionList, flashMessage } = this.props;
        const { devices } = this.props.dashboard;

        //-------------------------//
        // CASE 1 OF 2: NO DEVICES //
        //-------------------------//

        // Get how many devices we have and if we have no devices then we need to create
        const devicesCount = (devices !== undefined && devices !== null) ? devices.length : 0;
        const hasNoDevices = devicesCount <= 0;
        if (hasNoDevices) {
            // Return our `no devices` GUI.
            return (
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                               <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <i className="fas fa-industry"></i>&nbsp;Crop Production</li>
                        </ol>
                    </nav>

                    <h1>
                        <i className="fas fa-industry"></i>&nbsp;Crop Production
                    </h1>

                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-bullhorn"></i>&nbsp;Attention
                        </h1>
                        <p className="lead">Before you can create crop productions, you will need to <strong>add a device</strong>. Once add, you will be granted full-access to your crop productions.</p>
                        <hr className="my-4" />
                        <p>Click here to begin the device purchase</p>
                        <p className="lead">
                            <Link to="/devices/create/step-1" className="btn btn-success btn-lg">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </Link>
                        </p>
                    </div>
                </div>
            );
        }

        //--------------------------//
        // CASE 2 OF 2: HAS DEVICES //
        //--------------------------//

        // DEFENSIVE CODE: DO NOT LOAD VIEW UNTIL WE HAVE DATA FROM API ENDPOINT.
        if (isEmpty(productionList)) { return null; }

        let operatingElements = [];
        let terminatedElements = [];
        const isProductionListNotEmpty = isEmpty(productionList.results) === false;
        const isProductionListEmpty = isEmpty(productionList.results) === true;

        if (isProductionListNotEmpty) {
            const { results } = productionList;
            if (results !== undefined && results !== null) {
                operatingElements = <ProductionCards productionList={productionList} state={PRODUCTION_OPERATING_STATE} />;
            }
        }
        if (isProductionListNotEmpty) {
            const { results } = productionList;
            if (results !== undefined && results !== null) {
                terminatedElements = <ProductionCards productionList={productionList} state={PRODUCTION_TERMINATED_STATE} />;
            }
        }

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-industry"></i>&nbsp;Crop Production</li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1>
                    <i className="fas fa-industry"></i>&nbsp;Crop Production
                </h1>
                {isProductionListNotEmpty &&
                    <div>
                        <div>
                            <h3><i className="fas fa-check-circle"></i>&nbsp;Operating</h3>
                            {operatingElements}
                        </div>

                        <div>
                            <h3><i className="fas fa-times-circle"></i>&nbsp;Teriminated</h3>
                            {terminatedElements}
                        </div>
                    </div>
                }
                {isProductionListEmpty &&
                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-leaf"></i>&nbsp;Create a Crop Production
                        </h1>
                        <p className="lead">Crop productions are used to track the life-cycle of plants and fish you will be growing in your setup. Once create you are able to submit your quality inspections and have the system provide real-time evaluations about the growing conditions of your crop. Once you harvest your crop, be sure to log the data here as well.</p>
                        <hr className="my-4" />
                        <p>To begin, please start by clicking below.</p>
                        <p className="lead">
                            <Link to="/add-production-step-1" className="btn btn-primary btn-lg">
                                Begin&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </Link>
                        </p>
                    </div>
                }

            </div>
        );
    }
}

export default ProductionListComponent;
