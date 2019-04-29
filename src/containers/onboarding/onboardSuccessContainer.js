import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullProfile } from "../../actions/profileAction";
import OnboardSuccessComponent from "../../components/onboarding/onboardSuccessComponent";


class OnboardSuccessContainer extends Component {
    componentDidMount() {
        this.props.pullProfile(this.props.user)
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    render() {
        return (
            <OnboardSuccessComponent />
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
        pullProfile: (user) => {
            dispatch(pullProfile(user))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardSuccessContainer);
