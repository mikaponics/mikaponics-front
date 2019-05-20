import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import classnames from 'classnames';
import 'moment-timezone';

import { ALERT_ITEM_UNREAD_STATE } from "../../constants/api";


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
                    <th scope="row">{alertItem.prettyState}</th>
                    <td>
                        {alertItem.prettyTypeOf}
                    </td>
                    <td>
                        <Moment tz={alertItem.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                            {alertItem.alertItemTimestamp}
                        </Moment>
                    </td>
                    <td>
                        <Link to={`/alert/${alertItem.slug}`}>
                            View&nbsp;<i className="fas fa-chevron-right"></i>
                        </Link>
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
                            <th scope="col">State</th>
                            <th scope="col">Type</th>
                            <th scope="col">Date</th>
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
        return (
            <div className="jumbotron">
                <h1 className="display-4">
                    <i className="fas fa-bullhorn"></i>&nbsp;Attention
                </h1>
                <p className="lead">You currently do not have any alerts at the moment, please check in later to see if any alerts get generated as your instruments run.</p>
                <hr className="my-4" />
                <p>If you would like to have more alerts, please configure an instrument settings in one of your device. Start by clicking below.</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to="/devices">
                        View Devices&nbsp;<i className="fas fa-arrow-circle-right"></i>
                    </Link>
                </p>
            </div>
        );
    }
}


class AlertListComponent extends Component {
    render() {
        const { alertItemList } = this.props;

        let elements;
        if (alertItemList !== undefined && alertItemList !== null) {
            const { results } = alertItemList;
            if (results !== undefined && results !== null) {
                if (results.length === 0) {
                    elements = <NoAlertsJumbotron />;
                } else {
                    elements = (
                        <AlertItemTable dataList={alertItemList} />
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
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-bell"></i>&nbsp;Alerts
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-bell"></i>&nbsp;Alerts</h1>
                <div className="row">
                    <div className="col-md-12">
                        {elements}
                    </div>
                </div>
            </div>
        );
    }
}

export default AlertListComponent;
