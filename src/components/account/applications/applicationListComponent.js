import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import classnames from 'classnames';
import 'moment-timezone';

import { TASK_ITEM_UNREAD_STATE } from "../../../constants/api";


class ApplicationItemTable extends Component {
    render() {
        let elements = [];
        const { results } = this.props.dataList;
        if (results === undefined || results === null) { // Defensive code.
            return null;
        }
        const dataLength = results.length;
        for (let i = 0; i < dataLength; i++) {
            let applicationItem = results[i];
            let isUnread = false;
            let stateText = applicationItem.isClosed ? "Closed" : "Open";
            elements.push(
                <tr key={applicationItem.createdAt} className={classnames('', { 'table-danger': isUnread })}>
                    <th scope="row">{stateText}</th>
                    <td>
                        {applicationItem.prettyTypeOf}
                    </td>
                    <td>
                        <Moment tz={applicationItem.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                            {applicationItem.dueDate}
                        </Moment>
                    </td>
                    <td>
                        <Link to={`/application-start/${applicationItem.slug}`}>
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
                            <th scope="col">Due Date</th>
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

class NoApplicationsJumbotron extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">
                    <i className="fas fa-bullhorn"></i>&nbsp;Attention
                </h1>
                <p className="lead">You currently do not have any applications at the moment, if you would like to set them up, please click below.</p>
                <p className="lead">
                    <Link className="btn btn-success btn-lg" to="/applications/add/step-1">
                        <i className="fas fa-plus"></i>&nbsp;Add Application
                    </Link>
                </p>
            </div>
        );
    }
}


export default class ApplicationListComponent extends Component {
    render() {
        const { user, applicationList } = this.props;

        let elements;
        if (applicationList !== undefined && applicationList !== null) {
            const { results } = applicationList;
            if (results !== undefined && results !== null) {
                if (results.length === 0) {
                    elements = <NoApplicationsJumbotron />;
                } else {
                    elements = (
                        <ApplicationItemTable dataList={applicationList} user={user} />
                    );
                }
            }
        } else {
            elements = <NoApplicationsJumbotron />;
        }

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-server"></i>&nbsp;Applications
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/profile">
                                <span className="num"><i className="fas fa-user-circle"></i></span><span className="">Profile</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/invoices">
                                <span className="num"><i className="fas fa-receipt"></i></span><span className="">Invoices</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/subscription">
                                <span className="num"><i className="fas fa-gem"></i></span><span className="">Subscription</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <span className="num"><i className="fas fa-server"></i></span><span className="">Applications</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to="/referrals">
                                <span className="num"><i className="fas fa-heart"></i></span><span className="">Referrals</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <h1><i className="fas fa-applications"></i>&nbsp;Applications</h1>

                <div className="row">
                    <div className="col-md-12">
                        {elements}
                    </div>
                </div>
            </div>
        );
    }
}
