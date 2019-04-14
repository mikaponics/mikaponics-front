import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../flashMessageComponent";


class InstrumentAnalysisDetailComponent extends Component {
    render() {
        const { instrument, detail, flashMessage=null } = this.props;
        console.log(detail.modeValues)
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
                                    <td>{detail.startDt}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Finish</th>
                                    <td>{detail.finishDt}</td>
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
                                    <td>{detail.minValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Minimum at</th>
                                    <td>{detail.minTimestamp}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Maximum value</th>
                                    <td>{detail.maxValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Maximum at</th>
                                    <td>{detail.maxTimestamp}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Mean value</th>
                                    <td>{detail.meanValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Median value</th>
                                    <td>{detail.medianValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Mode value</th>
                                    <td>{detail.modeValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Mode values</th>
                                    <td>{detail.modeValues}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Range value</th>
                                    <td>{detail.rangeValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Standard deviation value</th>
                                    <td>{detail.stedvValue}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Variance value</th>
                                    <td>{detail.varianceValue}</td>
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
                                    <td>{detail.createdAt}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last modified at</th>
                                    <td>{detail.lastModifiedAt}</td>
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
