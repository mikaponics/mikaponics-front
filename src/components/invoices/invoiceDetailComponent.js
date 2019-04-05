import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InvoiceDetailComponent extends Component {
    render() {
        const { invoiceDetail } = this.props;

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/invoices">Invoices</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Invoices</li>
                    </ol>
                </nav>
                <h1>Invoice</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <h2>Financing</h2>
                        <p>Total before tax: {invoiceDetail.totalBeforeTax}</p>
                        <p>Tax: {invoiceDetail.tax}</p>
                        <p>Total after tax: {invoiceDetail.totalAfterTax}</p>
                        <p>Shipping: {invoiceDetail.shipping}</p>
                        <p>Credit: {invoiceDetail.credit}</p>
                        <p>Grand total: {invoiceDetail.grandTotal}</p>
                        <h2>Billing</h2>
                        <p>Given name: {invoiceDetail.billingGivenName}</p>
                        <p>Last name: {invoiceDetail.billingLastName}</p>
                        <p>Country: {invoiceDetail.billingCountry}</p>
                        <p>Region: {invoiceDetail.billingRegion}</p>
                        <p>Locality: {invoiceDetail.billingLocality}</p>
                        <p>Street Address: {invoiceDetail.billingStreetAddress}</p>
                        <p>Postal: {invoiceDetail.billingPostalCode}</p>
                        <p>Email: {invoiceDetail.billingEmail}</p>
                        <p>Telephone: {invoiceDetail.billingTelephone}</p>
                        <h2>Shipping</h2>
                        <p>Given name: {invoiceDetail.shippingGivenName}</p>
                        <p>Last name: {invoiceDetail.shippingLastName}</p>
                        <p>Country: {invoiceDetail.shippingCountry}</p>
                        <p>Region: {invoiceDetail.shippingRegion}</p>
                        <p>Locality: {invoiceDetail.shippingLocality}</p>
                        <p>Street Address: {invoiceDetail.shippingStreetAddress}</p>
                        <p>Street Address (Extra): {invoiceDetail.shippingStreetAddressExtra}</p>
                        <p>Postal: {invoiceDetail.shippingPostalCode}</p>
                        <p>Post Office Box #: {invoiceDetail.shippingPostOfficeBoxNumber}</p>
                        <p>Email: {invoiceDetail.shippingEmail}</p>
                        <p>Telephone: {invoiceDetail.shippingTelephone}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InvoiceDetailComponent;
