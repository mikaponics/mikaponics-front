import React, { Component } from 'react';
import { connect } from 'react-redux';

import InvoiceDetailComponent from "../../components/invoices/invoiceDetailComponent";
import { pullInvoiceDetail } from "../../actions/invoiceDetailActions";


class InvoiceDetailContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            invoiceSlug: slug
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullInvoiceDetail(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    render() {
        return (
            <InvoiceDetailComponent
               invoiceDetail={this.props.invoiceDetail}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        invoiceDetail: store.invoiceDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullInvoiceDetail: (user, invoiceSlug) => {
            dispatch(
                pullInvoiceDetail(user, invoiceSlug)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceDetailContainer);
