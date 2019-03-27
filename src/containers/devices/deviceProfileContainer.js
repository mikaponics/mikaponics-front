import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceProfileComponent from "../../components/devices/deviceProfileComponent";
import { pullDevice } from "../../actions/deviceActions";


class DeviceProfileContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug, name, description } = this.props.match.params;
        this.state = {
            deviceSlug: slug,
            name: name,
            description: description,
            errors: {},
            isLoading: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e) {
        e.preventDefault();

        // Disable the button so the user cannot double click and download
        // the file multiple times.
        this.setState({ errors: {}, isLoading: true, })
    }

    componentDidMount() {
        this.props.pullDevice(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    render() {
        const { name, description, errors, isLoading } = this.state;
        return (
            <DeviceProfileComponent
                device={this.props.device}
                name={name}
                description={description}
                errors={errors}
                isLoading={isLoading}
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
)(DeviceProfileContainer);
