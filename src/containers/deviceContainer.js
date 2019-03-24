import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceComponent from "../components/deviceComponent";
import { pullDevice } from "../actions/deviceActions";


class DeviceContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            deviceSlug: slug,
        }
    }

    componentDidMount() {
        this.props.pullDevice(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    render() {
        return (
            <DeviceComponent
                device={this.props.device}
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
        pullDevice: (user, deviceSlug) => {
            dispatch(
                pullDevice(user, deviceSlug)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceContainer);
