import React, { Component } from 'react';
import { Link } from "react-router-dom";


class DeviceCreateStep3IntegrateComponent extends Component {
    render() {
        const { user } = this.props;
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
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"></i>&nbsp;Add</li>
                    </ol>
                </nav>
                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Device
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/devices/create/step-2-integrate">
                                <span className="num">1.</span><span className="">Pick Instruments</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <span className="num">2.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <p><strong>Please confirm these details before submitting your device creation request.</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-address-card"></i>&nbsp;Billing Details
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        );
    }
}

export default DeviceCreateStep3IntegrateComponent;
