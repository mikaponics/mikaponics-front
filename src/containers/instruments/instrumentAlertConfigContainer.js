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
            alertDelayInSecondsOptions: [
                {
                    value: 60,
                    label: "Every minute"
                },{
                    value: 120,
                    label: "Every 2 minutes"
                },{
                    value: 300,
                    label: "Every 5 minutes"
                },{
                    value: 600,
                    label: "Every 10 minutes"
                },{
                    value: 1200,
                    label: "Every 20 minutes"
                },{
                    value: 1800,
                    label: "Every 30 minutes"
                },{
                    value: 3600,
                    label: "Every hour"
                },{
                    value: 7200,
                    label: "Every 2 hours"
                },{
                    value: 14400,
                    label: "Every 4 hours"
                },{
                    value: 21680,
                    label: "Every 6 hours"
                },{
                    value: 43200,
                    label: "Every 12 hours"
                },{
                    value: 86400,
                    label: "Every 24 hours"
                }
            ]
        }

        // Bind all our component functions.
        this.onChange = this.onChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e) {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSelectChange(e) {
        // Special thanks to https://stackoverflow.com/a/28625477
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        console.log(value);
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
                onSelectChange={this.onSelectChange}
                onClick={this.onClick}
                errors={this.props.errors}
                options={this.state.alertDelayInSecondsOptions}
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
