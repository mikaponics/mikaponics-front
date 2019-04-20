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


class InvoiceListComponent extends Component {
    render() {
        const { dataArr } = this.props;
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
                        <h3>Table</h3>
                        <InvoiceTable dataArr={dataArr} />
                    </div>
                </div>
            </div>
        );
    }
}

export default InvoiceListComponent;
