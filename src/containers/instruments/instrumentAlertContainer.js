import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentAlertComponent from "../../components/instruments/instrumentAlertComponent";
import { pullInstrumentAlertList } from "../../actions/instrumentAlertListActions";
import { clearFlashMessage } from "../../actions/flashMessageActions";


class InstrumentAlertContainer extends Component {
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

    componentWillUnmount() {
        this.props.clearFlashMessage();
    }

    render() {
        return (
            <InstrumentAlertComponent
                instrument={this.props.instrument}
                flashMessage={this.props.flashMessage}
                dataList={this.props.instrumentAlertList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
        instrumentAlertList: store.instrumentAlertListState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInstrumentAlertList: (user, instrumentSlug) => {
            dispatch(
                pullInstrumentAlertList(user, instrumentSlug)
            )
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentAlertContainer);
