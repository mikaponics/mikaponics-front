import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { attemptLogout } from "../../actions/loginAction"


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

    onSubmit() {

    }

    render() {

        const { referrer, user } = this.state;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={this.onSubmit}>
                        <h1>Join our community</h1>
                        <button onClick={this.onLogoutClick}>Logout</button>
                    </form>
                </div>
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
