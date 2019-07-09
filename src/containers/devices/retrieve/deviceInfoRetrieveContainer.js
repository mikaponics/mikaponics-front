import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceInfoRetrieveComponent from "../../../components/devices/retrieve/deviceInfoRetrieveComponent";
import { pullDevice } from "../../../actions/deviceActions";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class DeviceInfoRetrieveContainer extends Component {
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

        // This function will call the API backend every second to get the
        // device data.
        this.timerID = setInterval(
            () => this.tick(),
            10000 // 1000 milliseconds = 1 second
        );
    } // end FUNC.

    /**
     * Function used by the event timer to call the latest data from the API
     *  backend to get the latest device data.
     */
    tick() {
        this.props.pullDevice(this.props.user, this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(); // Clear the messages.

        clearInterval(this.timerID); // Clear our timer.

        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        const { flashMessage } = this.props;
        return (
            <DeviceInfoRetrieveComponent
                use={this.props.user}
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
)(DeviceInfoRetrieveContainer);
