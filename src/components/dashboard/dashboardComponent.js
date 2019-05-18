import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import { Link } from "react-router-dom";


class DashboardProductionCropComponent extends Component {
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


class DashboardProductionComponent extends Component {
    render() {
        const { name, crops, absoluteUrl } = this.props.production;
        return (
            <div>
                <div className="row">
                    <div className="col-12">

                        <h4><i className="fas fa-leaf"></i>&nbsp;{name}</h4>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">Crops Evaluation</th>
                            </tr>
                            {crops.map(
                                (crop, i) => <DashboardProductionCropComponent crop={crop} key={i} />)
                            }
                            </tbody>
                        </table>
                        <Link to={absoluteUrl} className="btn btn-success btn-lg float-right">
                            View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}


class DashboardComponent extends Component {
    render() {
        const { productions } = this.props.dashboard;

        let isProductionsEmpty = isEmpty(productions) === true;
        let isNotProductionsEmpty = isEmpty(productions) === false;

        return (
            <div className="Dashboard">
                <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>

                <div className="row">
                    <div className="col-12">

                        <h2><i className="fas fa-th"></i>&nbsp;Menu</h2>
                        <div className="card-group row">

                            <div className="col-sm-4">
                                <div className="card box-shadow text-center mx-auto">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-industry fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">View Production</h3>
                                        <p className="card-text">List all the growing crops that being monitored.</p>
                                        <Link to="/productions" className="btn btn-success btn-lg">
                                            View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-4">
                                <div className="card box-shadow text-center mx-auto">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-cubes fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">View Devices</h3>
                                        <p className="card-text">List all the Mikaponics unit devices</p>
                                        <Link to="/devices" className="btn btn-success btn-lg">
                                            View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-4">
                                <div className="card box-shadow text-center mx-auto">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-bell fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Alerts</h3>
                                        <p className="card-text">View list of all the alerts in your setup.</p>
                                        <Link to="/alerts" className="btn btn-success btn-lg">
                                            View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <h2><i className="fas fa-industry"></i>&nbsp;Production List</h2>
                    </div>
                </div>
                {isNotProductionsEmpty &&
                    <div>{productions.map(
                        (production, i) => <DashboardProductionComponent production={production} key={i} />)
                    }</div>
                }
                {isProductionsEmpty &&
                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-bullhorn"></i>&nbsp;Attention
                        </h1>
                        <p className="lead">You currently do not have any crop productions running at the moment.</p>
                        <hr className="my-4" />
                        <p>If you would like to start running a crop production, please start by clicking below.</p>
                        <p className="lead">
                            <Link to="/add-production-step-1" className="btn btn-success btn-lg">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </Link>
                        </p>
                    </div>
                }

            </div>
        );
    }
}

export default DashboardComponent;
