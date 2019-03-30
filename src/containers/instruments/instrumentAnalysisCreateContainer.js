import React, { Component } from 'react';
import { connect } from 'react-redux';

import InstrumentAnalysisCreateComponent from "../../components/instruments/instrumentAnalysisCreateComponent";
import { postInstrumentAnalysisCreate } from "../../actions/instrumentAnalysisCreateActions";


class InstrumentAnalysisCreateContainer extends Component {
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
        this.props.postInstrumentAnalysisCreate(
            this.props.user,
            this.props.match.params.slug,
            {

            }
        );
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    render() {
        return (
            <InstrumentAnalysisCreateComponent
                instrument={this.props.instrument}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        instrument: store.instrumentState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postInstrumentAnalysisCreate: (user, instrumentSlug, data) => {
            dispatch(
                postInstrumentAnalysisCreate(user, instrumentSlug, data)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstrumentAnalysisCreateContainer);
