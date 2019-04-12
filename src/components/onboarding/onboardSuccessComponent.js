import React, { Component } from 'react';


class OnboardSuccessComponent extends Component {
    render() {
        return (
            <div className="Onboarding-Greetings">
                <div className="row">
                    <div className="col-sm-12">

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-check"></i>&nbsp;Success</h1>
                            <p className="lead">Your order has been placed.</p>
                            <hr className="my-4" />
                            <p>Please check your email periodically to get the latest information about your shipment.</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


export default OnboardSuccessComponent
