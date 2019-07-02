import React, { Component } from 'react';
import { Link } from "react-router-dom";


class SubscriptionCheckoutSuccessComponent extends Component {
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
                                <p className="lead">You have been subscribed! Your first bill will arrive on the first of next month.</p>

                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" to="/subscription">
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


export default SubscriptionCheckoutSuccessComponent
