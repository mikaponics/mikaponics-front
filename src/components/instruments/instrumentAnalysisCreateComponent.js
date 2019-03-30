import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker"


class InstrumentAnalysisCreateComponent extends Component {
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
                                <Link to={`${instrument.absoluteUrl}/analyses`}>Analyses</Link>
                            </li>
                        }
                        <li class="breadcrumb-item active" aria-current="page">Create Analysis</li>
                    </ol>
                </nav>
                <h1>Create Analysis</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
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
                            <button onClick={onSubmit} disabled={isLoading}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentAnalysisCreateComponent;
