import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class DeviceCreateStep5PurchaseSuccessComponent extends Component {
    render() {
        const { invoiceSlug } = this.props;
        return (
            <div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/devices"><i className="fas fa-cubes"></i>&nbsp;Devices</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page"><i className="fas fa-plus"></i>&nbsp;Add (Purchase)</li>
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
                                <p>To view your receipt, pleace click below.</p>
                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" to={`/invoice/${invoiceSlug}`}>
                                        View Receipt&nbsp;<i className="fas fa-arrow-circle-right"></i>
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
