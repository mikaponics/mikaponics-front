import React, { Component } from 'react';
import { Link } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
import 'moment-timezone';

import { FlashMessageComponent } from "../flashMessageComponent";


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

                <section className="row text-center placeholders">
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                            <Link to={`/device/${device.slug}/profile`} className="d-block link-ndecor" title="Add Client">
                                <span className="r-circle"><i className="fas fa-pencil-alt fa-3x"></i></span>
                            </Link>
                        </div>
                        <h4>Profile</h4>
                        <div className="text-muted">View your device profile</div>
                    </div>
                </section>
                <DeviceInstrumentsTableComponent instruments={device.instruments} />
            </div>
        );
    }
}

export default DeviceComponent;
