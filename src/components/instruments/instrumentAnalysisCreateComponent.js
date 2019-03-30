import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InstrumentAnalysisCreateComponent extends Component {
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
                        <p>Start Date: </p>
                        <p>Finish Date:</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentAnalysisCreateComponent;
