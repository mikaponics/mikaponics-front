import React, { Component } from 'react';
import { Link } from "react-router-dom";


class  InstrumentDownloadFormComponent extends Component {
    render() {
        const { instrument, onChange, onSubmit, errors, isLoading } = this.props;
        return (
            <div>
                <form onSubmit={onSubmit}>
                </form>
            </div>
        )
    }
}


class InstrumentDataDownloadComponent extends Component {
    render() {
        const { instrument, onChange, onSubmit, errors = {}, isLoading } = this.props;
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
                    instrument={instrument}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    errors={errors}
                    isLoading={isLoading}
                />
            </div>
        );
    }
}

export default InstrumentDataDownloadComponent;
