import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import ProfileEditComponent from "../../components/profile/profileEditComponent";
import { pullProfile } from "../../actions/profileAction";


class ProfileEditContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            instrumentSlug: slug,
            referrer: null,
        }

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e){
        this.setState({
            referrer: '/profile'
        })
    }

    componentDidMount() {
        const { user } = this.props;

        // Run the async code to fetch the latest profile information from the
        // server and save the latest user's details into our global state.
        // Make the authenticated call to our web-service.
        this.props.pullProfile(user);
    } // end FUNC.

    render() {
        const { referrer } = this.state;
        if (referrer) {
            return <Redirect to={"/profile"} />;
        }
        return (
            <ProfileEditComponent
                profile={this.props.user}
                onChange={this.onChange}
                onClick={this.onClick}
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
)(ProfileEditContainer);
