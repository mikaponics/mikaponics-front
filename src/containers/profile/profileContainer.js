import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileComponent from "../../components/profile/profileComponent";
import { pullProfile } from "../../actions/profileAction";


class ProfileContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            instrumentSlug: slug,
        }
    }

    componentDidMount() {
        const { user } = this.props;

        // Run the async code to fetch the latest profile information from the
        // server and save the latest user's details into our global state.
        // Make the authenticated call to our web-service.
        this.props.pullProfile(user);
    } // end FUNC.

    render() {
        return (
            <ProfileComponent
                profile={this.props.user}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        // instrument: store.instrumentState,
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
)(ProfileContainer);
