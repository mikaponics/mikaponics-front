import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentDataComponent from "../../components/instruments/instrumentDataComponent";
import { pullInstrument } from "../../actions/instrumentActions";
import { pullTimeSeriesData } from "../../actions/dataActions";


class InstrumentDataContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            instrumentSlug: slug,
            page: 1,
            previousIsLoading: false,
            nextIsLoading: false,
        }

        // Custom functions.
        this.onPaginatorNextClick = this.onPaginatorNextClick.bind(this);
        this.onPaginatorPreviousClick = this.onPaginatorPreviousClick.bind(this);
        this.onNextCompletion = this.onNextCompletion.bind(this);
        this.onPreviousCompletion = this.onPreviousCompletion.bind(this);
        this.reverseData = this.reverseData.bind(this);
    }

    /**
     *  Utility function takes the data and reverses it, the reason being,
     *  because the API endpoint returns the latest to oldest and we want the
     *  graph to show from oldest to latest.
     */
    reverseData(data) {
        if (data !== undefined && data !== null) {
            const originalResults = data.results;
            if (originalResults !== undefined && originalResults !== null) {
                const reversedResults = originalResults.reverse()
                data.results = reversedResults;
                return data
            }
        }
        return null
    }

    onNextCompletion() {
        this.setState({
            nextIsLoading: false
        })
    }

    onPreviousCompletion() {
        this.setState({
            previousIsLoading: false
        })
    }

    onPaginatorNextClick() {
        const nextPage = (this.state.page + 1);
        this.setState({
            page: nextPage,
            nextIsLoading: true
        })
        this.props.pullTimeSeriesData(this.props.user, this.props.match.params.slug, nextPage, this.onNextCompletion);
    }

    onPaginatorPreviousClick() {
        const previousPage = (this.state.page - 1);
        this.setState({
            page: previousPage,
            previousIsLoading: true
        })
        this.props.pullTimeSeriesData(this.props.user, this.props.match.params.slug, previousPage, this.onPreviousCompletion);
    }

    componentDidMount() {
        this.props.pullInstrument(this.props.user, this.props.match.params.slug);
        this.props.pullTimeSeriesData(this.props.user, this.props.match.params.slug, this.state.page, function() {

        });
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // This function will call the API backend every second to get the
        // device data.
        this.timerID = setInterval(
            () => this.tick(),
            10000 // 1000 milliseconds = 1 second
        );
    } // end FUNC.

    /**
     * Function used by the event timer to call the latest data from the API
     *  backend to get the latest device data.
     */
    tick() {
        this.props.pullTimeSeriesData(this.props.user, this.props.match.params.slug, this.state.page, function() {

        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID); // Clear our timer.

        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        return (
            <InstrumentDataComponent
                user={this.props.user}
                instrument={this.props.instrument}
                timeSeriesData={this.reverseData(this.props.data)}
                onPaginatorNextClick={this.onPaginatorNextClick}
                onPaginatorPreviousClick={this.onPaginatorPreviousClick}
                nextIsLoading={this.state.nextIsLoading}
                previousIsLoading={this.state.previousIsLoading}
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
    return {
        pullInstrument: (user, instrumentSlug) => {
            dispatch(
                pullInstrument(user, instrumentSlug)
            )
        },
        pullTimeSeriesData: (user, instrumentSlug, page, completionCallback) => {
            dispatch(
                pullTimeSeriesData(user, instrumentSlug, page, completionCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentDataContainer);
