import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentAlertConfigComponent from "../../components/instruments/instrumentAlertConfigComponent";
import { pullInstrument } from "../../actions/instrumentActions";


class InstrumentAlertConfigContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            instrumentSlug: slug,
            isLoading: false,
            wasSubmissionOK: false,
            redAboveValue: this.props.instrument.redAboveValue,
            orangeAboveValue: this.props.instrument.orangeAboveValue,
            yellowAboveValue: this.props.instrument.yellowAboveValue,
            yellowBelowValue: this.props.instrument.yellowBelowValue,
            orangeBelowValue: this.props.instrument.orangeBelowValue,
            redBelowValue: this.props.instrument.redBelowValue,
            redAlertDelayInSeconds: this.props.instrument.redAlertDelayInSeconds,
            orangeAlertDelayInSeconds: this.props.instrument.orangeAlertDelayInSeconds,
            yellowAlertDelayInSeconds: this.props.instrument.yellowAlertDelayInSeconds,
        }

        // Bind all our component functions.
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick() {
        alert("--- Clicked ---");
    }

    componentDidMount() {
        this.props.pullInstrument(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    render() {
        return (
            <InstrumentAlertConfigComponent
                instrument={this.props.instrument}
                isLoading={this.state.isLoading}
                wasSubmissionOK={this.state.wasSubmissionOK}
                redAboveValue={this.state.redAboveValue}
                onChange={this.onChange}
                onClick={this.onClick}
                errors={this.props.errors}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInstrument: (user, instrumentSlug) => {
            dispatch(
                pullInstrument(user, instrumentSlug)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentAlertConfigContainer);
