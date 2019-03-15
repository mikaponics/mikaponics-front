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
        this.onAnnualSubscriptionClick = this.onAnnualSubscriptionClick.bind(this);
        this.onMonthlySubscriptionClick = this.onMonthlySubscriptionClick.bind(this);
    }

    onAnnualSubscriptionClick() {
        alert("Annual");
    }

    onMonthlySubscriptionClick() {
        alert("Monthly");
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
            <div className="App">
                <h1>Onboard</h1>
                Hello {user.first_name}<br />
                <button onClick={this.onMonthlySubscriptionClick}>Monthly Subscription</button>
                <button onClick={this.onAnnualSubscriptionClick}>Annual Subscription</button>
                <button onClick={this.onLogoutClick}>Logout</button>
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
