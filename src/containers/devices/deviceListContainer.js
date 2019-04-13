import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceListComponent from "../../components/devices/deviceListComponent";
import { pullDeviceList } from "../../actions/deviceListActions";


class DeviceListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.pullDeviceList(this.props.user);
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    render() {
        return (
            <DeviceListComponent
                deviceList={this.props.deviceList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        deviceList: store.deviceListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullDeviceList: (user, page) => {
            dispatch(
                pullDeviceList(user, page)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceListContainer);
