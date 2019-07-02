import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceCreateStep1Component from "../../../components/devices/create/deviceCreateStep1Component";


class DeviceCreateStep1Container extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    render() {
        return (
            <DeviceCreateStep1Component
                user={this.props.user}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep1Container);
