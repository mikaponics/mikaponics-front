import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class InstrumentDataChartComponent extends Component {
    render() {
        const { timeSeriesData } = this.props;
        let dataPoints = [];
        for (let i = 0; i < timeSeriesData.results.length; i++) {
            let timeSeriesDatum = timeSeriesData.results[i]
            dataPoints.push({
                x: new Date(timeSeriesDatum.timestamp),
                y: timeSeriesDatum.value}
            );
        }


        const options5 = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title:{
                text: "Humidity over Time"
            },
            axisY: {
                title: "Value",
                includeZero: false,
                suffix: "%"
            },
            axisX: {
                title: "Date/Time",
            },
            data: [{
                type: "line",
                showInLegend: true,
                xValueFormatString: "YYYY/MM/DD",
                yValueFormatString: "₹#,##0.##",
                toolTipContent: "Day/time {x}: Humidity {y}%",
                dataPoints: dataPoints
            }]
        }
        return(
            <CanvasJSChart options = {options5}
                /* onRef={ref => this.chart = ref} */
            />
        );
    }
}


class InstrumentDatumRowComponent extends Component {
    render() {
        const { value, timestamp } = this.props.rowData;
        const dt = new Date(timestamp);
        return (
            <tr key={timestamp}>
                <th scope="row">{value}</th>
                <td>{dt.toLocaleString()}</td>
            </tr>
        )
    }
}


class InstrumentDataTableComponent extends Component {
    render() {
        const { tableData } = this.props;
        if (tableData === undefined || tableData === null || tableData.results === null || tableData.results === undefined) {
            return null;
        }

        let tableRows = [];
        var arrayLength = tableData.results.length;
        for (var i = 0; i < arrayLength; i++) {
            let rowData =  tableData.results[i];
            tableRows.push(<InstrumentDatumRowComponent rowData={rowData} />);
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


class InstrumentDataComponent extends Component {
    render() {
        const { instrument, timeSeriesData } = this.props;
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
                    <div className="col-lg-12">
                        <div className="card-default card">
                            <div className="card-header">
                                Time-Series Data Chart
                            </div>
                            <div className="card-body">
                                <InstrumentDataChartComponent timeSeriesData={timeSeriesData} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2>Time-Series Data</h2>
                        <InstrumentDataTableComponent
                            tableData={timeSeriesData}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentDataComponent;
