import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from "react-router-dom";


class SubscriptionDetailComponent extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="Dashboard">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-gem"></i>&nbsp;Subscription</li>
                    </ol>
                </nav>

                <h1><i className="fas fa-gem"></i>&nbsp;Subscription</h1>

                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-bullhorn"></i>&nbsp;Attention
                        </h1>
                        <p className="lead">No previous subscriptions exist.</p>
                        <hr className="my-4" />
                        <p>Click here to begin the subscription purchase.</p>
                        <p className="lead">
                            <Link to="subscription/checkout" className="btn btn-success btn-lg">
                                <i className="fas fa-shopping-cart"></i>&nbsp;Checkout
                            </Link>
                        </p>
                    </div>
            </div>
        );
    }
}

export default SubscriptionDetailComponent;
