import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';


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
                        <h3 className="card-title">{productionObj.prettyTypeOf}</h3>
                        <p className="card-text">{productionObj.prettyGrowSystem}</p>
                        <Link to={productionObj.absoluteURL} className="btn btn-success btn-lg">
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
        const { productionList } = this.props;
        let elements = [];

        for (let i = 0; i < productionList.results.length; i++) {
            let productionItem = productionList.results[i];
            elements.push(
                <ProductionCard productionObj={productionItem} key={productionItem.slug} />
            )
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
                                <i className="fas fa-plus"></i>&nbsp;Add Production
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
        const { productionList } = this.props;

        let elements = [];
        if (productionList !== undefined && productionList !== null) {
            const { results } = productionList;
            if (results !== undefined && results !== null) {
                if (results.length === 0) {
                    elements = <NoProductionJumbotron />;
                } else {
                    elements = <ProductionCards productionList={productionList} />;
                }
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
                <h1>
                    <i className="fas fa-industry"></i>&nbsp;Crop Production
                    <Link to="/add-production-step-1" className="btn btn-success btn-lg float-right">
                        <i className="fas fa-plus"></i>&nbsp;Add
                    </Link>
                </h1>
                {elements}
            </div>
        );
    }
}

export default ProductionListComponent;
