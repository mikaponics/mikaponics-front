import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import classnames from 'classnames';
import 'moment-timezone';

import { TASK_ITEM_UNREAD_STATE } from "../../constants/api";


class TaskItemTable extends Component {
    render() {
        let elements = [];
        const { results } = this.props.dataList;
        if (results === undefined || results === null) { // Defensive code.
            return null;
        }
        const dataLength = results.length;
        for (let i = 0; i < dataLength; i++) {
            let taskItem = results[i];
            let isUnread = false;
            let stateText = taskItem.isClosed ? "Closed" : "Open";
            elements.push(
                <tr key={taskItem.createdAt} className={classnames('', { 'table-danger': isUnread })}>
                    <th scope="row">{stateText}</th>
                    <td>
                        {taskItem.prettyTypeOf}
                    </td>
                    <td>
                        <Moment tz={taskItem.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                            {taskItem.dueDate}
                        </Moment>
                    </td>
                    <td>
                        <Link to={`/task-start/${taskItem.slug}`}>
                            View&nbsp;<i className="fas fa-chevron-right"></i>
                        </Link>
                    </td>
                </tr>
            );
        }
        return (
            <div className="table-responsive">
                <h3>List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">State</th>
                            <th scope="col">Type</th>
                            <th scope="col">Due Date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements}
                    </tbody>
                </table>
            </div>
        )
    }
}

class NoTasksJumbotron extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">
                    <i className="fas fa-bullhorn"></i>&nbsp;Attention
                </h1>
                <p className="lead">You currently do not have any tasks at the moment, please check back periodically to see if any tasks get generated by the system.</p>
            </div>
        );
    }
}


class TaskListComponent extends Component {
    render() {
        const { user, taskItemList } = this.props;

        let elements;
        if (taskItemList !== undefined && taskItemList !== null) {
            const { results } = taskItemList;
            if (results !== undefined && results !== null) {
                if (results.length === 0) {
                    elements = <NoTasksJumbotron />;
                } else {
                    elements = (
                        <TaskItemTable dataList={taskItemList} user={user} />
                    );
                }
            }
        }

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-tasks"></i>&nbsp;Tasks
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-tasks"></i>&nbsp;Tasks</h1>
                <div className="row">
                    <div className="col-md-12">
                        {elements}
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskListComponent;
