import React, { Component } from 'react';
import { Link } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
import 'moment-timezone';
import shortid from "shortid";

import { FlashMessageComponent } from "../../flashMessageComponent";
import { DEVICE_NEW_STATE } from "../../../constants/api";


export default class DeviceFullRetrieveComponent extends Component {
    render() {
        const { user, device } = this.props;
        const { instruments } = device;
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
                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Device
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/device/${device.slug}`}>
                                <span className="num"><i className="fas fa-columns"></i></span>
                                <span className="">Brief</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <span className="num"><i className="fas fa-table"></i>&nbsp;</span>
                            <span className="">Full</span>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-cube"></i>&nbsp;Device
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">UUID</th>
                                    <td><i>{device.uuid}</i></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{device.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{device.description}</td>
                                </tr>
                            </tbody>
                        </table>
                        {instruments.map(
                            (instrument, i) => <InstrumentTable instrument={instrument} user={user} key={i+shortid.generate()} />
                        )}

                        <div className="form-group">
                            <Link to="/devices" className="btn btn-lg float-left pl-4 pr-4 btn-secondary">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                            <Link to={`/device/${device.slug}/profile`} className="btn btn-lg float-right pl-4 pr-4 btn-primary">
                                <i className="fas fa-edit"></i>&nbsp;Edit
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

class InstrumentTable extends Component {
    render() {
        const id = shortid.generate();
        const { uuid, icon, name, slug, timezone, lastMeasuredPrettyAt, lastMeasuredValue } = this.props.instrument;
        return (
            <table className="table table-bordered custom-cell-w" key={id}>
                <tbody>
                    <tr className="bg-dark">
                        <th scope="row" colSpan="2" className="text-light">
                            <i className={`fas fa-${icon}`}></i>&nbsp;{name}
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">UUID</th>
                        <td><i>{uuid}</i></td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Last Measured At</th>
                        <td>
                            <Moment tz={timezone} format="YYYY/MM/DD hh:mm:ss a">
                                {lastMeasuredPrettyAt}
                            </Moment>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Last Measured Value</th>
                        <td>
                            {lastMeasuredValue}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Link</th>
                        <td>
                            <Link to={`/instrument/${slug}`} className="btn btn-primary btn-sm">
                                View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
