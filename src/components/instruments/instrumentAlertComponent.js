import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InstrumentAlertComponent extends Component {
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
                        <li class="breadcrumb-item active" aria-current="page">Alerts</li>
                    </ol>
                </nav>
                <h1>Alerts</h1>
                <hr />
                <p>TODO: IMPLEMENT</p>
                <Link to={`/instrument/${instrument.slug}/alerts/config`}>Configuration</Link>
            </div>
        );
    }
}

export default InstrumentAlertComponent;
