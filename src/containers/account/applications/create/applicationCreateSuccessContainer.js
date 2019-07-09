import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import ApplicationCreateSuccessComponent from "../../../../components/account/applications/create/applicationCreateSuccessComponent";
import { localStorageGetArrayItem } from "../../../../helpers/localStorageUtility";
import { pullProfile } from "../../../../actions/profileAction";
import getCustomAxios from '../../../../helpers/customAxios';


class ApplicationCreateSuccessContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem("add-application-name"),
            description: localStorage.getItem("add-application-description"),
            clientId: localStorage.getItem("add-application-client-id"),
            clientSecret: localStorage.getItem("add-application-client-secret"),
            errors: {},
            isLoading: false,
        }
    }

    componentDidMount() {
        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    }

    /**
     *  Lifecycle unmount function will clear our `localStorage` of the
     *  `client_id` and `client_secret` values which we received from the
     *  API web-service.
     */
    componentWillUnmount() {
        localStorage.removeItem("add-application-name");
        localStorage.removeItem("add-application-description");
        localStorage.removeItem("add-application-slug");
        localStorage.removeItem("add-application-client-id");
        localStorage.removeItem("add-application-client-secret");
    }

    render() {
        return (
            <ApplicationCreateSuccessComponent
                user={this.props.user}
                name={this.state.name}
                description={this.state.description}
                clientId={this.state.clientId}
                clientSecret={this.state.clientSecret}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
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
)(ApplicationCreateSuccessContainer);
