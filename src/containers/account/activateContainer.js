import React from 'react';
import { connect } from 'react-redux';

import ActivateComponent from '../../components/account/activateComponent';
import { postActivateProfile } from "../../actions/profileAction";


class ActivateContainer extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        const accessCode = this.props.match.params['code'];
        this.props.postActivateProfile(accessCode,
        (data) => {
            console.log(data);
        },
        (data) => {
            console.log(data);
        });
    }

    render () {
        return (
            <ActivateComponent />
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        profile: store.profileState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postActivateProfile: (accessCode, successCallback, failedCallback) => {
            dispatch(postActivateProfile(accessCode, successCallback, failedCallback))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivateContainer);
