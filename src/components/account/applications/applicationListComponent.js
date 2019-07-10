import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import classnames from 'classnames';
import 'moment-timezone';

import SubscriptionNoticeContainer from '../../../containers/navigation/subscriptionNoticeContainer';


class ApplicationItemTable extends Component {
    render() {
        let elements = [];
        const { user, onDeleteClick, isLoading } = this.props;
        const { results } = this.props.dataList;
        if (results === undefined || results === null) { // Defensive code.
            return null;
        }
        const dataLength = results.length;
        for (let i = 0; i < dataLength; i++) {
            let applicationItem = results[i];
            // console.log(applicationItem);
            let isUnread = false;
            elements.push(
                <tr key={applicationItem.createdAt}>
                    <th scope="row">{applicationItem.name}</th>
                    <td>
                        <Moment tz={user.timezone} format="YYYY/MM/DD hh:mm:ss a">
                            {applicationItem.createdAt}
                        </Moment>
                    </td>
                    <td>
                        Confidential
                    </td>
                    <td>
                        Client Credentials
                    </td>
                    <td>
                        <button  className="btn btn-sm float-right pl-4 pr-4 btn-danger" onClick={ (event)=> { onDeleteClick(event, applicationItem.slug) } } disabled={isLoading}>
                            <i className="fas fa-minus"></i>&nbsp;Remove
                        </button>
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
                            <th scope="col">Name</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Type</th>
                            <th scope="col">Authorization Grant Type</th>
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

class NoSubscriptionJumbotron extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">
                    <i className="fas fa-bullhorn"></i>&nbsp;Attention
                </h1>
                <p className="lead">You currently do not have a subscription. Applications require a subscription to be created.</p>
                <hr className="my-4" />
                <p>To get yourself a subscription, please click below.</p>
                <p className="lead">
                    <Link className="btn btn-success btn-lg" to="/subscription">
                        Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                    </Link>
                </p>
            </div>
        );
    }
}



export default class ApplicationListComponent extends Component {
    render() {
        const { user, applicationList, onDeleteClick, isLoading } = this.props;
        let elements;
        if (applicationList !== undefined && applicationList !== null) {
            const { results } = applicationList;
            if (results !== undefined && results !== null) {
                if (results.length === 0) {
                    elements = <NoApplicationsJumbotron />;
                } else {
                    elements = (
                        <ApplicationItemTable dataList={applicationList} user={user} onDeleteClick={onDeleteClick} isLoading={isLoading} />
                    );
                }
            }
        } else {
            elements = <NoApplicationsJumbotron />;
        }

        // OVERRIDE ALL GUI CREATED IF THE USER DOES NOT HAVE A SUBSCRIPTION.
        if (user.subscriptionStatus !== 'active') {
            elements = <NoSubscriptionJumbotron />;
        }

        return (
            <div>
                <SubscriptionNoticeContainer />
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

                <h1><i className="fas fa-server"></i>&nbsp;Applications</h1>

                <div className="row">
                    <div className="col-md-12">
                        {elements}
                    </div>
                </div>
            </div>
        );
    }
}
