import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';

import InstrumentAlertConfigComponent from "../../components/instruments/instrumentAlertConfigComponent";
import { pullInstrument, putInstrument } from "../../actions/instrumentActions";


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
        this.onRedAlertDelayInSecondsChange = this.onRedAlertDelayInSecondsChange.bind(this);
        this.onOrangeAlertDelayInSecondsChange = this.onOrangeAlertDelayInSecondsChange.bind(this);
        this.onYellowAlertDelayInSecondsChange = this.onYellowAlertDelayInSecondsChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e) {
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onRedAlertDelayInSecondsChange(option) {
        this.setState({
            redAlertDelayInSeconds: option.value
        });
        console.log("redAlertDelayInSeconds:", option.value)
    }

    onOrangeAlertDelayInSecondsChange(option) {
        this.setState({
            orangeAlertDelayInSeconds: option.value
        });
        console.log("orangeAlertDelayInSeconds:", option.value)
    }

    onYellowAlertDelayInSecondsChange(option) {
        this.setState({
            yellowAlertDelayInSeconds: option.value
        });
        console.log("yellowAlertDelayInSeconds:", option.value)
    }

    /**
     *  Function will be called when the API submission was successfull without
     *  errors.
     */
    onSuccessfulSubmissionCallback() {
        this.setState({ wasSubmissionOK: true });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onClick() {
        // Asynchronously submit our ``update`` to our API endpoint.
        this.props.putInstrument(
            this.props.user,
            this.props.match.params.slug,
            this.state,
            this.onSuccessfulSubmissionCallback
        );
    }

    componentDidMount() {
        this.props.pullInstrument(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    render() {
        function getSelectedOption(options, value) {
            const optionsLength = options.length;
            for (let i = 0; i < optionsLength; i++ ) {
                let option = options[i];
                if (option.value === value) {
                    return option
                }
            }
            return null;
        }

        return (
            <InstrumentAlertConfigComponent
                instrument={this.props.instrument}
                isLoading={this.state.isLoading}
                wasSubmissionOK={this.state.wasSubmissionOK}

                redAboveValue={this.state.redAboveValue}
                redBelowValue={this.state.redBelowValue}
                redAlertDelayInSecondsOption={getSelectedOption(this.state.alertDelayInSecondsOptions, this.state.redAlertDelayInSeconds)}
                onRedAlertDelayInSecondsChange={this.onRedAlertDelayInSecondsChange}

                orangeAboveValue={this.state.orangeAboveValue}
                orangeBelowValue={this.state.orangeBelowValue}
                orangeAlertDelayInSecondsOption={getSelectedOption(this.state.alertDelayInSecondsOptions, this.state.orangeAlertDelayInSeconds)}
                onOrangeAlertDelayInSecondsChange={this.onOrangeAlertDelayInSecondsChange}

                yellowAboveValue={this.state.yellowAboveValue}
                yellowBelowValue={this.state.yellowBelowValue}
                yellowAlertDelayInSecondsOption={getSelectedOption(this.state.alertDelayInSecondsOptions, this.state.yellowAlertDelayInSeconds)}
                onYellowAlertDelayInSecondsChange={this.onYellowAlertDelayInSecondsChange}

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
        putInstrument: (user, instrumentSlug, data, okCallback) => {
            dispatch(
                putInstrument(user, instrumentSlug, data, okCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentAlertConfigContainer);
