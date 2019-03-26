import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";


class  InstrumentDownloadFormComponent extends Component {
    render() {
        const {
            instrument,
            onToDateTimeChange,
            onFromDateTimeChange,
            onSubmit,
            errors, isLoading, toDateTime, fromDateTime } = this.props;
        let startDate = new Date()
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                TO
                <form onSubmit={onSubmit}>
                    <DatePicker
                        selected={startDate}
                        onChange={onToDateTimeChange}
                    />
                </form>

                <br />
                <br />
                FROM
                <form onSubmit={onSubmit}>
                    <DatePicker
                        selected={startDate}
                        onChange={onFromDateTimeChange}
                    />
                </form>
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
            errors = {},
            isLoading,
            toDateTime,
            fromDateTime
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li class="breadcrumb-item">
                            {instrument.absoluteParentUrl &&
                                <Link to={`${instrument.absoluteParentUrl}`}>Device</Link>
                            }
                        </li>
                        {instrument.absoluteUrl &&
                            <li class="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}`}>Instrument</Link>
                            </li>
                        }
                        {instrument.absoluteUrl &&
                            <li class="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}/data`}>Data</Link>
                            </li>
                        }
                        <li class="breadcrumb-item active" aria-current="page">Download</li>
                    </ol>
                </nav>
                <h1>Download</h1>
                <hr />
                <InstrumentDownloadFormComponent
                    onToDateTimeChange={onToDateTimeChange}
                    onFromDateTimeChange={onFromDateTimeChange}
                    instrument={instrument}
                    onSubmit={onSubmit}
                    errors={errors}
                    isLoading={isLoading}
                />
            </div>
        );
    }
}

export default InstrumentDataDownloadComponent;
