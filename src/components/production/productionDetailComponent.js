import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import classnames from 'classnames';

import { FlashMessageComponent } from "../flashMessageComponent";


class ProductionSummaryTable extends Component {
    render() {
        const { absoluteUrl, crops, slug } = this.props.object;
        return (

            <div className="row">
                <div className="col-md-12">

                    <table className="table table-bordered custom-cell-w">
                        <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">test</th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Last measured value</th>
                                <td>test</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Last measured time</th>
                                <td>
                                    test
                                </td>
                            </tr>
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

                <div className="card-group row">
                    <div className="col-sm-4" key="inspections">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-info fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Profile</h3>
                                <p className="card-text">View details pertaining to this production.</p>
                                <Link to={`/production/${productionDetail.slug}/profile`} className={classnames('btn btn-success btn-lg', { 'disabled': isLocked })}>
                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4" key="inspections">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-eye fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Inspection</h3>
                                <p className="card-text">View and add inspections to this production.</p>
                                <Link to={`/production/${productionDetail.slug}/inspection`} className={classnames('btn btn-success btn-lg', { 'disabled': isLocked })}>
                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4" key="inspections">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-shopping-basket fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Harvest</h3>
                                <p className="card-text">Close this production by marking it harvested or termianted.</p>
                                <Link to={`/production/${productionDetail.slug}/terminate-start`} className={classnames('btn btn-success btn-lg', { 'disabled': isLocked })}>
                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default ProductionDetailComponent;
