import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextFieldGroup from './textFieldGroup';


class DashboardComponent extends Component {
    render() {
        const { onLogoutClick } = this.props;
        return (
            <div className="Dashboard">
                <h1>Dashboard</h1>
                <hr />

                <h2>Devices</h2>
                <button type="button" class="btn btn-success btn-sm">Purchase Device</button>

                <hr />
                <div className="row">
                    <div className="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Device Name</h5>
                                <p class="card-text">Device description</p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Status:</strong> Offline</li>
                                <li class="list-group-item"><strong>Last Updated at:</strong> 03/03/2019 10:52 PM</li>
                            </ul>
                            <div class="card-body">
                                <button type="button" class="btn btn-primary btn-sm">View</button>
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
