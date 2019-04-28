import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { NOT_INTERESTED_SUBSCRIPTION_STATUS } from "../../constants/api";


class OnboardWelcomeComponent extends Component {
    render() {
        const { user, onboarding } = this.props;

        function beginButton(onboarding) {
            if (onboarding === null || onboarding === undefined) {
                return (
                    <Link to="/onboard/purchase" className="btn btn-primary">Begin&nbsp;<i className="fas fa-arrow-circle-right"></i></Link>
                );
            } else {
                if ( Object.keys(onboarding).length === 0 ) {
                    return (
                        <Link to="/onboard/purchase" className="btn btn-primary">Begin&nbsp;<i className="fas fa-arrow-circle-right"></i></Link>
                    );
                } else {
                    return (
                        <Link to="/onboard/purchase" className="btn btn-primary">Resume&nbsp;<i className="fas fa-arrow-circle-right"></i></Link>
                    );
                }
            }
        }

        function notPaidView() {
            return (
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                            </li>
                        </ol>
                    </nav>

                    <h1><i className="fas fa-tachometer-alt"></i> Dashboard</h1>

                    <div className="jumbotron">
                        <h1 className="display-4">Welcome!</h1>
                        <p className="lead">Before you begin, you will need to <strong>purchase a subscription</strong> and a <strong>telemetry device</strong>. Once purchased, you will be granted full-access to your dashboard.</p>
                        <hr className="my-4" />
                        <p>Click here to begin the device purchase and subscription activation.</p>
                        {beginButton(onboarding)}
                    </div>
                </div>
            );
        }

        function paidView() {
            return (
                <div className="Onboarding-Greetings">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">
                                <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                            </li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-sm-12">

                            <div className="jumbotron">
                                <h1 className="display-4">Order Processing</h1>
                                <p className="lead">Your order is being processed. Once the device has been shipped, you will be granted access to your dashboard.</p>
                                <hr className="my-4" />
                                <p>Please check your email periodically to get the latest information about your order.</p>
                            </div>

                        </div>
                    </div>
                </div>
            );
        }

        if (user.subscriptionStatus === NOT_INTERESTED_SUBSCRIPTION_STATUS) {
            return notPaidView();
        } else {
            return paidView();
        }

    }
}


export default OnboardWelcomeComponent
