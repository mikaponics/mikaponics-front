import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InvoiceDetailComponent extends Component {
    render() {
        const { dataArr } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li class="breadcrumb-item">
                           <Link to="/invoices">Invoices</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Invoices</li>
                    </ol>
                </nav>
                <h1>Invoice</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default InvoiceDetailComponent;
