import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InvoiceRow extends Component {
    render() {
        const { invoice } = this.props;
        return (
            <tr key={invoice.slug}>
                <th scope="row">{invoice.state}</th>
                <td>{invoice.grandTotal}</td>
                <td>
                    <Link to={invoice.absoluteUrl}>View&nbsp;<i className="fas fa-chevron-right"></i>&nbsp;</Link>
                </td>
            </tr>
        )
    }
}


class InvoiceTable extends Component {
    render() {
        const { results } = this.props.dataArr;

        let elements = [];
        if (results !== undefined && results !== null) {
            const resultsLength = results.length;
            for (let i = 0; i < resultsLength; i++) {
                let invoice = results[i];
                elements.push(
                    <InvoiceRow invoice={invoice} key={invoice.slug} />
                )
            }
        }

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Status</th>
                        <th scope="col">Amount</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {elements}
                </tbody>
            </table>
        )
    }
}


class NoInvoicesJumbotron extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">
                    <i className="fas fa-bullhorn"></i>&nbsp;Attention
                </h1>
                <p className="lead">You currently do not have any invoices.</p>
                <hr className="my-4" />
                <p>You would like to purchase a device then begin by clicking below.</p>
                <p className="lead">
                    <Link className="btn btn-primary btn-lg" to="/purchase">
                        Purchase Device&nbsp;<i className="fas fa-arrow-circle-right"></i>
                    </Link>
                </p>
            </div>
        );
    }
}


class InvoiceListComponent extends Component {
    render() {
        const { dataArr } = this.props;

        let elements;
        if (dataArr !== undefined && dataArr !== null) {
            const { results } = dataArr;
            if (results.length === 0) {
                elements = <NoInvoicesJumbotron />;
            } else {
                elements = (
                    <InvoiceTable dataArr={dataArr} />
                );
            }
        }

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-book"></i>&nbsp;Invoices</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-book"></i>&nbsp;Invoices</h1>
                <div className="row">
                    <div className="col-md-12">
                        {elements}
                    </div>
                </div>
            </div>
        );
    }
}

export default InvoiceListComponent;
