import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentDataDownloadComponent from "../../components/instruments/instrumentDataDownloadComponent";


class InstrumentDataContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            toDateTime: "",
            fromDateTime: "",
            errors: {},
            isLoading: false,
            instrumentSlug: slug,
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    componentDidMount() {
        // Do nothing.
    } // end FUNC.

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true, })
        // this.props.attemptLogin(this.state.toDateTime, this.state.fromDateTime);
    }

    render() {
        const { errors, isLoading } = this.props;
        return (
            <InstrumentDataDownloadComponent
                instrument={this.props.instrument}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                errors={errors}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
        data: store.dataState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentDataContainer);
