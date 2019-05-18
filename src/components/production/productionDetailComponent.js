import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { FlashMessageComponent } from "../flashMessageComponent";


class ProductionCropRowComponent extends Component {
    render() {
        const { prettyName, prettyScore } = this.props.crop;
        return (
            <tr>
                <th scope="row" className="bg-light">{prettyName}</th>
                <td>{prettyScore}</td>
            </tr>
        );
    }
}

class ProductionTableComponent extends Component {
    render() {
        const { name, crops, absoluteUrl } = this.props.production;
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2><i className="fas fa-th-list"></i>&nbsp;Table</h2>
                    <table className="table table-bordered custom-cell-w">
                        <tbody>
                        <tr className="bg-dark">
                            <th scope="row" colSpan="2" className="text-light">Crops Evaluation</th>
                        </tr>
                        {crops.map(
                            (crop, i) => <ProductionCropRowComponent crop={crop} key={i} />)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


class ProductionDetailComponent extends Component {
    render() {
        const { productionDetail, flashMessage } = this.props;
        const isLocked = productionDetail.state === 4;
        const isNotProductionCropsEmpty = isEmpty(productionDetail.crops) === false;
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
                            <i className="fas fa-leaf"></i>&nbsp;{productionDetail.name}
                        </li>
                    </ol>
                </nav>
                <h1>
                    <i className="fas fa-leaf"></i>&nbsp;{productionDetail.name}
                </h1>

                <FlashMessageComponent object={flashMessage} />

                <section className="row text-center placeholders">
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                            <Link to={`/production/${productionDetail.slug}/profile`} className={classnames('d-block link-ndecor', { 'disabled': isLocked })} title="Information">
                                <span className="r-circle"><i className="fas fa-info fa-3x"></i></span>
                            </Link>
                        </div>
                        <h4>Profile</h4>
                        <div className="text-muted">View your production profile</div>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                            <Link to={`/production/${productionDetail.slug}/inspection`} className={classnames('d-block link-ndecor', { 'disabled': isLocked })} title="Inspection">
                                <span className="r-circle"><i className="fas fa-eye fa-3x"></i></span>
                            </Link>
                        </div>
                        <h4>Inspections</h4>
                        <span className="text-muted">View your inspections</span>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                            <Link to={`/production/${productionDetail.slug}/terminate-start`} className={classnames('d-block link-ndecor', { 'disabled': isLocked })} title="Harvest">
                                <span className="r-circle"><i className="fas fa-shopping-basket fa-3x"></i></span>
                            </Link>
                        </div>
                        <h4>Harvest</h4>
                        <span className="text-muted">Terminate your production</span>
                    </div>
                    { /*
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                            <Link to="#" className="d-block link-ndecor" title="Tasks">
                                <h1 className="circle-title">12</h1>
                            </Link>
                        </div>
                        <h4>Tasks</h4>
                        <span className="text-muted">View your tasks</span>
                    </div>
                    */}
                </section>

                <ProductionTableComponent production={productionDetail} />

            </div>
        );
    }
}

export default ProductionDetailComponent;
