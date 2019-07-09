import React, { Component } from 'react';
import { Link } from "react-router-dom";

import SubscriptionNoticeContainer from '../../../containers/navigation/subscriptionNoticeContainer';


class DeviceCreateStep1Component extends Component {
    render() {
        const { user, onPurchaseDeviceClick, onAuthorizeDeviceClick } = this.props;
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
                <h2><i className="fas fa-sitemap"></i>&nbsp;Select Method</h2>
                <div className="card-group row">

                    <div className="col-sm-6" key="purchase-device">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-shopping-cart fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Purchase</h3>
                                <p className="card-text">Click here if you would like to buy a ready-made device from us. We will take care of the hardware and software.</p>
                                <button className="btn btn-success btn-lg" onClick={onPurchaseDeviceClick}>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6" key="register-device">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-key fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Authorize</h3>
                                <p className="card-text">Click here if you already have the IoT device and you would like to integrate it with our software. By clicking here, you will be granted <strong>oAuth 2.0 access credentials</strong> which your device will use to make API calls with our web-service; furthermore, if you build one of our <a href="https://github.com/mikaponics" target="_blank">open-source devices&nbsp;<i className="fas fa-external-link-alt"></i></a>, click here to integrate it with out system.</p>
                                {isSubscribed
                                    ? <button className="btn btn-success btn-lg" onClick={onAuthorizeDeviceClick}>
                                        Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                    </button>
                                    : <button className="btn btn-success btn-lg" disabled={true}>
                                        <strong><i className="fas fa-lock"></i>&nbsp;Locked</strong>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default DeviceCreateStep1Component;
