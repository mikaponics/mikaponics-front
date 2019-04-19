import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InstrumentTable extends Component {
    render() {
        const { instrument } = this.props;
        const lastMeasuredAtDT = new Date(instrument.lastMeasuredAt);
        const last24hMinTimestampAtDT = new Date(instrument.last24hMinTimestampAt);
        const last24hMaxTimestampAtDT = new Date(instrument.last24hMaxTimestampAt);
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Last 24 Hours</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last measured value</th>
                                    <td>{instrument.lastMeasuredValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last measured time</th>
                                    <td>{lastMeasuredAtDT.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Minimum value</th>
                                    <td>{instrument.last24hMinValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Minimum value</th>
                                    <td>{last24hMinTimestampAtDT.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Maximum value</th>
                                    <td>{instrument.last24hMaxValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Maximum value</th>
                                    <td>{last24hMaxTimestampAtDT.toLocaleString()}</td>
                                </tr>

                                <tr>
                                    <th scope="row" className="bg-light">Mean value</th>
                                    <td>{instrument.last24hMeanValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Median value</th>
                                    <td>{instrument.last24hMedianValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Mode value</th>
                                    <td>{instrument.last24hModeValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Mode values</th>
                                    <td>{instrument.last24hModeValues}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Range value</th>
                                    <td>{instrument.last24hRangeValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Standard deviation value</th>
                                    <td>{instrument.last24hStedvValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Variance value</th>
                                    <td>{instrument.last24hVarianceValue}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


class InstrumentComponent extends Component {
    render() {
        const { instrument } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/devices"><i className="fas fa-cubes"></i>&nbsp;Devices</Link>
                        </li>
                        <li className="breadcrumb-item">
                            {instrument.absoluteParentUrl &&
                                <Link to={`${instrument.absoluteParentUrl}`}><i className="fas fa-cube"></i>&nbsp;Device</Link>
                            }
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className={`fas fa-${instrument.icon}`}></i>&nbsp;Instrument
                        </li>
                    </ol>
                </nav>
                <h1><i className={`fas fa-${instrument.icon}`}></i>&nbsp;Instrument</h1>
                <div className="card-group row">

                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-bell fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Alerts</h3>
                                <p className="card-text">View all the alerts generated by this instrument.</p>
                                <Link to={`/instrument/${instrument.slug}/alerts`}className="btn btn-success btn-lg">
                                    View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-flask fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Analyses</h3>
                                <p className="card-text">Run analysis reports on this instrument.</p>
                                <Link to={`/instrument/${instrument.slug}/analyses`}className="btn btn-success btn-lg">
                                    View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-cloud fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Data</h3>
                                <p className="card-text">List all the time series data and download it to CSVs.</p>
                                <Link to={`/instrument/${instrument.slug}/data`}className="btn btn-success btn-lg">
                                    View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2><i className="fas fa-star"></i>&nbsp;Latest Statistics</h2>
                        <InstrumentTable
                            instrument={instrument}
                        />

                    </div>
                </div>

            </div>
        );
    }
}


export default InstrumentComponent;
