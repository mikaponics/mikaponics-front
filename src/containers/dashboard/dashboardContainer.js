import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import BeginnersDashboardComponent from "../../components/dashboard/beginnersDashboardComponent";
import DashboardComponent from "../../components/dashboard/dashboardComponent";
import { pullDashboard } from "../../actions/dashboardActions";


class DashboardContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
        }
    }

    componentDidMount() {
        this.props.pullDashboard(this.props.user);
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {

        const { referrer } = this.state;
        const { dashboard } = this.props;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        // CASE 1 OF 3: ERROR.
        if (dashboard.devices === undefined || dashboard.devices === null) {
            return null;
        }

        // CASE 2 OF 3: NO DEVICES.
        if (dashboard.devices.length === 0) {
            return (
                <BeginnersDashboardComponent user={this.props.user} />
            );

        // CASE 3 OF 3: HAS DEVICES.
        } else {
            return (
                <DashboardComponent
                    dashboard={dashboard}
                    user={this.props.user}
                />
            );
        }
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        dashboard: store.dashboardState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullDashboard: (user) => {
            dispatch(pullDashboard(user))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
