import React, { Component } from 'react';
import { Link } from "react-router-dom";


class OnboardWelcomeComponent extends Component {
    render() {
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

                        <button className="btn btn-primary" onClick={this.props.onLogoutClick}>Logout</button>

                    </div>
                </div>
            </div>
        );
    }
}


export default OnboardWelcomeComponent
