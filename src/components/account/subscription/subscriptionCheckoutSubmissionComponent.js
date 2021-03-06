import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SubscriptionCheckoutSubmissionComponent extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main" role="main">
                        <div className="row">
                            <div className="col-sm-6 mx-auto p-4 error-page">
                                <h3 className="text-center text-secondary mb-3">
                                    <i className="fa fa-server fa-5x"></i>
                                </h3>
                                <h1 className="text-center display-2 text-secondary mb-3">
                                    Submitting
                                </h1>
                                <h2 className="text-center text-secondary mb-3">Please wait...</h2>
                                <p className="text-center text-secondary lead mb-4">
                                We are currently submitting your <strong>subscription purchase</strong> order to the <strong>payment merchant</strong> for processing. Please wait until this process finishes.
                                If you are having trouble loading the page your are looking for. For immediate help, contact <Link to="mailto:support@mikaponics.com">support.</Link>
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default SubscriptionCheckoutSubmissionComponent;
