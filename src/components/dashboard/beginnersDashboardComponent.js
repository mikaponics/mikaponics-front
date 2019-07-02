import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from "react-router-dom";

import ServiceNoticeContainer from '../../containers/navigation/serviceNoticeContainer';


class BeginnersDashboardComponent extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="Dashboard">
                <ServiceNoticeContainer />
                <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>

                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-bullhorn"></i>&nbsp;Attention
                        </h1>
                        <p className="lead">Before you can use your dashboard, you will need to <strong>purchase a device</strong>. Once purchased, you will be granted full-access to your dashboard.</p>
                        <hr className="my-4" />
                        <p>Click here to begin the device purchase</p>
                        <p className="lead">
                            <Link to="/purchase" className="btn btn-success btn-lg">
                                <i className="fas fa-shopping-cart"></i>&nbsp;Purchase
                            </Link>
                        </p>
                    </div>
            </div>
        );
    }
}

export default BeginnersDashboardComponent;
