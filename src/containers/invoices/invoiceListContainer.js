import React, { Component } from 'react';
import { connect } from 'react-redux';

import InvoiceListComponent from "../../components/invoices/invoiceListComponent";
// import { pullInstrument } from "../../actions/instrumentActions";


class InvoiceListContainer extends Component {
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
        // this.props.pullInstrument(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    render() {
        return (
            <InvoiceListComponent
                instrument={this.props.instrument}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        // instrument: store.instrumentState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // pullInstrument: (user, instrumentSlug) => {
        //     dispatch(
        //         pullInstrument(user, instrumentSlug)
        //     )
        // },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceListContainer);
