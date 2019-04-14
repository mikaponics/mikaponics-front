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
                    <td>
                        <Link to={datum.absoluteUrl}>View&nbsp;<i className="fas fa-external-link-alt"></i></Link>
                    </td>
                </tr>
            );
        }
        return (
            <div className="table-responsive">
                <h3>List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Device</th>
                            <th scope="col">Instrument</th>
                            <th scope="col">State</th>
                            <th scope="col">Measured value</th>
                            <th scope="col">Measured at</th>
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


class AlertListComponent extends Component {
    render() {
        const { instrumentAlertList } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-bell"></i>&nbsp;Alerts</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-bell"></i>&nbsp;Alerts</h1>
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
