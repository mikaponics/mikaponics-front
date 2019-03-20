import React, { Component } from 'react';

import { Link } from "react-router-dom";


const DashboardDeviceCard = ({ device }) => (
    <div className="col-md-4">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{device.name}</h5>
                <p className="card-text">{device.description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Status:</strong> {device.state}</li>
                <li className="list-group-item"><strong>Last Updated at:</strong> {device.lastMeasuredTimestamp}</li>
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
                <h1>Dashboard</h1>
                <hr />

                <div className="row">
                    <div className="col-md-12">
                        <h2>Devices</h2>
                        <Link className="btn btn-success btn-sm" role="button" to="/device/purchase">Purchase Device</Link>
                        <hr />
                    </div>
                    {deviceCards}
                </div>

                <br />
                <div className="row">
                    <div className="col-md-12">
                        <h2>Alerts</h2>
                        <hr />
                    </div>
                </div>

                <br />
                <button onClick={onLogoutClick}>Logout</button>
            </div>
        );
    }
}

export default DashboardComponent;
