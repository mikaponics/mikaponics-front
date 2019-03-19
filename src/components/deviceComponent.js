import React, { Component } from 'react';
import { Link } from "react-router-dom";


class DeviceComponent extends Component {
    render() {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Device</li>
                    </ol>
                </nav>
                <h1>Device</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                    </div>
                </div>
            </div>
        );
    }
}

export default DeviceComponent;
