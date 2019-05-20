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
        const { productions, devices, activeAlertItemsCount, activeTaskItemsCount } = this.props.dashboard;

        const isProductionsEmpty = isEmpty(productions) === true;
        const isNotProductionsEmpty = isEmpty(productions) === false;
        const productionsCount = productions.length;
        const devicesCount = devices.length;

        return (
            <div className="Dashboard">
                <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>

                <section className="row text-center placeholders">
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                            <Link to="/productions" className="d-block link-ndecor" title="Production">
                                <h1 className="circle-title">{productionsCount}</h1>
                            </Link>
                        </div>
                        <h4>Production</h4>
                        <div className="text-muted">View your production list</div>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                            <Link to="/devices" className="d-block link-ndecor" title="Devices">
                                <h1 className="circle-title">{devicesCount}</h1>
                            </Link>
                        </div>
                        <h4>Devices</h4>
                        <span className="text-muted">View your devices</span>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                            <Link to="/alerts" className="d-block link-ndecor" title="Alerts">
                                <h1 className="circle-title">{activeAlertItemsCount}</h1>
                            </Link>
                        </div>
                        <h4>Alerts</h4>
                        <span className="text-muted">View your alertss</span>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                            <Link to="/tasks" className="d-block link-ndecor" title="Tasks">
                                <h1 className="circle-title">{activeTaskItemsCount}</h1>
                            </Link>
                        </div>
                        <h4>Tasks</h4>
                        <span className="text-muted">View your tasks</span>
                    </div>
                </section>

                <div className="row">
                    <div className="col-12">
                        <h2><i className="fas fa-industry"></i>&nbsp;Production List</h2>
                    </div>
                </div>
                {isNotProductionsEmpty &&
                    <div>
                        {productions.map(
                            (production, i) => <DashboardProductionComponent production={production} key={i} />)
                        }
                    </div>
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
