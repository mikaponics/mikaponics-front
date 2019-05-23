import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';


class TaskItemDetailComponent extends Component {
    render() {
        const { taskDetail, user, onClick, isLoading } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <Link to="/tasks"><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-tasks"></i>&nbsp;Task
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-tasks"></i>&nbsp;Task</h1>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light"><i className="fas fa-tasks"></i>&nbsp;Task Details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Title</th>
                                    <td>
                                        {taskDetail.title}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>
                                        {taskDetail.description}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Due Date</th>
                                    <td>
                                        <Moment tz={user.timezone} format="YYYY/MM/DD hh:mm:ss a">
                                            {taskDetail.dueDate}
                                        </Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Link</th>
                                    <td>
                                        {taskDetail.link &&
                                            <Link to={taskDetail.link} target="_blank">
                                                View&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        }
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>



                <br />
                <Link to="/tasks" className="btn btn-secondary btn-lg float-left">
                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                </Link>
                <button className="btn btn-success btn-lg float-right" onClick={onClick} disabled={isLoading}>
                    <i className="fas fa-check"></i>&nbsp;Close Task
                </button>

            </div>
        );
    }
}

export default TaskItemDetailComponent;
