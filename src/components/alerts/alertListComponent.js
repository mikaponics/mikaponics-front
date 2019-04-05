import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InstrumentAlertTable extends Component {
    render() {
        let elements = [];
        const { results } = this.props.dataList;
        if (results === undefined || results === null) { // Defensive code.
            return null;
        }
        const dataLength = results.length;
        for (let i = 0; i < dataLength; i++) {
            let datum = results[i];
            console.log(datum)
            elements.push(
                <tr>
                    <th scope="row">{datum.deviceName}</th>
                    <th>{datum.instrumentType}</th>
                    <th>{datum.state}</th>
                    <td>{datum.datumValue}</td>
                    <td>{datum.datumTimestamp}</td>
                </tr>
            );
        }
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Device</th>
                        <th scope="col">Instrument</th>
                        <th scope="col">State</th>
                        <th scope="col">Measured value</th>
                        <th scope="col">Measured at</th>
                    </tr>
                </thead>
                <tbody>
                    {elements}
                </tbody>
            </table>
        )
    }
}


class AlertListComponent extends Component {
    render() {
        const { instrumentAlertList } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Alerts</li>
                    </ol>
                </nav>
                <h1>Alerts</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <InstrumentAlertTable dataList={instrumentAlertList} />
                    </div>
                </div>
            </div>
        );
    }
}

export default AlertListComponent;
