import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceProfileComponent from "../../components/devices/deviceProfileComponent";
import { putDevice } from "../../actions/deviceActions";


class DeviceProfileContainer extends Component {
    constructor(props) {
        super(props);

        // Extract our data from the device.
        const { name, description, dataIntervalInSeconds } = this.props.device;

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            deviceSlug: slug,
            name: name,
            description: description,
            dataIntervalInSeconds: dataIntervalInSeconds,
            wasSubmissionOK: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
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
        this.setState({ wasSubmissionOK: true });
    }

    onClick(e) {
        e.preventDefault();

        this.setState({ wasSubmissionOK: false });

        // Asynchronously submit our ``update`` to our API endpoint.
        this.props.putDevice(this.props.user, this.props.match.params.slug, this.state, this.onSuccessfulSubmissionCallback);
    }

    componentDidMount() {
        // Do nothing.
    } // end FUNC.

    render() {
        const { name, description, dataIntervalInSeconds, wasSubmissionOK } = this.state;
        const { isAPIRequestRunning, errors } = this.props.device;
        return (
            <DeviceProfileComponent
                device={this.props.device}
                name={name}
                description={description}
                dataIntervalInSeconds={dataIntervalInSeconds}
                errors={errors}
                isLoading={isAPIRequestRunning}
                wasSubmissionOK={wasSubmissionOK}
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
        putDevice: (user, deviceSlug, data, okCallback) => {
            dispatch(
                putDevice(user, deviceSlug, data, okCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceProfileContainer);
