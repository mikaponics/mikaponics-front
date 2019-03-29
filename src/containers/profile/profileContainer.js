import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileComponent from "../../components/profile/profileComponent";
import { pullProfile } from "../../actions/profileAction";
import { clearFlashMessage } from "../../actions/flashMessageActions";


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

    componentWillUnmount() {
        this.props.clearFlashMessage();
    }

    render() {
        const { flashMessage } = this.props;
        return (
            <ProfileComponent
                profile={this.props.user}
                flashMessage={flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (user) => {
            dispatch(pullProfile(user))
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileContainer);
