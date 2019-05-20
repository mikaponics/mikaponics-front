import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentAnalysisDetailComponent from "../../../components/instruments/analyses/instrumentAnalysisDetailComponent";
import { pullInstrumentAnalysisDetail } from "../../../actions/instrumentAnalysisDetailActions";
import { setClearInstrumentAnalysisCreate } from "../../../actions/instrumentAnalysisCreateActions";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


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

    componentWillUnmount() {
        this.props.setClearInstrumentAnalysisCreate();
        this.props.clearFlashMessage();
        this.setState({});
    }

    render() {
        return (
            <InstrumentAnalysisDetailComponent
                instrument={this.props.instrument}
                detail={this.props.instrumentAnalysisDetail}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
        instrumentAnalysisDetail: store.instrumentAnalysisDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInstrumentAnalysisDetail: (user, instrumentSlug) => {
            dispatch(
                pullInstrumentAnalysisDetail(user, instrumentSlug)
            )
        },
        setClearInstrumentAnalysisCreate: () => {
            dispatch(setClearInstrumentAnalysisCreate())
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentAnalysisDetailContainer);
