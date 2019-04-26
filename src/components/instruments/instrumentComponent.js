import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';


class InstrumentTable extends Component {
    render() {
        const { instrument } = this.props;
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
                                    <td>
                                        {instrument.lastMeasuredValue && parseFloat(instrument.lastMeasuredValue).toFixed(2)}&nbsp;
                                        {instrument.lastMeasuredValue && instrument.unitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last measured time</th>
                                    <td>
                                        {instrument.lastMeasuredAt &&
                                            <Moment tz={instrument.timezone} format="YYYY/MM/DD hh:mm:ss a">
                                                {instrument.lastMeasuredAt}
                                            </Moment>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Minimum value</th>
                                    <td>
                                        {instrument.last24hMinValue && parseFloat(instrument.last24hMinValue).toFixed(2)}&nbsp;
                                        {instrument.last24hMinValue && instrument.unitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Minimum at</th>
                                    <td>
                                        {instrument.last24hMinTimestampAt &&
                                            <Moment tz={instrument.timezone} format="YYYY/MM/DD hh:mm:ss a">
                                                {instrument.last24hMinTimestampAt}
                                            </Moment>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Maximum value</th>
                                    <td>
                                        {instrument.last24hMaxValue && parseFloat(instrument.last24hMaxValue).toFixed(2)}&nbsp;
                                        {instrument.last24hMaxValue && instrument.unitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Maximum at</th>
                                    <td>
                                        {instrument.last24hMaxTimestampAt &&
                                            <Moment tz={instrument.timezone} format="YYYY/MM/DD hh:mm:ss a">
                                                {instrument.last24hMaxTimestampAt}
                                            </Moment>
                                        }
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row" className="bg-light">Mean value</th>
                                    <td>
                                        {instrument.last24hMeanValue && parseFloat(instrument.last24hMeanValue).toFixed(2)}&nbsp;
                                        {instrument.last24hMeanValue && instrument.unitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Median value</th>
                                    <td>
                                        {instrument.last24hMedianValue && parseFloat(instrument.last24hMedianValue).toFixed(2)}&nbsp;
                                        {instrument.last24hMedianValue && instrument.unitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Mode value</th>
                                    <td>
                                        {instrument.last24hModeValue && parseFloat(instrument.last24hModeValue).toFixed(2)}&nbsp;
                                        {instrument.last24hModeValue && instrument.unitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Mode values</th>
                                    <td>
                                        {instrument.last24hModeValues && instrument.last24hModeValues}&nbsp;
                                        {instrument.last24hModeValues && instrument.unitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Range value</th>
                                    <td>
                                        {instrument.last24hRangeValue && parseFloat(instrument.last24hRangeValue).toFixed(2)}&nbsp;
                                        {instrument.last24hRangeValue && instrument.unitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Standard deviation value</th>
                                    <td>
                                        {instrument.last24hStedvValue && parseFloat(instrument.last24hStedvValue).toFixed(2)}&nbsp;
                                        {instrument.last24hStedvValue && instrument.unitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Variance value</th>
                                    <td>
                                        {instrument.last24hVarianceValue && parseFloat(instrument.last24hVarianceValue).toFixed(2)}&nbsp;
                                        {instrument.last24hVarianceValue && instrument.unitOfMeasure}
                                    </td>
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
