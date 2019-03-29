import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InstrumentComponent extends Component {
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
                        <li class="breadcrumb-item active" aria-current="page">Instrument</li>
                    </ol>
                </nav>
                <h1>Instrument</h1>
                <hr />
                <p>TODO: IMPLEMENT</p>
                <div className="row">
                    <div className="col-md-12">
                        <Link to={`/instrument/${instrument.slug}/alerts`}>Alerts</Link>
                        <br />
                        <Link to={`/instrument/${instrument.slug}/report`}>Reports</Link>
                        <br />
                        <Link to={`/instrument/${instrument.slug}/data`}>Data</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentComponent;
