import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, CartesianGrid
} from 'recharts'
import moment from 'moment'
import Moment from 'react-moment';
import 'moment-timezone';


class InstrumentDataChartComponent extends Component {
    render() {
        const { user, instrument, tableData } = this.props;
        if (tableData === undefined || tableData === null || tableData.results === null || tableData.results === undefined) {
            return null;
        }

        let tableRows = [];
        if (tableData !== undefined && tableData !== null) {
            var arrayLength = tableData.results.length;
            for (var i = 0; i < arrayLength; i++) {
                let rowData =  tableData.results[i];
                tableRows.push({
                    key: rowData.timestamp,
                    value: rowData.value,
                    timestamp: rowData.timestamp
                });
            }
        }


        return (
            <div className="row">
                <div className="col-lg-12">
                <ResponsiveContainer width="100%" height={480}>
                    <LineChart width={640} height={480} data={tableRows} margin={{ top: 50, bottom: 75, left:30, right:50}}>
                        <XAxis
                            angle={-45}
                            textAnchor="end"
                            dataKey='timestamp'
                            tickFormatter={
                                timeStr => moment(timeStr).tz(user.timezone).format('h:mm a')
                            }
                            label={{
                                value: "Time",
                                dy: 75
                            }}
                        />
                        <YAxis unit={instrument.unitOfMeasure} dataKey='value'>
                            <Label
                                value={instrument.typeOf}
                                offset={-20}
                                angle={-90}
                                position='insideLeft'
                            />
                        </YAxis>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#001529"
                            activeDot={{r: 5}}
                            isAnimationActive={false}
                        />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                        <Tooltip
                            labelStyle={{ color: "black" }}
                            itemStyle={{ color: "grey" }}
                            formatter={function(value, name) {
                                return `${value}`;
                            }}
                            labelFormatter={function(value) {
                                const localValue = moment(value).tz(user.timezone).format('YYYY/MM/DD hh:mm:ss a');
                                return `timestamp: ${localValue}`;
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </div>
        );
    }
}



class InstrumentDatumRowComponent extends Component {
    render() {
        const { value, timestamp, } = this.props.rowData;
        const { timezone, unitOfMeasure } = this.props;
        return (
            <tr key={timestamp}>
                <th scope="row">{value}&nbsp;{unitOfMeasure}</th>
                <td>
                    <Moment tz={timezone} format="YYYY/MM/DD hh:mm:ss a">
                        {timestamp}
                    </Moment>
                </td>
            </tr>
        )
    }
}


class InstrumentDataTableComponent extends Component {
    render() {
        const { instrument, tableData } = this.props;
        if (tableData === undefined || tableData === null || tableData.results === null || tableData.results === undefined) {
            return null;
        }

        let tableRows = [];
        var arrayLength = tableData.results.length;
        for (var i = 0; i < arrayLength; i++) {
            let rowData =  tableData.results[i];
            tableRows.push(
                <InstrumentDatumRowComponent
                    rowData={rowData}
                    key={rowData.timestamp}
                    timezone={instrument.timezone}
                    unitOfMeasure={instrument.unitOfMeasure}
                />
            );
        }

        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Value</th>
                            <th scope="col">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        )
    }
}


class InstrumentDataTablePagination extends Component {
    render() {
        let nextButtonElement;
        let previousButtonElement;
        const { next, previous, page } = this.props.timeSeriesData;
        const { onPaginatorNextClick, onPaginatorPreviousClick, nextIsLoading, previousIsLoading } = this.props;

        if (next) {
            nextButtonElement = (
                <button
                    disabled={nextIsLoading}
                    className="btn btn-lg btn-success float-right"
                    onClick={onPaginatorNextClick}>
                        {nextIsLoading &&
                            <img src="/img/ajax-loading.gif" alt="Busy" height="32" width="32" />
                        }
                        Next&nbsp;<i className={'fas fa-arrow-right'}></i>
                </button>
            )
        }
        if (previous) {
            previousButtonElement = (
                <button
                    disabled={previousIsLoading}
                    className="btn btn-lg btn-success float-left"
                    onClick={onPaginatorPreviousClick}>
                        {previousIsLoading &&
                            <img src="/img/ajax-loading.gif" alt="Busy" height="32" width="32" />
                        }
                        <i className={'fas fa-arrow-left'}></i>&nbsp;Previous
                </button>
            )
        }

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm">
                            {previousButtonElement}
                        </div>
                        <div className="col-sm">
                            <p style={{textAlign: 'center'}}>Page: {page}</p>
                        </div>
                        <div className="col-sm">
                            {nextButtonElement}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class InstrumentDataComponent extends Component {
    render() {
        const {
            user, instrument, timeSeriesData, onPaginatorNextClick, onPaginatorPreviousClick,
            nextIsLoading, previousIsLoading
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/dashboard">
                               <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                            </Link>
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
                           <i className="fas fa-cloud"></i>&nbsp;Data
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-cloud"></i>&nbsp;Data</h1>

                <div className="buttons-card">
                    <section className="row text-center placeholders">
                        <div className="rounded-circle circle-200 bg-pink text-center">
                            <Link to={`/instrument/${instrument.slug}/data/download`} className="d-block link-ndecor" title="Add Client">
                                <span className="r-circle"><i className="fas fa-cloud-download-alt fa-3x"></i></span>
                            </Link>
                        </div>
                    </section>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2><i className="fas fa-heartbeat"></i>&nbsp;Chart</h2>
                        <InstrumentDataChartComponent
                            user={user}
                            instrument={instrument}
                            tableData={timeSeriesData}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2><i className="fas fa-th-list"></i>&nbsp;Table</h2>
                        <InstrumentDataTableComponent
                            instrument={instrument}
                            tableData={timeSeriesData}
                        />
                    </div>
                </div>
                {timeSeriesData &&
                    <InstrumentDataTablePagination
                        timeSeriesData={timeSeriesData}
                        onPaginatorNextClick={onPaginatorNextClick}
                        onPaginatorPreviousClick={onPaginatorPreviousClick}
                        nextIsLoading={nextIsLoading}
                        previousIsLoading={previousIsLoading}
                    />
                }
            </div>
        );
    }
}

export default InstrumentDataComponent;
