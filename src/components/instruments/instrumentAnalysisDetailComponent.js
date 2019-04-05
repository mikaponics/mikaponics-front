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
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                            {instrument.absoluteParentUrl &&
                                <Link to={`${instrument.absoluteParentUrl}`}>Device</Link>
                            }
                        </li>
                        {instrument.absoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}`}>Instrument</Link>
                            </li>
                        }
                        {instrument.absoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}/analyses`}>Analyses</Link>
                            </li>
                        }
                        <li className="breadcrumb-item active" aria-current="page">Analysis</li>
                    </ol>
                </nav>
                <h1>Analysis</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <FlashMessageComponent object={flashMessage} />
                        <p>Start Date: {detail.startDt}</p>
                        <p>Finish Date: {detail.finishDt}</p>
                        <p>Minimum value: {detail.minValue}</p>
                        <p>Minimum timestamp: {detail.minTimestamp}</p>
                        <p>Maximum value: {detail.maxValue}</p>
                        <p>Maximum timestamp: {detail.maxTimestamp}</p>
                        <p>Mean value: {detail.meanValue}</p>
                        <p>Mean value: {detail.medianValue}</p>
                        <p>Mode value: {detail.modeValue}</p>
                        <p>Mode values: </p>
                        <p>Range value: {detail.rangeValue}</p>
                        <p>Standard deviation value: {detail.stedvValue}</p>
                        <p>Variance value: {detail.varianceValue}</p>
                        <p>Created at: {detail.createdAt}</p>
                        <p>Last modified at: {detail.lastModifiedAt}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentAnalysisDetailComponent;
