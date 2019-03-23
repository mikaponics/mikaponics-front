import React, { Component } from 'react';
import { Link } from "react-router-dom";


class DeviceComponent extends Component {
    render() {
        const { device } = this.props;
        console.log("--------->", device);
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

                <h2>Device Summary</h2>
                <div className="row">
                    <div className="col-md-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Status</th>
                                    <td>{device.state}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last measured value</th>
                                    <td>{device.lastMeasuredValue} {device.lastMeasuredUnitOfMeasure}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last measured time</th>
                                    <td>{device.lastMeasuredTimestamp}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last measured by</th>
                                    <td>{device.lastMeasuredInstrumentTypeOf}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <h2>Humidity</h2>
                <div className="row">
                    <div className="col-md-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Last measured value</th>
                                    <td>
                                        {device.humidity.lastMeasuredValue} {device.humidity.unitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Last measured time</th>
                                    <td>{device.humidity.lastMeasuredTimestamp}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

export default DeviceComponent;
