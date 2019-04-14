import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentAlertDetailComponent from "../../components/instruments/instrumentAlertDetailComponent";
import { pullInstrumentAlertDetail } from "../../actions/instrumentAlertDetailActions";


class InstrumentAlertDetailContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            alertSlug: slug
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullInstrumentAlertDetail(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    render() {
        return (
            <InstrumentAlertDetailComponent
               alertDetail={this.props.alertDetail}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        alertDetail: store.instrumentAlertDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInstrumentAlertDetail: (user, alertSlug) => {
            dispatch(
                pullInstrumentAlertDetail(user, alertSlug)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentAlertDetailContainer);
