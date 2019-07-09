import React, { Component } from 'react';
import { Link } from "react-router-dom";
import shortid from "shortid";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";


export default class ApplicationCreateSuccessComponent extends Component {
    render() {
        const { user, name, description, clientId, clientSecret } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/applications">
                                <i className="fas fa-server"></i>&nbsp;Applications
                            </Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-check-circle"></i>&nbsp;Created
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-check-circle"></i>&nbsp;Application Created
                </h1>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <p><strong>Please make a copy of these credentials before leaving the page.</strong></p>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;Application
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client ID</th>
                                    <td><i>{clientId}</i></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Secret</th>
                                    <td><i>{clientSecret}</i></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group">
                            <Link to="/applications" className="btn btn-lg float-left pl-4 pr-4 btn-primary">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back to Applications
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}
