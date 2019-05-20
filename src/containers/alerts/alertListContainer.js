import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlertListComponent from "../../components/alerts/alertListComponent";
import { pullAlertItemList } from "../../actions/alertItemListActions";


class AlertListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.pullAlertItemList(this.props.user, 1);
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
        this.props.pullAlertItemList(this.props.user, 1);
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
            <AlertListComponent
                alertItemList={this.props.alertItemList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        alertItemList: store.alertItemListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullAlertItemList: (user, page, filtersMap) => {
            dispatch(
                pullAlertItemList(user, page, filtersMap)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertListContainer);
