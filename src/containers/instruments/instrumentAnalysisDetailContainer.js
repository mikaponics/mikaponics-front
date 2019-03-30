import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentAnalysisDetailComponent from "../../components/instruments/instrumentAnalysisDetailComponent";
import { pullInstrumentAnalysisDetail } from "../../actions/instrumentAnalysisDetailActions";


class InstrumentAnalysisDetailContainer extends Component {
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
        this.props.pullInstrumentAnalysisDetail(
            this.props.user,
            this.props.match.params.slug,
            1
        );
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    render() {
        return (
            <InstrumentAnalysisDetailComponent
                instrument={this.props.instrument}
                instrumentAnalysisDetail={this.props.instrumentAnalysisDetail}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
        instrumentAnalysisDetail: store.instrumentAnalysisDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInstrumentAnalysisDetail: (user, instrumentSlug) => {
            dispatch(
                pullInstrumentAnalysisDetail(user, instrumentSlug)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentAnalysisDetailContainer);
