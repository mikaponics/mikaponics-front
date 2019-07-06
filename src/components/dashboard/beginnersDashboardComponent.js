import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from "react-router-dom";

import SubscriptionNoticeContainer from '../../containers/navigation/subscriptionNoticeContainer';


class BeginnersDashboardComponent extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="Dashboard">
                <SubscriptionNoticeContainer />
                <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>

                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-bullhorn"></i>&nbsp;Attention
                        </h1>
                        <p className="lead">Before you can use your dashboard, you will need to <strong>add a device</strong>. Once added, you will be granted full-access to your dashboard.</p>
                        <hr className="my-4" />
                        <p>Click here to begin the device purchase</p>
                        <p className="lead">
                            <Link to="/devices/create/step-1" className="btn btn-success btn-lg">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </Link>
                        </p>
                    </div>
            </div>
        );
    }
}

export default BeginnersDashboardComponent;
