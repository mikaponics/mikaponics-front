import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceCreateStep3IntegrateComponent from "../../../components/devices/create/deviceCreateStep3IntegrateComponent";
import { localStorageGetArrayItem } from "../../../helpers/localStorageUtility";
import { pullProfile } from "../../../actions/profileAction";


class DeviceCreateStep3IntegrateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: localStorageGetArrayItem("add-device-instruments"),
            errors: {},
            isLoading: false,
        }
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    componentDidMount() {
        const { user } = this.props;

        // Run the async code to fetch the latest profile information from the
        // server and save the latest user's details into our global state.
        // Make the authenticated call to our web-service.
        this.props.pullProfile(user);

        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    }

    onSubmitClick(e) {
        e.preventDefault();
        this.setState(
            { errors: {}, isLoading: true },
            ()=>{

            }
        );
    }

    onSuccessfulSubmissionCallback(data) {
        this.setState(
            { errors: {}, isLoading: false },
            ()=>{

            }
        );
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false });
    }

    render() {
        return (
            <DeviceCreateStep3IntegrateComponent
                user={this.props.user}
                instruments={this.state.instruments}
                errors={this.state.errors}
                isLoading={this.state.isLoading}
                onSubmitClick={this.onSubmitClick}
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
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep3IntegrateContainer);
