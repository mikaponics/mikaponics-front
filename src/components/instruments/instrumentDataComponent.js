import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InstrumentDatumRow extends Component {
    render() {
        const { value, timestamp } = this.props.rowData;
        return (
            <tr key={timestamp}>
                <th scope="row">{value}</th>
                <td>{timestamp}</td>
            </tr>
        )
    }
}


class InstrumentDataTable extends Component {
    render() {
        const { tableData } = this.props;
        if (tableData === undefined || tableData === null || tableData.results === null || tableData.results === undefined) {
            return null;
        }

        let tableRows = [];
        var arrayLength = tableData.results.length;
        for (var i = 0; i < arrayLength; i++) {
            let rowData =  tableData.results[i];
            tableRows.push(<InstrumentDatumRow rowData={rowData} />);
        }

        return (
            <table class="table">
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
        )
    }
}


class InstrumentDataComponent extends Component {
    render() {
        const { instrument, timeSeriesData } = this.props;
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
                        <li class="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </nav>
                <h1>Data</h1>
                <hr />

                <InstrumentDataTable
                    tableData={timeSeriesData}
                />

                <br />
                <br />

                <Link to={`/instrument/${instrument.slug}/data/download`}>Download</Link>
                <br />
            </div>
        );
    }
}

export default InstrumentDataComponent;
