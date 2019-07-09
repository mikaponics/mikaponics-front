import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';

import DeviceProfileComponent from "../../../components/devices/update/deviceProfileComponent";
import { putDevice } from "../../../actions/deviceActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";


class DeviceProfileContainer extends Component {
    constructor(props) {
        super(props);

        // Extract our data from the device.
        const { name, description, dataIntervalInSeconds } = this.props.device;

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            slug: slug,
            deviceSlug: slug,
            name: name,
            description: description,
            dataIntervalInSeconds: dataIntervalInSeconds,
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    /**
     *  Function will be called when the API submission was successfull without
     *  errors.
     */
    onSuccessfulSubmissionCallback() {
        this.props.setFlashMessage("success", "The device has been successfully updated.");
        this.props.history.push("/device/"+this.state.slug+"/full");
    }

    onFailedSubmissionCallback() {
        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onClick(e) {
        e.preventDefault();

        // Asynchronously submit our ``update`` to our API endpoint.
        this.props.putDevice(
            this.props.user,
            this.props.match.params.slug,
            this.state,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    render() {
        const { name, description, dataIntervalInSeconds } = this.state;
        const { isAPIRequestRunning, errors } = this.props.device;
        return (
            <DeviceProfileComponent
                device={this.props.device}
                name={name}
                description={description}
                dataIntervalInSeconds={dataIntervalInSeconds}
                errors={errors}
                isLoading={isAPIRequestRunning}
                onChange={this.onChange}
                onClick={this.onClick}
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
        putDevice: (user, deviceSlug, data, successCallback, errorCallback) => {
            dispatch(
                putDevice(user, deviceSlug, data, successCallback, errorCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceProfileContainer);
