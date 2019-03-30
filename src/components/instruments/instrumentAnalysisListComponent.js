import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InstrumentReportTable extends Component {
    render() {
        let elements = [];
        const { results } = this.props.instrumentAnalysisList;
        if (results === undefined || results === null) { // Defensive code.
            return null;
        }
        const resultsLength = results.length;
        for (let i = 0; i < resultsLength; i++) {
            let row = results[i];
            console.log(row)
            elements.push(
                <tr key={row.slug}>
                    <th scope="row">{row.createdAt}</th>
                    <th scope="row">{row.startDt}</th>
                    <th scope="row">{row.finishDt}</th>
                    <th scope="row">
                        <Link to={row.absoluteUrl}>View</Link>
                    </th>
                </tr>
            );
        }
        return (
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Created</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {elements}
                </tbody>
            </table>
        )
    }
}


class InstrumentAnalysisListComponent extends Component {
    render() {
        const { instrument, instrumentAnalysisList } = this.props;
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
                        <li class="breadcrumb-item active" aria-current="page">Analyses</li>
                    </ol>
                </nav>
                <h1>Analyses</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <InstrumentReportTable instrumentAnalysisList={instrumentAnalysisList} />
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentAnalysisListComponent;
