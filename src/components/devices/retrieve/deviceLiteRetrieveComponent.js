import React, { Component } from 'react';
import { Link } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
import 'moment-timezone';

import { FlashMessageComponent } from "../../flashMessageComponent";
import { DEVICE_NEW_STATE } from "../../../constants/api";


class DeviceInstrumentTableRowComponent extends Component {
    render() {
        const { instrument } = this.props;
        return (
            <tr>
                <td>
                    <i className={`fas fa-${instrument.icon}`}></i>
                </td>
                <td>
                    {instrument.name}
                </td>
                <td>
                    <Moment tz={instrument.timezone} format="YYYY/MM/DD hh:mm:ss a">
                        {instrument.lastMeasuredPrettyAt}
                    </Moment>
                </td>
                <td>
                    <Link to={`/instrument/${instrument.slug}`} className="btn btn-primary btn-sm">
                        View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                    </Link>
                </td>
            </tr>
        );
    }
}


class DeviceInstrumentsTableComponent extends Component {
    render() {
        const { instruments } = this.props;

        let isInstrumentsEmpty = isEmpty(instruments) === true;
        let isInstrumentsNotEmpty = isEmpty(instruments) === false;

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2><i className="fas fa-microchip"></i>&nbsp;Instruments</h2>
                    {isInstrumentsNotEmpty &&
                         <div className="table-responsive">

                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Last Modified</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {instruments.map(
                                    (instrument, i) => <DeviceInstrumentTableRowComponent instrument={instrument} key={i} />)
                                }
                                </tbody>
                            </table>
                        </div>
                    }
                    {isInstrumentsEmpty &&
                        <div className="jumbotron">
                            <h1 className="display-4">
                                <i className="fas fa-bullhorn"></i>&nbsp;Attention
                            </h1>
                            <p className="lead">You currently do not have any instruments setup for this device.</p>
                        </div>
                    }
                </div>
            </div>
        );
    }
}


class DeviceLiteRetrieveComponent extends Component {
    render() {
        const { device, flashMessage } = this.props;
        const { state } = device;
        const isDeviceInNewState = state === DEVICE_NEW_STATE;
        const isDeviceNotInNewState = state !== DEVICE_NEW_STATE;
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

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <span className="num"><i className="fas fa-columns"></i></span>
                            <span className="">Brief</span>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/device/${device.slug}/full`}>
                               <span className="num"><i className="fas fa-table"></i>&nbsp;</span>
                               <span className="">Full</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {isDeviceNotInNewState &&
                    <div>
                        <FlashMessageComponent object={flashMessage} />
                        <DeviceInstrumentsTableComponent instruments={device.instruments} />
                    </div>
                }
                {isDeviceInNewState &&
                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-shield-alt"></i>&nbsp;Activation Required
                        </h1>
                        <p className="lead">Please connect your device to the power and connect it to the internet. Once your device is connected, it will activate with our system and become available for usage.</p>
                    </div>
                }
                <div className="form-group">
                    <Link to="/devices" className="btn btn-lg float-left pl-4 pr-4 btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>
            </div>
        );
    }
}

export default DeviceLiteRetrieveComponent;
