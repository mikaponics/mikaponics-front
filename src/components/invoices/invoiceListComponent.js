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
            if (results !== undefined && results !== null) {
                if (results.length === 0) {
                    elements = <NoInvoicesJumbotron />;
                } else {
                    elements = (
                        <InvoiceTable dataArr={dataArr} />
                    );
                }
            }
        }

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-receipt"></i>&nbsp;Invoices</li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/profile">
                                <span className="num"><i className="fas fa-user-circle"></i></span><span className="">Profile</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <span className="num"><i className="fas fa-receipt"></i></span><span className="">Invoices</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/subscription">
                                <span className="num"><i className="fas fa-gem"></i></span><span className="">Subscription</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/referrals">
                                <span className="num"><i className="fas fa-heart"></i></span><span className="">Referrals</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <h1><i className="fas fa-receipt"></i>&nbsp;Invoices</h1>
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
