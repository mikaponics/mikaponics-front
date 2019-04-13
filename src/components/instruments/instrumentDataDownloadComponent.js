import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";


class  InstrumentDownloadFormComponent extends Component {
    render() {
        const {
            onToDateTimeChange,
            onFromDateTimeChange,
            onSubmit,
            isLoading,
            toDateObj,
            fromDateObj
        } = this.props;
        return (
            <div>
                TO
                    <DatePicker
                        selected={toDateObj}
                        onChange={onToDateTimeChange}
                    />

                    <br />
                    <br />

                FROM
                    <DatePicker
                        selected={fromDateObj}
                        onChange={onFromDateTimeChange}
                    />

                    <br />
                    <br />
                    <button onClick={onSubmit} disabled={isLoading} class="btn btn-success">Submit</button>

            </div>
        )
    }
}


class InstrumentDataDownloadComponent extends Component {
    render() {
        const {
            instrument,
            onToDateTimeChange,
            onFromDateTimeChange,
            onSubmit,
            isLoading,
            toDateObj,
            fromDateObj
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/dashboard">
                               <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/devices"><i className="fas fa-cubes"></i>&nbsp;Devices</Link>
                        </li>
                        <li className="breadcrumb-item">
                            {instrument.absoluteParentUrl &&
                                <Link to={`${instrument.absoluteParentUrl}`}>
                                    <i className="fas fa-cube"></i>&nbsp;Device
                                </Link>
                            }
                        </li>
                        {instrument.absoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}`}>
                                    <i className={`fas fa-${instrument.icon}`}></i>&nbsp;Instrument
                                </Link>
                            </li>
                        }
                        <li className="breadcrumb-item">
                            <Link to={`${instrument.absoluteUrl}/data`}>
                                <i className="fas fa-cloud"></i>&nbsp;Data
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-cloud-download-alt"></i>&nbsp;Download
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-cloud-download-alt"></i>&nbsp;Download</h1>
                <div className="row">
                    <div className="col-md-12">
                    <InstrumentDownloadFormComponent
                        toDateObj={toDateObj}
                        fromDateObj={fromDateObj}
                        onToDateTimeChange={onToDateTimeChange}
                        onFromDateTimeChange={onFromDateTimeChange}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                    />
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentDataDownloadComponent;
