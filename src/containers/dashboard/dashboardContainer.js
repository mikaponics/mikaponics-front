import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import DashboardComponent from "../../components/dashboard/dashboardComponent";


class DashboardContainer extends Component {
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

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        return (
            <DashboardComponent />
        );
    }
}

const mapStateToProps = function(store) {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
