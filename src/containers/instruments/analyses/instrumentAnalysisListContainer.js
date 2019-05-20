import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentAnalysisListComponent from "../../../components/instruments/analyses/instrumentAnalysisListComponent";
import { setClearInstrumentAnalysisCreate } from "../../../actions/instrumentAnalysisCreateActions";
import { pullInstrumentAnalysisList } from "../../../actions/instrumentAnalysisListActions";


class InstrumentReportContainer extends Component {
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
        this.props.pullInstrumentAnalysisList(
            this.props.user,
            this.props.match.params.slug,
            1
        );
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    componentWillUnmount() {
        this.props.setClearInstrumentAnalysisCreate();
        this.setState({});
    }


    render() {
        return (
            <InstrumentAnalysisListComponent
                instrument={this.props.instrument}
                instrumentAnalysisList={this.props.instrumentAnalysisList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
        instrumentAnalysisList: store.instrumentAnalysisListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInstrumentAnalysisList: (user, instrumentSlug, pageIndex) => {
            dispatch(
                pullInstrumentAnalysisList(user, instrumentSlug, pageIndex)
            )
        },
        setClearInstrumentAnalysisCreate: () => {
            dispatch(
                setClearInstrumentAnalysisCreate()
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentReportContainer);
