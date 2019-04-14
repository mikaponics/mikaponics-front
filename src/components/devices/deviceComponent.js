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

        const { title, icon, instrument } = this.props;

        if (instrument === undefined) {
            return null;
        }

        var lastMeasuredPrettyValue = get(instrument, "lastMeasuredPrettyValue");
        var lastMeasuredPrettyAt = get(instrument, "lastMeasuredPrettyAt");

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light"><i className={icon}></i>&nbsp;{title}</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last measured value</th>
                                    <td>{lastMeasuredPrettyValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last measured time</th>
                                    <td>{lastMeasuredPrettyAt}</td>
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

                    <table className="table table-bordered custom-cell-w">
                        <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light"><i className="fas fa-cube"></i>&nbsp;Device Summary</th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Status</th>
                                <td>{device.state}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Last measured value</th>
                                <td>{device.lastMeasuredPrettyValue}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Last measured time</th>
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
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/devices"><i className="fas fa-cubes"></i>&nbsp;Devices</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-cube"></i>&nbsp;Device</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-cube"></i>&nbsp;Device</h1>

                <FlashMessageComponent object={flashMessage} />

                <div className="card-group row">
                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-info fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Profile</h3>
                                <p className="card-text">Set the name and various operating details about this device.</p>
                                {device.slug &&
                                    <Link to={`/device/${device.slug}/profile`} className="btn btn-success btn-lg">
                                        View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-tint fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Humidity</h3>
                                <p className="card-text">Set the name and various operating details about this device.</p>
                                {device.humidity &&
                                    <Link to={`/instrument/${device.humidity.slug}`} className="btn btn-success btn-lg">
                                        View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-thermometer-half fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Temperature</h3>
                                <p className="card-text">Set the name and various operating details about this device.</p>
                                {device.temperature &&
                                    <Link to={`/instrument/${device.temperature.slug}`} className="btn btn-success btn-lg">
                                        View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <h2><i className="fas fa-table"></i>&nbsp;Device Summary</h2>
                <DeviceSummaryTable device={device} />
                <InstrumentTable
                    title="Humidty"
                    icon="fas fa-tint"
                    instrument={device.humidity}
                />
                <InstrumentTable
                    title="Temperature"
                    icon="fas fa-thermometer-half"
                    instrument={device.temperature}
                />

            </div>
        );
    }
}

export default DeviceComponent;
