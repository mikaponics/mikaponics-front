import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { ACTIVE_SUBSCRIPTION_STATUS } from "../constants/api";

export default function (ComposedComponent) {
    class Subscription extends React.Component {
        render() {
            const { user } = this.props;

            // Generate the 404 description text based on whether the user was
            // authenticated or is anonymous.
            let element;
            if (user !== null && user !== undefined) {
                const keysArr = Object.keys(user);
                const count = keysArr.length;
                if (count > 0) {
                   element = <AuthenticatedMessage user={user} />
                }
            }

            // // CASE 1 OF 2:
            // RENDER AN ERROR MESSAGE.
            if (this.props.user.subscriptionStatus !== ACTIVE_SUBSCRIPTION_STATUS) {
                return (
                    <div className="container-fluid">
                        <div className="d-flex align-items-stretch">
                            <main id="main" role="main">
                                <div className="row">
                                    <div className="col-sm-6 mx-auto p-4">
                                        <h3 className="text-center text-secondary mb-3"><i className="far fa-times-circle fa-5x"></i></h3>
                                        <h1 className="text-center display-2 text-secondary mb-3">Missing Subscription</h1>
                                        <h2 className="text-center text-secondary mb-3">Page Locked</h2>
                                        {element}
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                );

            // CASE 2 OF 2:
            // ELSE RENDER THE CURRENT COMPONENT.
            } else {
                return (
                    <div>
                        <ComposedComponent {...this.props} />
                    </div>
                );
            }

        }
    } // end of CLASS.

    const mapStateToProps = function(store) {
        return {
            user: store.userState,
        };
    }

    const mapDispatchToProps = dispatch => {
        return {}
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Subscription);

} // end of HOC.


class AuthenticatedMessage extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <p className="text-center text-secondary lead mb-4">Unfortunately we are having trouble loading the page because you are not subscribed with our service. You can return to your <Link to="/dashboard">dashboard</Link>. For immediate help, contact  <a href="mailto:support@mikaponics.com">support.</a></p>
                <br />
                <h4>Phone: <a href="tel:2262351368">(226) 235-1368</a></h4>
                <h4>E-Mail: <a href="mailto:support@mikaponics.com">support@mikaponics.com</a></h4>
                <br />
                <br />
                <p className="text-center">
                <Link className="btn btn-primary btn-lg" to="/dashboard" role="button">Back to Dashboard</Link>
                </p>
            </div>
        );
    }
}
