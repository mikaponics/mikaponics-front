import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';


class InstrumentAlertDetailComponent extends Component {
    render() {
        const { alertDetail } = this.props;
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
                        <li className="breadcrumb-item">
                            {alertDetail.deviceAbsoluteUrl &&
                                <Link to={`${alertDetail.deviceAbsoluteUrl}`}><i className="fas fa-cube"></i>&nbsp;Device</Link>
                            }
                        </li>
                        {alertDetail.instrumentAbsoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${alertDetail.instrumentAbsoluteUrl}`}>
                                    <i className={`fas fa-${alertDetail.instrumentIcon}`}></i>&nbsp;Instrument
                                </Link>
                            </li>
                        }
                        {alertDetail.instrumentAbsoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${alertDetail.instrumentAbsoluteUrl}/alerts`}>
                                    <i className="fas fa-bell"></i>&nbsp;Alerts
                                </Link>
                            </li>
                        }
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-bell"></i>&nbsp;Alert
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-bell"></i>&nbsp;Alert</h1>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light"><i className="fas fa-bell"></i>&nbsp;Alert Details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Device</th>
                                    <td>
                                        {alertDetail.deviceAbsoluteUrl &&
                                            <Link to={alertDetail.deviceAbsoluteUrl} target="_blank">
                                                {alertDetail.deviceName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        }

                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Instrument</th>
                                    <td>
                                    {alertDetail.instrumentAbsoluteUrl &&
                                        <Link to={alertDetail.instrumentAbsoluteUrl} target="_blank">
                                            {alertDetail.instrumentType}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Value</th>
                                    <td>
                                        {alertDetail.datumValue && parseFloat(alertDetail.datumValue).toFixed(2)}&nbsp;
                                        {alertDetail.instrumentUnitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Timestamp</th>
                                    <td>
                                        <Moment tz={alertDetail.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                            {alertDetail.datumTimestamp}
                                        </Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Status</th>
                                    <td>{alertDetail.state}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentAlertDetailComponent;
