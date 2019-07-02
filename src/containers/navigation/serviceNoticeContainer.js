import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { BootstrapAlert } from "../../components/bootstrap/bootstrapAlert";


/**
 *  Container will add top banner notification accross all pages depending on
 *  the type of notice to display. This container currently supports the
 *  following notices:
 *
 *  (1) Subscription requirement - If authenticated user has not subscribed to
 *                                 our system then display a friendly message
 *                                 reminding them to subscribe.
 */
class ServiceNoticeContainer extends Component {
    render() {
        const user = this.props.user;

        // const yourArray = ['/productions',]
        // let notIgnorePath = yourArray.indexOf(this.props.location.pathname) > -1;
        // console.log(">>>>>", notIgnorePath);

        if (user) {
            //------------------------------//
            // (1) Subscription requirement //
            //------------------------------//
            if (user.subscriptionStatus !== "active") {
                const text = <Fragment>
                    <strong><i className="fas fa-server"></i>&nbsp;Service Notice</strong> - Please note a subscription is required. To subscribe to the service, please <Link to="/subscription" target="_blank">clicking here&nbsp;<i className="fas fa-external-link-alt"></i></Link>.
                </Fragment>;
                return (
                    <BootstrapAlert type="info" value={text} />
                )
            }
        }
        return null;
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceNoticeContainer);
