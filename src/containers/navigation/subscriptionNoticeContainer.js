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
class SubscriptionNoticeContainer extends Component {
    render() {
        const user = this.props.user;
        if (user) {
            //------------------------------//
            // (1) Subscription requirement //
            //------------------------------//
            if (user.subscriptionStatus !== "active") {
                const text = <Fragment>
                    <strong><i className="fas fa-server"></i>&nbsp;Service Notice</strong> - You require a subscription to unlock certain features on this page. To unlock these features, please <Link to="/subscription" target="_blank">subscribe to our service</Link>&nbsp;<i className="fas fa-external-link-alt"></i>.
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
)(SubscriptionNoticeContainer);
