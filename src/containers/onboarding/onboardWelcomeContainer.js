import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { attemptLogout } from "../../actions/loginAction"
import { clearOnboarding } from "../../actions/onboardingActions"
import { pullProfile } from "../../actions/profileAction"
import OnboardWelcomeComponent from "../../components/onboarding/onboardWelcomeComponent";


class OnboardWelcomeContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            user: this.props.user
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Run the async code to fetch the latest profile information from the
        // server and save the latest user's details into our global state.
        // Make the authenticated call to our web-service.
        this.props.pullProfile(this.props.user);
    } // end FUNC.

    render() {
        const { referrer } = this.state;
        const { user, onboarding } = this.props;

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
            <OnboardWelcomeComponent
                user={user}
                onboarding={onboarding}
            />
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
        pullProfile: (user) => {
            dispatch(
                pullProfile(user)
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
