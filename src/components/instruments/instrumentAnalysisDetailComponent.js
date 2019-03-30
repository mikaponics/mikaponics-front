import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InstrumentAnalysisDetailComponent extends Component {
    render() {
        const { instrument, instrumentAnalysisDetail } = this.props;
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
                        <li class="breadcrumb-item active" aria-current="page">Analysis</li>
                    </ol>
                </nav>
                <h1>Analysis</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">

                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentAnalysisDetailComponent;
