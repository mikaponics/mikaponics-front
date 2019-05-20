import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';


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
            elements.push(
                <tr key={row.slug}>
                    <th>
                        {row.createdAt &&
                            <Moment tz={row.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                {row.createdAt}
                            </Moment>
                        }
                    </th>
                    <th>
                        {row.startDt &&
                            <Moment tz={row.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                {row.startDt}
                            </Moment>
                        }
                    </th>
                    <th>
                        {row.finishDt &&
                            <Moment tz={row.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                {row.finishDt}
                            </Moment>
                        }
                    </th>
                    <th>
                        {row.absoluteUrl &&
                            <Link to={row.absoluteUrl}>View&nbsp;<i className="fas fa-chevron-right"></i></Link>
                        }
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


class NoAnalysesJumbotron extends Component {
    render() {
        const { instrument } = this.props;
        return (
            <div className="jumbotron">
                <h1 className="display-4">
                    <i className="fas fa-bullhorn"></i>&nbsp;Attention
                </h1>
                <p className="lead">You currently do not have any analyses generated.</p>
                <hr className="my-4" />
                <p>If you would like to generate an analysis then begin by clicking below.</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to={`${instrument.absoluteUrl}/create-analysis`}>
                        Create Analyis&nbsp;<i className="fas fa-arrow-circle-right"></i>
                    </Link>
                </p>
            </div>
        );
    }
}


class InstrumentAnalysisListComponent extends Component {
    render() {
        const { instrument, instrumentAnalysisList } = this.props;

        let elements;
        if (instrumentAnalysisList !== undefined && instrumentAnalysisList !== null) {
            const { results } = instrumentAnalysisList;
            if (results !== undefined && results !== null) {
                if (results.length === 0) {
                    elements = <NoAnalysesJumbotron instrument={instrument} />;
                } else {
                    elements = (
                        <InstrumentReportTable instrumentAnalysisList={instrumentAnalysisList} />
                    );
                }
            }            
        }

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
                                {instrument.absoluteUrl &&
                                    <Link to={`${instrument.absoluteUrl}`}>
                                        <i className={`fas fa-${instrument.icon}`}></i>&nbsp;Instrument
                                    </Link>
                                }
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
                            {instrument.absoluteUrl &&
                                <Link to={`${instrument.absoluteUrl}/create-analysis`} className="d-block link-ndecor" title="Generate Analysis">
                                    <span className="r-circle"><i className="fas fa-lightbulb fa-3x"></i></span>
                                </Link>
                            }
                        </div>
                    </section>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {elements}
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentAnalysisListComponent;
