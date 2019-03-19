import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { NOT_INTERESTED_SUBSCRIPTION_STATUS } from "../../constants/api";


class OnboardWelcomeComponent extends Component {
    render() {

        const { onLogoutClick, user } = this.props;

        function notPaidView(onLogoutClick) {
            return (
                <div className="Onboarding-Greetings">
                    <div className="row">
                        <div className="col-sm-12">

                            <div className="jumbotron">
                                <h1 className="display-4">Welcome!</h1>
                                <p className="lead">Before you begin, you will need to purchase a subscription and the telemetry device. Once purchased, you will be granted access to your dashboard.</p>
                                <hr className="my-4" />
                                <p>Click here to begin the purchase.</p>
                                <Link to="/onboard/purchase" className="btn btn-primary">Begin</Link>
                            </div>

                            <button className="btn btn-primary" onClick={onLogoutClick}>Logout</button>

                        </div>
                    </div>
                </div>
            );
        }

        function paidView(onLogoutClick) {
            return (
                <div className="Onboarding-Greetings">
                    <div className="row">
                        <div className="col-sm-12">

                            <div className="jumbotron">
                                <h1 className="display-4">Order Processing</h1>
                                <p className="lead">Your order is being processed. Once the device has been shipped, you will be granted access to your dashboard.</p>
                                <hr className="my-4" />
                                <p>Please check your email periodically to get the latest information about your order.</p>
                            </div>

                            <button className="btn btn-primary" onClick={onLogoutClick}>Logout</button>

                        </div>
                    </div>
                </div>
            );
        }

        if (user.subscriptionStatus === NOT_INTERESTED_SUBSCRIPTION_STATUS) {
            return notPaidView(onLogoutClick);
        } else {
            return paidView(onLogoutClick);
        }

    }
}


export default OnboardWelcomeComponent
