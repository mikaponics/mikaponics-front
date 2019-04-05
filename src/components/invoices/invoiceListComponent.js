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
                    <Link to={invoice.absoluteUrl}>View ></Link>
                </td>
            </tr>
        )
    }
}


class InvoiceTable extends Component {
    render() {
        const { results } = this.props.dataArr;

        let elements = [];
        const resultsLength = results.length;
        for (let i = 0; i < resultsLength; i++) {
            let invoice = results[i];
            elements.push(
                <InvoiceRow invoice={invoice} />
            )
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
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Invoices</li>
                    </ol>
                </nav>
                <h1>Invoices</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <InvoiceTable dataArr={dataArr} />
                    </div>
                </div>
            </div>
        );
    }
}

export default InvoiceListComponent;
