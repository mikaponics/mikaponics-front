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
        }

        // Custom functions.
        this.onPaginatorNextClick = this.onPaginatorNextClick.bind(this);
        this.onPaginatorPreviousClick = this.onPaginatorPreviousClick.bind(this);
    }

    onPaginatorNextClick() {
        const nextPage = (this.state.page + 1);
        this.setState({
            page: nextPage
        })
        this.props.pullTimeSeriesData(this.props.user, this.props.match.params.slug, nextPage);
    }

    onPaginatorPreviousClick() {
        const previousPage = (this.state.page - 1);
        this.setState({
            page: previousPage
        })
        this.props.pullTimeSeriesData(this.props.user, this.props.match.params.slug, previousPage);
    }

    componentDidMount() {
        this.props.pullInstrument(this.props.user, this.props.match.params.slug);
        this.props.pullTimeSeriesData(this.props.user, this.props.match.params.slug, this.state.page);
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
        this.props.pullTimeSeriesData(this.props.user, this.props.match.params.slug, this.state.page);
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
                timeSeriesData={this.props.data}
                onPaginatorNextClick={this.onPaginatorNextClick}
                onPaginatorPreviousClick={this.onPaginatorPreviousClick}
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
        pullTimeSeriesData: (user, instrumentSlug, page) => {
            dispatch(
                pullTimeSeriesData(user, instrumentSlug, page)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentDataContainer);
