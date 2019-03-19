import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import store from '../store';

import { attemptLogout } from "../actions/loginAction"


class DashboardContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboard: {},
            referrer: '',
        }

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        // Update the global state of the application to store our
        // user profile for the application.
        store.dispatch(
            attemptLogout({})
        );

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
            <div className="App">
                <h1>Dashboard</h1>
                <button onClick={this.onLogoutClick}>Logout</button>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState.user
    };
}

export default connect(mapStateToProps)(DashboardContainer);
