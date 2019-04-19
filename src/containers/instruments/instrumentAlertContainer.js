import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentAlertComponent from "../../components/instruments/instrumentAlertComponent";
import { pullInstrumentAlertList } from "../../actions/instrumentAlertListActions";
import { clearFlashMessage } from "../../actions/flashMessageActions";


class InstrumentAlertContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            instrumentSlug: slug,
        }
    }

    componentDidMount() {
        this.props.pullInstrumentAlertList(this.props.user, this.props.match.params.slug);
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
        this.props.pullInstrumentAlertList(this.props.user, this.props.match.params.slug);
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(); // Clear the messages.

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
            <InstrumentAlertComponent
                instrument={this.props.instrument}
                flashMessage={this.props.flashMessage}
                dataList={this.props.instrumentAlertList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
        instrumentAlertList: store.instrumentAlertListState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInstrumentAlertList: (user, instrumentSlug) => {
            dispatch(
                pullInstrumentAlertList(user, instrumentSlug)
            )
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentAlertContainer);
