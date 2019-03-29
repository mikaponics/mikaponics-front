import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceComponent from "../../components/devices/deviceComponent";
import { pullDevice } from "../../actions/deviceActions";
import { clearFlashMessage } from "../../actions/flashMessageActions";


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
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    componentWillUnmount() {
        this.props.clearFlashMessage();
        this.setState({})
    }

    render() {
        const { flashMessage } = this.props;
        return (
            <DeviceComponent
                device={this.props.device}
                flashMessage={flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        device: store.deviceState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullDevice: (user, deviceSlug) => {
            dispatch(
                pullDevice(user, deviceSlug)
            )
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceContainer);
