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
        const { productionList, flashMessage } = this.props;

        let operatingElements = [];
        let terminatedElements = [];
        const isProductionListNotEmpty = isEmpty(productionList) === false;

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
            </div>
        );
    }
}

export default ProductionListComponent;
