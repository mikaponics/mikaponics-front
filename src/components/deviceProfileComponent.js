import React, { Component } from 'react';
import { Link } from "react-router-dom";


class DeviceProfileComponent extends Component {
    render() {
        const { device } = this.props;
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
                <h1>Device Profile</h1>
                <hr />


            </div>
        );
    }
}

export default DeviceProfileComponent;
