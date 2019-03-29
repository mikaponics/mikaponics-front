import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InstrumentReportComponent extends Component {
    render() {
        const { instrument } = this.props;
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
                        <li class="breadcrumb-item active" aria-current="page">Report</li>
                    </ol>
                </nav>
                <h1>Report</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <p>TODO: IMPLEMENT</p>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentReportComponent;
