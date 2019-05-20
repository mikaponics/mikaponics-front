import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import classnames from 'classnames';
import 'moment-timezone';

import { FlashMessageComponent } from "../../flashMessageComponent";
import { ALERT_ITEM_UNREAD_STATE } from "../../../constants/api";


class AlertItemTable extends Component {
    render() {
        let elements = [];
        const { results } = this.props.dataList;
        if (results === undefined || results === null) { // Defensive code.
            return null;
        }
        const dataLength = results.length;
        for (let i = 0; i < dataLength; i++) {
            let alertItem = results[i];
            let isUnread = ALERT_ITEM_UNREAD_STATE === alertItem.state;
            elements.push(
                <tr key={alertItem.createdAt} className={classnames('', { 'table-danger': isUnread })}>
                    <th scope="row">
                        <i className={`fa fa-${alertItem.icon}`}></i>
                    </th>
                    <th scope="row">{alertItem.prettyCondition}</th>
                    <td>
                        {parseFloat(alertItem.value).toFixed(2)}&nbsp;{alertItem.instrumentUnitOfMeasure}
                    </td>
                    <td>
                        <Moment tz={alertItem.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                            {alertItem.timestamp}
                        </Moment>
                    </td>
                    <td>
                        <Link to={alertItem.absoluteUrl}>
                            View&nbsp;<i className="fas fa-chevron-right"></i>
                        </Link>
                    </td>
                </tr>
            );
        }
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Condition</th>
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


class NoAlertsJumbotron extends Component {
    render() {
        const { instrument } = this.props;
        return (
            <div className="jumbotron">
                <h1 className="display-4">
                    <i className="fas fa-bullhorn"></i>&nbsp;Attention
                </h1>
                <p className="lead">You currently do not have any alerts at the moment, please check in later to see if any alerts get generated as your instruments run.</p>
                <hr className="my-4" />
                <p>If you would like to have more alerts, please configure this instruments settings by clicking below.</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to={`/instrument/${instrument.slug}/alerts/config`}>
                        Configure Settings&nbsp;<i className="fas fa-arrow-circle-right"></i>
                    </Link>
                </p>
            </div>
        );
    }
}


class AlertItemComponent extends Component {
    render() {
        const { instrument, flashMessage, dataList } = this.props;

        let elements;
        if (dataList !== undefined && dataList !== null) {
            const { results } = dataList;
            if (results !== undefined && results !== null) {
                if (results.length === 0) {
                    elements = <NoAlertsJumbotron instrument={instrument} />;
                } else {
                    elements = (
                        <AlertItemTable dataList={dataList} />
                    );
                }
            }
        }

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
                                <Link to={`${instrument.absoluteParentUrl}`}><i className="fas fa-cube"></i>&nbsp;Device</Link>
                            }
                        </li>
                        {instrument.absoluteUrl &&
                            <li className="breadcrumb-item">
                                <Link to={`${instrument.absoluteUrl}`}>
                                    <i className={`fas fa-${instrument.icon}`}></i>&nbsp;Instrument
                                </Link>
                            </li>
                        }
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-bell"></i>&nbsp;Alerts</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-bell"></i>&nbsp;Alerts</h1>

                <div className="row">
                    <div className="col-md-12">
                        <FlashMessageComponent object={flashMessage} />
                    </div>
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

export default AlertItemComponent;
