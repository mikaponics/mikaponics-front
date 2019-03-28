import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlertListComponent from "../../components/alerts/alertListComponent";
import { pullInstrumentAlertList } from "../../actions/instrumentAlertListActions";


class AlertListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.pullInstrumentAlertList(this.props.user);
    } // end FUNC.

    render() {
        return (
            <AlertListComponent
                instrumentAlertList={this.props.instrumentAlertList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrumentAlertList: store.instrumentAlertListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInstrumentAlertList: (user) => {
            dispatch(
                pullInstrumentAlertList(user, null, 1)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertListContainer);
