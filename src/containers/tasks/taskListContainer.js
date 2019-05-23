import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskListComponent from "../../components/tasks/taskListComponent";
import { pullTaskItemList } from "../../actions/taskItemListActions";


class TaskListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.pullTaskItemList(this.props.user, 1);
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
        this.props.pullTaskItemList(this.props.user, 1);
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
            <TaskListComponent
                user={this.props.user}
                taskItemList={this.props.taskItemList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        taskItemList: store.taskItemListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullTaskItemList: (user, page, filtersMap) => {
            dispatch(
                pullTaskItemList(user, page, filtersMap)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListContainer);
