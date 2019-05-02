import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import ReferralComponent from '../../components/account/referralComponent';


class ReferralContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
        }
    }

    componentDidMount() {
        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    } // end FUNC.

    render() {
        const { referrer } = this.state;
        const { user } = this.props;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        return (
            <ReferralComponent
                user={user}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReferralContainer);
