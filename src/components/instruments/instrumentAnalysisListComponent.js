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
                    <th>{row.createdAt}</th>
                    <th>{row.startDt}</th>
                    <th>{row.finishDt}</th>
                    <th>
                        <Link to={row.absoluteUrl}>View&nbsp;<i className="fas fa-chevron-right"></i></Link>
                    </th>
                </tr>
            );
        }
        return (
            <div className="table-responsive">
                <table className="table table-striped">
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
            </div>
        )
    }
}


class InstrumentAnalysisListComponent extends Component {
    render() {
        const { instrument, instrumentAnalysisList } = this.props;
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
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-flask"></i>&nbsp;Analyses
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-flask"></i>&nbsp;Analyses</h1>

                <div className="buttons-card">
                    <section className="row text-center placeholders">
                        <div className="rounded-circle circle-200 bg-pink text-center">
                            <Link to={`${instrument.absoluteUrl}/create-analysis`} className="d-block link-ndecor" title="Generate Analysis">
                                <span className="r-circle"><i className="fas fa-lightbulb fa-3x"></i></span>
                            </Link>
                        </div>
                    </section>
                </div>

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
