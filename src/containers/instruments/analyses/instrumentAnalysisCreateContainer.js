import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import InstrumentAnalysisCreateComponent from "../../../components/instruments/analyses/instrumentAnalysisCreateComponent";
import { postInstrumentAnalysisCreate, setClearInstrumentAnalysisCreate } from "../../../actions/instrumentAnalysisCreateActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";


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
        }

        // Bind our custom functions.
        this.onToDateTimeChange = this.onToDateTimeChange.bind(this);
        this.onFromDateTimeChange = this.onFromDateTimeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        this.props.setClearInstrumentAnalysisCreate();
        this.setState({});
    } // end FUNC.

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
        // const toDateString = toDateObj.toISOString().slice(0, 10);
        // const fromDateString = fromDateObj.toISOString().slice(0, 10);
        const toDateString = toDateObj.toISOString();
        const fromDateString = fromDateObj.toISOString();
        const instrumentSlug = this.props.instrument.slug;

        // Submit
        const data = {
            instrumentSlug: instrumentSlug,
            startDt: fromDateString,
            finishDt: toDateString
        };
        this.props.postInstrumentAnalysisCreate(
            this.props.user,
            this.props.match.params.slug,
            data,
        );
    }

    render() {
        const { toDateObj, fromDateObj } = this.state;
        const { isAPIRequestRunning, errors, absoluteUrl } = this.props.instrumentAnalysisCreate;

        // If we have CREATED a new analysis then we can clear the GUI,
        // create our notification and return to our listing page.
        if (absoluteUrl) {
            this.props.setClearInstrumentAnalysisCreate();
            this.props.setFlashMessage("success", "The instrument analysis has been successfully created.");
            return <Redirect to={absoluteUrl} />;
        }

        if (errors) {
            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
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
        instrumentAnalysisCreate: store.instrumentAnalysisCreateState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postInstrumentAnalysisCreate: (user, instrumentSlug, data) => {
            dispatch(
                postInstrumentAnalysisCreate(user, instrumentSlug, data)
            )
        },
        setClearInstrumentAnalysisCreate: () => {
            dispatch(
                setClearInstrumentAnalysisCreate()
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
