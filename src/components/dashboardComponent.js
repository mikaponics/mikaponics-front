import React, { Component } from 'react';

import { Link } from "react-router-dom";


const DashboardDeviceCard = ({ device }) => (
    <div className="col-md-4" key={ device.id }>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{device.name}</h5>
                <p className="card-text">{device.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Status:</strong> {device.state}</li>
                <li className="list-group-item"><strong>Last updated at:</strong> {device.lastMeasuredPrettyAt}</li>
                <li className="list-group-item"><strong>Last measured:</strong> {device.lastMeasuredPrettyValue}</li>
            </ul>
            <div className="card-body">
                <a className="btn btn-primary btn-sm" role="button" href={device.absoluteUrl}>View</a>
            </div>
          </div>
    </div>
);


class DashboardComponent extends Component {
    render() {
        const { dashboard, onLogoutClick } = this.props;

        // The following code block will iterate through all the devices
        // received from the API web-service (if received) and create all
        // our cards.
        let deviceCards = [];
        if (dashboard.devices) {
            dashboard.devices.forEach(function (device, index) {
                deviceCards.push(<DashboardDeviceCard device={device} />);
            });
        }

        return (
            <div className="Dashboard">
                <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>
                <hr />

                <div className="card-group row">
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
                                <p className="card-text">Add a Residential Client</p>
                                <Link to="#" className="btn btn-success btn-lg">
                                    View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

                <br />
                <button onClick={onLogoutClick}>Logout</button>
            </div>
        );
    }
}

export default DashboardComponent;
