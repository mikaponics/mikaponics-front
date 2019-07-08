import React, { Component } from 'react';
import { Link } from "react-router-dom";

import SubscriptionNoticeContainer from '../../../containers/navigation/subscriptionNoticeContainer';
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";


class DeviceCreateStep2IntegrateComponent extends Component {
    render() {
        const {
            user, errors, isLoading, instruments, instrumentOptions, onMultiChange, onNextClick
        } = this.props;
        const isSubscribed = user.subscriptionStatus === "active";
        return (
            <div>
                <SubscriptionNoticeContainer />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/devices"><i className="fas fa-cubes"></i>&nbsp;Devices</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"></i>&nbsp;Add</li>
                    </ol>
                </nav>
                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Device
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <span className="num">1.</span><span className="">Pick Instruments</span>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Review</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">TODO</span>
                        </div>
                    </div>
                </div>

                <h2 className="pt-4 pb-2 text-center"><i className="fas fa-microchip"></i>&nbsp;Pick Instruments</h2>
                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form className="needs-validation" noValidate>
                            <p>To begin, please follow the instructions.</p>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">General Information</p>

                            <BootstrapMultipleSelect
                                borderColour="border-primary"
                                label="Instruments"
                                name="instruments"
                                defaultOptionLabel="Please select the instruments."
                                options={instrumentOptions}
                                selectedOptions={instruments}
                                error={errors.instruments}
                                onMultiChange={onMultiChange}
                            />

                            <br />

                            <div className="form-group">
                                <Link to="/devices/create/step-1" className="btn btn-lg float-left pl-4 pr-4 btn-secondary">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                                <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-primary" disabled={isLoading} onClick={onNextClick}>
                                    Proceed to Review&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>


            </div>
        );
    }
}

export default DeviceCreateStep2IntegrateComponent;
