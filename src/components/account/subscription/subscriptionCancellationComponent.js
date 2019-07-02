import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class SubscriptionCancellationComponent extends Component {
    render() {
        return (
            <div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/subscription"><i className="fas fa-gem"></i>&nbsp;Subscription</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-times"></i>&nbsp;Cancel Subscription</li>
                    </ol>
                </nav>

                <div className="Onboarding-Greetings">
                    <div className="row">
                        <div className="col-sm-12">

                            <div className="jumbotron">
                                <h1 className="display-4">
                                    <i className="fas fa-exclamation-triangle"></i>&nbsp;Are you sure?
                                </h1>
                                <p className="lead">You will lose access to various functionality and features on the site if you proceed.</p>

                                <p className="lead">

                                    <Link to="/subscription" className="btn btn-lg float-left pl-4 pr-4 btn-secondary">
                                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                    </Link>
                                    &nbsp;
                                    <button type="text" className="btn btn-danger btn-lg" onClick={null}>
                                        <i className="fas fa-check-circle"></i>&nbsp;I understand and request cancellation
                                    </button>
                                </p>
                            </div>

                            <div className="form-group">
                            { /* back button */ }
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
