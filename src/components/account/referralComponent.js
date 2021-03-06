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

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/profile">
                                <span className="num"><i className="fas fa-user-circle"></i></span><span className="">Profile</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/invoices">
                                <span className="num"><i className="fas fa-receipt"></i></span><span className="">Invoices</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/subscription">
                                <span className="num"><i className="fas fa-gem"></i></span><span className="">Subscription</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/applications">
                                <span className="num"><i className="fas fa-server"></i></span><span className="">Applications</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey active">
                            <span className="num"><i className="fas fa-heart"></i></span><span className="">Referrals</span>
                        </div>
                    </div>
                </div>

                <div className="jumbotron">
                    <h1 className="display-4">
                        <i className="fas fa-heart"></i>&nbsp;Referrals
                    </h1>
                    <p className="lead">Everyone you refer gets <strong>$5 in credit</strong> on their next device purchase. You'll get <strong>$10 in credit</strong> towards your next device purchase. There is no limit to the amount of credit you can earn through referrals.</p>
                    <hr className="my-4" />
                    <p>Copy your personal referral link and share it with your friends and followers.</p>
                    <p className="lead">

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
