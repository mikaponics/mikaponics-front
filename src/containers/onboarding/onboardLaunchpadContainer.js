import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';

import { attemptLogout } from "../../actions/loginAction"


class OnboardWelcomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            user: this.props.user
        }
    }

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


class OnboardLaunchpadContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            user: this.props.user
        }

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        // Update the global state of the application to store our
        // user's details for the application.
        this.props.attemptLogout()

        // Re-direct.
        this.setState({
            referrer: '/'
        })
    }

    render() {
        const { referrer, user } = this.state;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Home</li>
                    </ol>
                </nav>

                <OnboardWelcomeComponent
                    onLogoutClick={this.onLogoutClick}
                />

            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        attemptLogout: () => {
            dispatch(
                attemptLogout()
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardLaunchpadContainer);
