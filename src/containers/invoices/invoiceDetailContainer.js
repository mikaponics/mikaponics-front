import React, { Component } from 'react';
import { connect } from 'react-redux';

import InvoiceDetailComponent from "../../components/invoices/invoiceDetailComponent";
// import { pullInvoiceList } from "../../actions/invoiceActions";


class InvoiceDetailContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            invoiceSlug: null
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        // this.props.pullInvoiceList(this.props.user, this.state.pageIndex);
    } // end FUNC.

    render() {
        return (
            <InvoiceDetailComponent
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        // invoiceList: store.invoiceListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // pullInvoiceList: (user, pageIndex) => {
        //     dispatch(
        //         pullInvoiceList(user, pageIndex)
        //     )
        // },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceDetailContainer);
