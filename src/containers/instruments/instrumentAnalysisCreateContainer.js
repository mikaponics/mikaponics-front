import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import InstrumentAnalysisCreateComponent from "../../components/instruments/instrumentAnalysisCreateComponent";
import { postInstrumentAnalysisCreate } from "../../actions/instrumentAnalysisCreateActions";
import { setFlashMessage } from "../../actions/flashMessageActions";


class InstrumentAnalysisCreateContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            instrumentSlug: slug,
            toDateObj: null,
            fromDateObj: null,
            isLoading: false,
        }

        // Bind our custom functions.
        this.onToDateTimeChange = this.onToDateTimeChange.bind(this);
        this.onFromDateTimeChange = this.onFromDateTimeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onToDateTimeChange(dateObj) {
        this.setState({
            toDateObj: dateObj,
        })
    }

    onFromDateTimeChange(dateObj) {
        this.setState({
            fromDateObj: dateObj,
        })
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    componenWillUnmount() {
        this.setState({});
    } // end FUNC.

    /**
     *  Function will be called when the API submission was successfull without
     *  errors.
     */
    onSuccessfulSubmissionCallback(e) {
        this.props.setFlashMessage("success", "The instrument analysis has been successfully created.");
        this.setState({
            referrer: this.props.instrument.absoluteUrl+"/analyses"
        })
    }

    onFailedSubmissionCallback(e) {
        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSubmit(e) {
        e.preventDefault();

        // Defensive code.
        const { toDateObj, fromDateObj } = this.state;
        if (toDateObj === undefined || toDateObj === null) {
            alert("Please pick a TO date.");
            return;
        }
        if (fromDateObj === undefined || fromDateObj === null) {
            alert("Please pick a FROM date.");
            return;
        }

        // Extract the selected options and convert to ISO string format, also
        // create our URL to be used for submission.
        const toDateString = toDateObj.toISOString().slice(0, 10);
        const fromDateString = fromDateObj.toISOString().slice(0, 10);
        const instrumentSlug = this.props.instrument.slug;

        // Submit
        const data = {
            startDt: fromDateString,
            finishDt: toDateString
        };
        const successFunc = this.onSuccessfulSubmissionCallback();
        const errorFunc = this.onFailedSubmissionCallback();
        this.props.postInstrumentAnalysisCreate(
            this.props.user,
            this.props.match.params.slug,
            data,
            successFunc,
            errorFunc
        );
    }

    render() {
        const { isLoading, toDateObj, fromDateObj, referrer } = this.state;
        const { isAPIRequestRunning, errors } = this.props.instrumentAnalysisDetail;

        if (referrer) {
            return <Redirect to={referrer} />;
        }

        return (
            <InstrumentAnalysisCreateComponent
                toDateObj={toDateObj}
                fromDateObj={fromDateObj}
                instrument={this.props.instrument}
                onToDateTimeChange={this.onToDateTimeChange}
                onFromDateTimeChange={this.onFromDateTimeChange}
                onSubmit={this.onSubmit}
                isLoading={isAPIRequestRunning}
                errors={errors}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
        instrumentAnalysisDetail: store.instrumentAnalysisDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postInstrumentAnalysisCreate: (user, instrumentSlug, data) => {
            dispatch(
                postInstrumentAnalysisCreate(user, instrumentSlug, data)
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
)(InstrumentAnalysisCreateContainer);
