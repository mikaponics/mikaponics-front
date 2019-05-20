import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentDataDownloadComponent from "../../../components/instruments/data/instrumentDataDownloadComponent";
import { MIKAPONICS_GET_TIME_SERIES_DATA_CSV_DOWNLOAD_API_URL } from "../../../constants/api";


class InstrumentDataContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            toDateObj: null,
            fromDateObj: null,
            isLoading: false,
            instrumentSlug: slug,
        }
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

        // Disable the button so the user cannot double click and download
        // the file multiple times.
        this.setState({ isLoading: true, })

        // Extract the selected options and convert to ISO string format, also
        // create our URL to be used for submission.
        const toDateString = toDateObj.toISOString().slice(0, 10);
        const fromDateString = fromDateObj.toISOString().slice(0, 10);
        const instrumentSlug = this.props.instrument.slug;
        const url = MIKAPONICS_GET_TIME_SERIES_DATA_CSV_DOWNLOAD_API_URL + "?from_dt="+toDateString+"&to_dt="+fromDateString+"&instrument_slug="+instrumentSlug;

        // The following code will open up a new browser tab and load up the
        // URL that you inputted.
        var win = window.open(url, '_blank');
        win.focus();

        // Add minor delay and then run to remove the button ``disable`` state
        // so the user is able to click the download button again.
        setTimeout(() => {
            this.setState({ isLoading: false, })
        }, 100); // 0.10 seconds.
    }

    render() {
        const { isLoading, toDateObj, fromDateObj } = this.state;
        return (
            <InstrumentDataDownloadComponent
                toDateObj={toDateObj}
                fromDateObj={fromDateObj}
                instrument={this.props.instrument}
                onToDateTimeChange={this.onToDateTimeChange}
                onFromDateTimeChange={this.onFromDateTimeChange}
                onSubmit={this.onSubmit}
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
