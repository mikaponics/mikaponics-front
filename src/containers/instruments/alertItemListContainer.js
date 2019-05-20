import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlertItemListComponent from "../../components/instruments/alertItemListComponent";
import { pullAlertItemList } from "../../actions/alertItemListActions";
import { clearFlashMessage } from "../../actions/flashMessageActions";


class InstrumentAlertItemContainer extends Component {
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
        var filtersMap = new Map()
        filtersMap.set('instrumentSlug', this.props.match.params.slug)
        this.props.pullAlertItemList(this.props.user, 1, filtersMap);
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
        var filtersMap = new Map()
        filtersMap.set('instrumentSlug', this.props.match.params.slug)
        this.props.pullAlertItemList(this.props.user, 1, filtersMap);
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
            <AlertItemListComponent
                instrument={this.props.instrument}
                flashMessage={this.props.flashMessage}
                dataList={this.props.alertItemList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
        alertItemList: store.alertItemListState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullAlertItemList: (user, page, filtersMap) => {
            dispatch(
                pullAlertItemList(user, page, filtersMap)
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
)(InstrumentAlertItemContainer);
