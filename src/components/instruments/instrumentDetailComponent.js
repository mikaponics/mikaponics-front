import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';

import { FlashMessageComponent } from "../flashMessageComponent";


/**
 *  Utility component used to render the multiple mode values.
 */
class ModeValuesRow extends Component {
    render() {
        const { modeValues, unitOfMeasure } = this.props;
        let text = "";
        for (let i = 0; i < modeValues.length; i++) {
            let modeValue = modeValues[i];
            text += modeValue + " " + unitOfMeasure + ", ";
        }
        text = text.substring(0, text.length - 2);
        return text
    }
}


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
                                {instrument.last24hModeValue &&
                                    <tr>
                                        <th scope="row" className="bg-light">Mode value</th>
                                        <td>
                                            {parseFloat(instrument.last24hModeValue).toFixed(2)}&nbsp;
                                            {instrument.unitOfMeasure}
                                        </td>
                                    </tr>
                                }
                                {instrument.last24hModeValues &&
                                    <tr>
                                        <th scope="row" className="bg-light">Mode values</th>
                                        <td>
                                            <ModeValuesRow
                                                modeValues={instrument.last24hModeValues}
                                                unitOfMeasure={instrument.unitOfMeasure}
                                            />
                                        </td>
                                    </tr>
                                }
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
        const { instrument, flashMessage } = this.props;
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

                <div className="row">
                    <div className="col-md-12">
                        <FlashMessageComponent object={flashMessage} />
                    </div>
                </div>

                <section className="row text-center placeholders">
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                            <Link to={`/instrument/${instrument.slug}/alerts/config`} className="d-block link-ndecor" title="Configuration">
                                <span className="r-circle"><i className="fas fa-cogs fa-3x"></i></span>
                            </Link>
                        </div>
                        <h4>Configuration</h4>
                        <div className="text-muted">View your configuration</div>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                            <Link to={`/instrument/${instrument.slug}/data`} className="d-block link-ndecor" title="Data">
                                <span className="r-circle"><i className="fas fa-cloud fa-3x"></i></span>
                            </Link>
                        </div>
                        <h4>Data</h4>
                        <span className="text-muted">View your time-series data</span>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                            <Link to={`/instrument/${instrument.slug}/analyses`} className="d-block link-ndecor" title="Analyses">
                                <span className="r-circle"><i className="fas fa-flask fa-3x"></i></span>
                            </Link>
                        </div>
                        <h4>Analyses</h4>
                        <span className="text-muted">View your analysis reports</span>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                            <Link to={`/instrument/${instrument.slug}/alerts`} className="d-block link-ndecor" title="Alerts">
                                <span className="r-circle"><i className="fas fa-bell fa-3x"></i></span>
                            </Link>
                        </div>
                        <h4>Alerts</h4>
                        <span className="text-muted">View your alerts</span>
                    </div>
                </section>

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
