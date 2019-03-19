import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { attemptLogout } from "../../actions/loginAction"
import { clearOnboarding } from "../../actions/onboardingActions"
import { refreshUser } from "../../actions/profileAction"
import OnboardWelcomeComponent from "../../components/onboarding/onboardWelcomeComponent";


class OnboardWelcomeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            user: this.props.user
        }

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        // Reset the onboarding state.
        this.props.clearOnboarding();

        // Update the global state of the application to store our
        // user's details for the application.
        this.props.attemptLogout()

        // Re-direct.
        this.setState({
            referrer: '/'
        })
    }

    componentDidMount() {
        // Run the async code to fetch the latest profile information from the
        // server and save the latest user's details into our global state.
        // Make the authenticated call to our web-service.
        this.props.refreshUser(this.props.user);
    } // end FUNC.

    render() {
        const { referrer } = this.state;
        const { user } = this.props;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        // If the user was onboarded then let us redirect to the dashboard.
        if (user.wasOnboarded) {
            return <Redirect to="/dashboard" />;
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
                    user={user}
                />

            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        onboarding: store.onboardingState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        attemptLogout: () => {
            dispatch(
                attemptLogout()
            )
        },
        refreshUser: (user) => {
            dispatch(
                refreshUser(user)
            )
        },
        clearOnboarding: () => {
            dispatch(
                clearOnboarding()
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardWelcomeContainer);
