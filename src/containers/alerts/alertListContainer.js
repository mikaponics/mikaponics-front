import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlertListComponent from "../../components/alerts/alertListComponent";
import { pullInstrumentAlertList } from "../../actions/instrumentAlertListActions";


class AlertListContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            instrumentSlug: slug,
        }
    }

    componentDidMount() {
        this.props.pullInstrumentAlertList(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    render() {
        return (
            <AlertListComponent
                instrument={this.props.instrument}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
        instrumentAlertList: store.instrumentAlertListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInstrumentAlertList: (user, instrumentSlug) => {
            dispatch(
                pullInstrumentAlertList(user, instrumentSlug, 1)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertListContainer);
