import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InstrumentAlertTable extends Component {
    render() {
        let elements = [];
        const { results } = this.props.dataList;
        const dataLength = results.length;
        for (let i = 0; i < dataLength; i++) {
            let datum = results[i];
            console.log(datum)
            elements.push(
                <tr>
                    <th scope="row">{datum.state}</th>
                    <td>{datum.datumValue}</td>
                    <td>{datum.datumTimestamp}</td>
                </tr>
            );
        }
        return (
            <table class="table">
                <thead>
                    <tr>
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


class InstrumentAlertComponent extends Component {
    render() {
        const { instrument, dataList } = this.props;
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
                        <li class="breadcrumb-item active" aria-current="page">Alerts</li>
                    </ol>
                </nav>
                <h1>Alerts</h1>
                <br />
                <Link to={`/instrument/${instrument.slug}/alerts/config`}>Configuration</Link>
                <br />
                <br />
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <InstrumentAlertTable dataList={dataList} />
                    </div>
                </div>
            </div>
        );
    }
}

export default InstrumentAlertComponent;
