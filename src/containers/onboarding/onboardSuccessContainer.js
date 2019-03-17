import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { attemptLogout } from "../../actions/loginAction"


class OnboardWelcomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: ''
        }
    }

    render() {
        return (
            <div className="Onboarding-Greetings">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="jumbotron">
                            <h1 className="display-4">Success!</h1>
                            <p className="lead">Your order has been placed.</p>
                            <hr className="my-4" />
                            <p>Please check your email periodically to get the latest information about your shipment.</p>
                        </div>

                        <button className="btn btn-primary" onClick={this.props.onLogoutClick}>Logout</button>

                    </div>
                </div>
            </div>
        );
    }
}


class OnboardSuccessContainer extends Component {
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
        const { referrer } = this.state;

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
)(OnboardSuccessContainer);
