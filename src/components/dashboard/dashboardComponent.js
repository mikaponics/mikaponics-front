import React, { Component } from 'react';

import { Link } from "react-router-dom";


class DashboardComponent extends Component {
    render() {
        return (
            <div className="Dashboard">
                <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>
                <div className="card-group row">

                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-industry fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">View Crop Production</h3>
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

                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-shopping-cart fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Purchase Device</h3>
                                <p className="card-text">Purchase devices.</p>
                                <Link to="/purchase" className="btn btn-success btn-lg">
                                    View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default DashboardComponent;
