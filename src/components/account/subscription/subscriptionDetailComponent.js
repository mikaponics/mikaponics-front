import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from "react-router-dom";


class SubscriptionDetailComponent extends Component {
    render() {
        const { user, subscription } = this.props;
        const hasActiveSubscription = user.subscriptionStatus === 'active';
        const hasNoSubscription = user.subscriptionStatus !== 'active';
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
                        <div id="step-3" className="st-grey active">
                            <span className="num"><i className="fas fa-gem"></i></span><span className="">Subscription</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/referrals">
                                <span className="num"><i className="fas fa-heart"></i></span><span className="">Referrals</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <h1><i className="fas fa-gem"></i>&nbsp;Subscription</h1>

                {hasNoSubscription &&
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
                }
                {hasActiveSubscription &&
                    <div>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Subscription Details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Monthly Amount</th>
                                    <td>{subscription.amountInDollars}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Start Date</th>
                                    <td>
                                        <Moment tz={user.timezone} format="YYYY/MM/DD hh:mm:ss a">
                                            {user.subscriptionStartDate}
                                        </Moment>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group">
                            <Link type="text" className="btn btn-lg float-right pl-4 pr-4 btn-danger" to="/subscription/cancellation">
                                <i className="fas fa-times-circle"></i>&nbsp;Cancel Subscription
                            </Link>
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default SubscriptionDetailComponent;
