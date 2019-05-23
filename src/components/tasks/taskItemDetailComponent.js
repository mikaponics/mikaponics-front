import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';


class TaskItemDetailComponent extends Component {
    render() {
        const { taskDetail } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <Link to="/tasks"><i className="fas fa-bell"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-bell"></i>&nbsp;Task
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-bell"></i>&nbsp;Task</h1>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light"><i className="fas fa-bell"></i>&nbsp;Task Details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Device</th>
                                    <td>
                                        {taskDetail.deviceAbsoluteUrl &&
                                            <Link to={taskDetail.deviceAbsoluteUrl} target="_blank">
                                                {taskDetail.deviceName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        }

                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Instrument</th>
                                    <td>
                                    {taskDetail.instrumentAbsoluteUrl &&
                                        <Link to={taskDetail.instrumentAbsoluteUrl} target="_blank">
                                            {taskDetail.instrumentType}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Value</th>
                                    <td>
                                        {taskDetail.value && parseFloat(taskDetail.value).toFixed(2)}&nbsp;
                                        {taskDetail.instrumentUnitOfMeasure}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Timestamp</th>
                                    <td>
                                        <Moment tz={taskDetail.deviceTimezone} format="YYYY/MM/DD hh:mm:ss a">
                                            {taskDetail.timestamp}
                                        </Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Condition</th>
                                    <td>{taskDetail.prettyCondition}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="form-group col-md-12 mb-3 mx-auto text-center">
                    <Link className="btn btn-primary btn-lg btn-fxw mt-4" type="button" to='/tasks'>
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>

            </div>
        );
    }
}

export default TaskItemDetailComponent;
