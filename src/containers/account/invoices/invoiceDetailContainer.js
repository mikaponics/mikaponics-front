import React, { Component } from 'react';
import { connect } from 'react-redux';

import InvoiceDetailComponent from "../../../components/account/invoices/invoiceDetailComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullInvoiceDetail } from "../../../actions/invoiceDetailActions";


class InvoiceDetailContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            invoiceSlug: slug
        }

        this.onPrintClick = this.onPrintClick.bind(this)
    }

    onPrintClick() {
        window.print();
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullInvoiceDetail(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    componentWillUnmount() {
        this.props.clearFlashMessage(); // Clear the messages.

        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        // console.log(this.props.invoiceDetail); // For debugging purposes only.
        return (
            <InvoiceDetailComponent
               invoiceDetail={this.props.invoiceDetail}
               flashMessage={this.props.flashMessage}
               onPrintClick={this.onPrintClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        invoiceDetail: store.invoiceDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
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
