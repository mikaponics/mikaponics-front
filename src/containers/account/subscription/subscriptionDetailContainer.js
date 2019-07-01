import React, { Component } from "react";
import { connect } from 'react-redux';

import SubscriptionDetailComponent from "../../../components/account/subscription/subscriptionDetailComponent";


class SubscriptionDetailContainer extends Component {
    render() {
        return(
            <SubscriptionDetailComponent
                user={this.props.user}
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
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionDetailContainer);
