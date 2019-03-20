import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceComponent from "../components/deviceComponent";
import { pullDevice } from "../actions/deviceActions";


class DeviceContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;
        this.state = {
            deviceID: id,
        }
    }

    componentWillReceiveProps(incomingProps) {
        // (1) Input ``user`` parameter which we got from the ``redux`` store.
        // (2) Input the device ID.
        // (3) Get our device and update our global state.
        this.props.pullDevice(incomingProps.user, incomingProps.match.params);
    } // end FUNC.

    render() {
        return (
            <DeviceComponent
                id={this.state.id}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        device: store.deviceState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullDevice: (user, deviceID) => {
            dispatch(
                pullDevice(user, deviceID)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceContainer);
