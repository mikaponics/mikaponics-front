import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInputGroup } from '../bootstrap/bootstrapInputGroup'


class ReferralComponent extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-heart"></i>&nbsp;Referrals</li>
                    </ol>
                </nav>

                <div className="jumbotron">
                    <h1 className="display-4">
                        <i className="fas fa-heart"></i>&nbsp;Referrals
                    </h1>
                    <p className="lead">Everyone you refer gets $5 in credit on their next device purchase. You'll get $10 in credit towards your next device purchase. There is no limit to the amount of credit you can earn through referrals.</p>
                    <hr className="my-4" />
                    <p>Copy your personal referral link and share it with your friends and followers.</p>
                    <p className="lead">

{ /*
                        <div className="form-row">
                            <div className="form-group col-md-12 mb-4">
                                <label htmlFor="firstname">First name</label>
                                <input type="text" className="form-control form-control-lg border border-primary" id="firstname"
                                    name="firstname" placeholder="First name" minLength="3" required />
                            </div>
                        </div>

*/ }

                        <BootstrapInputGroup
                            layoutSize="large"
                            labelIconClassName="fa fa-link color-blue"
                            name="referralLink"
                            type="referralLink"
                            placeholder="Referral Code"
                            value={user.referralLink}
                        />

                    </p>
                </div>
            </div>
        );
    }
}


export default ReferralComponent;
