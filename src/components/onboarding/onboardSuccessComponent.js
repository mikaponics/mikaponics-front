import React, { Component } from 'react';
import { Link } from "react-router-dom";


class OnboardSuccessComponent extends Component {
    render() {
        return (
            <div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/onboard">
                                <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-check"></i>&nbsp;Success
                        </li>
                    </ol>
                </nav>


                <div className="Onboarding-Greetings">
                    <div className="row">
                        <div className="col-sm-12">

                            <div className="jumbotron">
                                <h1 className="display-4">
                                    <i className="fas fa-check"></i>&nbsp;Success
                                </h1>
                                <p className="lead">Your order has been placed.</p>
                                <hr className="my-4" />
                                <p>Please check your email periodically to get the latest information about your shipment.</p>
                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" to="/onboard">
                                        Finish&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                    </Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default OnboardSuccessComponent
