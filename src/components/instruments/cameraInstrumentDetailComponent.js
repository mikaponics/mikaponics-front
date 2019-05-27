import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';

import { FlashMessageComponent } from "../flashMessageComponent";



class CameraInstrumentComponent extends Component {
    render() {
        const { instrument, flashMessage } = this.props;
        const { lastCameraSnapshot, absoluteParentUrl } = instrument;
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
                            {instrument.absoluteParentUrl &&
                                <Link to={`${instrument.absoluteParentUrl}`}><i className="fas fa-cube"></i>&nbsp;Device</Link>
                            }
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className={`fas fa-${instrument.icon}`}></i>&nbsp;Instrument
                        </li>
                    </ol>
                </nav>
                <h1><i className={`fas fa-${instrument.icon}`}></i>&nbsp;Instrument</h1>

                <div className="row">
                    <div className="col-md-12">
                        <FlashMessageComponent object={flashMessage} />
                    </div>
                </div>



                <div className="row">
                    <div className="col-md-12">
                        <img className="img-fluid" src={lastCameraSnapshot} alt={lastCameraSnapshot} />
                    </div>
                </div>

                <div className="form-group col-md-12 mb-3 mx-auto text-center">
                  <Link to={absoluteParentUrl} className="btn btn-primary btn-lg btn-fxw mt-4">
                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>

            </div>
        );
    }
}


export default CameraInstrumentComponent;
