import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../flashMessageComponent";

class InstrumentTable extends Component {
    render() {
        function get(dict, key) {
            if (dict === null || dict === undefined) {
                return null;
            }
            return dict.hasOwnProperty(key) ? dict[key] : null;
        }

        const { instrument } = this.props;

        if (instrument === undefined) {
            return null;
        }

        var lastMeasuredPrettyValue = get(instrument, "lastMeasuredPrettyValue");
        var lastMeasuredPrettyAt = get(instrument, "lastMeasuredPrettyAt");

        return (
            <div>
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
                                        {lastMeasuredPrettyValue}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Last measured time</th>
                                    <td>
                                        {lastMeasuredPrettyAt}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

class DeviceSummaryTable extends Component {
    render() {
        const { device } = this.props;
        return (
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
                                <td>{device.lastMeasuredPrettyValue}</td>
                            </tr>
                            <tr>
                                <th scope="row">Last measured time</th>
                                <td>{device.lastMeasuredPrettyAt}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

class DeviceComponent extends Component {
    render() {
        const { device, flashMessage } = this.props;
        console.log("flashMessage", flashMessage);
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

                <FlashMessageComponent object={flashMessage} />

                {device.slug &&
                    <Link to={`/device/${device.slug}/profile`}>Profile</Link>
                }
                <br />

                {device.humidity &&
                    <Link to={`/instrument/${device.humidity.slug}`}>Humidity Instrument</Link>
                }
                <br />

                {device.temperature &&
                    <Link to={`/instrument/${device.temperature.slug}`}>Temperature Instrument</Link>
                }
                <br />
                <br />

                <h2>Device Summary</h2>
                <DeviceSummaryTable device={device} />

                <br />

                <h2>Humidity</h2>
                <InstrumentTable instrument={device.humidity} />

                <br />

                <h2>Temperature</h2>
                <InstrumentTable instrument={device.temperature} />

            </div>
        );
    }
}

export default DeviceComponent;
