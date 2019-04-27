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
        if (modeValues === undefined || modeValues === null) { // Defensive Code.
            return null;
        }
        let text = "";
        for (let i = 0; i < modeValues.length; i++) {
            let modeValue = modeValues[i];
            text += modeValue + " " + unitOfMeasure + ", ";
        }
        text = text.substring(0, text.length - 2);
        return text
    }
}


class InstrumentAnalysisDetailComponent extends Component {
    render() {
        const { instrument, detail, flashMessage=null } = this.props;
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
                                <Link to={`${instrument.absoluteParentUrl}`}>
                                    <i className="fas fa-cube"></i>&nbsp;Device
                                </Link>
                            }
                        </li>
                        {instrument.absoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}`}>
                                    <i className={`fas fa-${instrument.icon}`}></i>&nbsp;Instrument
                                </Link>
                            </li>
                        }
                        {instrument.absoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}/analyses`}>
                                    <i className="fas fa-flask"></i>&nbsp;Analyses
                                </Link>
                            </li>
                        }
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-clipboard"></i>&nbsp;Analysis
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-clipboard"></i>&nbsp;Analysis</h1>
                <div className="row">
                    <div className="col-md-12">
                        <FlashMessageComponent object={flashMessage} />
                        <p><strong>The following table is the results from the analysis ran by the user.</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Time Range</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Start</th>
                                    <td>
                                        {detail &&
                                            <Moment tz={detail.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                                {detail.startDt}
                                            </Moment>
                                        }
                                </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Finish</th>
                                    <td>
                                        {detail &&
                                            <Moment tz={detail.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                                {detail.finishDt}
                                            </Moment>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Statistics</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Minimum value</th>
                                    <td>
                                        {detail && parseFloat(detail.minValue).toFixed(2)}&nbsp;
                                        {detail.instrumentUnitOfMeasure && detail.instrumentUnitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Minimum at</th>
                                    <td>
                                        {detail &&
                                            <Moment tz={detail.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                                {detail.minTimestamp}
                                            </Moment>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Maximum value</th>
                                    <td>
                                        {detail && parseFloat(detail.maxValue).toFixed(2)}&nbsp;
                                        {detail.instrumentUnitOfMeasure && detail.instrumentUnitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Maximum at</th>
                                    <td>
                                        {detail &&
                                            <Moment tz={detail.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                                {detail.maxTimestamp}
                                            </Moment>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Mean value</th>
                                    <td>
                                        {detail && parseFloat(detail.meanValue).toFixed(2)}
                                        {detail.instrumentUnitOfMeasure && detail.instrumentUnitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Median value</th>
                                    <td>
                                        {detail && parseFloat(detail.medianValue).toFixed(2)}
                                        {detail.instrumentUnitOfMeasure && detail.instrumentUnitOfMeasure}
                                    </td>
                                </tr>
                                {detail && detail.modeValue &&
                                    <tr>
                                        <th scope="row" className="bg-light">Mode value</th>
                                        <td>
                                            {parseFloat(detail.modeValue).toFixed(2)}
                                            {detail.instrumentUnitOfMeasure && detail.instrumentUnitOfMeasure}
                                        </td>
                                    </tr>
                                }
                                {detail && detail.modeValues &&
                                    <tr>
                                        <th scope="row" className="bg-light">Mode values</th>
                                        <td>
                                            <ModeValuesRow
                                                modeValues={detail.modeValues}
                                                unitOfMeasure={detail.instrumentUnitOfMeasure}
                                            />
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Range value</th>
                                    <td>
                                        {detail && parseFloat(detail.rangeValue).toFixed(2)}
                                        {detail.instrumentUnitOfMeasure && detail.instrumentUnitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Standard deviation value</th>
                                    <td>
                                        {detail && parseFloat(detail.stedvValue).toFixed(2)}
                                        {detail.instrumentUnitOfMeasure && detail.instrumentUnitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Variance value</th>
                                    <td>
                                        {detail && parseFloat(detail.varianceValue).toFixed(2)}
                                        {detail.instrumentUnitOfMeasure && detail.instrumentUnitOfMeasure}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">System Information</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created at</th>
                                    <td>
                                        {detail &&
                                            <Moment tz={detail.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                                {detail.createdAt}
                                            </Moment>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last modified at</th>
                                    <td>
                                        {detail &&
                                            <Moment tz={detail.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                                {detail.lastModifiedAt}
                                            </Moment>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentAnalysisDetailComponent;
