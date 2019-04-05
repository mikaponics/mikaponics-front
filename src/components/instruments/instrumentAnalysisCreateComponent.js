import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker"

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";


class InstrumentAnalysisCreateComponent extends Component {
    render() {
        const {
            instrument,
            onToDateTimeChange,
            onFromDateTimeChange,
            onSubmit,
            isLoading,
            toDateObj,
            fromDateObj,
            errors=null,
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                            {instrument.absoluteParentUrl &&
                                <Link to={`${instrument.absoluteParentUrl}`}>Device</Link>
                            }
                        </li>
                        {instrument.absoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}`}>Instrument</Link>
                            </li>
                        }
                        {instrument.absoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}/analyses`}>Analyses</Link>
                            </li>
                        }
                        <li className="breadcrumb-item active" aria-current="page">Create Analysis</li>
                    </ol>
                </nav>
                <h1>Create Analysis</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        {errors &&
                            <BootstrapErrorsProcessingAlert errors={errors} />
                        }
                        FROM
                            <DatePicker
                                selected={fromDateObj}
                                onChange={onFromDateTimeChange}
                                showTimeInput
                                dateFormat="MM/dd/yyyy h:mm aa"
                                isClearable={true}
                                placeholderText="From date"
                                withPortal
                            />

                            TO
                                <DatePicker
                                    selected={toDateObj}
                                    onChange={onToDateTimeChange}
                                    showTimeInput
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    todayButton={"Today"}
                                    isClearable={true}
                                    placeholderText="To date"
                                    withPortal
                                />

                                <br />
                                <br />

                            <br />
                            <br />
                            <button onClick={onSubmit} disabled={isLoading}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentAnalysisCreateComponent;
