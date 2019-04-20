import React, { Component } from 'react';
import { Link } from "react-router-dom";


// <div className="row">
//     <div className="col-md-12">
//         <h2>Financing</h2>
//         <p>Total before tax: {invoiceDetail.totalBeforeTax}</p>
//         <p>Tax: {invoiceDetail.tax}</p>
//         <p>Total after tax: {invoiceDetail.totalAfterTax}</p>
//         <p>Shipping: {invoiceDetail.shipping}</p>
//         <p>Credit: {invoiceDetail.credit}</p>
//         <p>Grand total: {invoiceDetail.grandTotal}</p>
//         <h2>Billing</h2>
//         <p>Given name: {invoiceDetail.billingGivenName}</p>
//         <p>Last name: {invoiceDetail.billingLastName}</p>
//         <p>Country: {invoiceDetail.billingCountry}</p>
//         <p>Region: {invoiceDetail.billingRegion}</p>
//         <p>Locality: {invoiceDetail.billingLocality}</p>
//         <p>Street Address: {invoiceDetail.billingStreetAddress}</p>
//         <p>Postal: {invoiceDetail.billingPostalCode}</p>
//         <p>Email: {invoiceDetail.billingEmail}</p>
//         <p>Telephone: {invoiceDetail.billingTelephone}</p>
//         <h2>Shipping</h2>
//         <p>Given name: {invoiceDetail.shippingGivenName}</p>
//         <p>Last name: {invoiceDetail.shippingLastName}</p>
//         <p>Country: {invoiceDetail.shippingCountry}</p>
//         <p>Region: {invoiceDetail.shippingRegion}</p>
//         <p>Locality: {invoiceDetail.shippingLocality}</p>
//         <p>Street Address: {invoiceDetail.shippingStreetAddress}</p>
//         <p>Street Address (Extra): {invoiceDetail.shippingStreetAddressExtra}</p>
//         <p>Postal: {invoiceDetail.shippingPostalCode}</p>
//         <p>Post Office Box #: {invoiceDetail.shippingPostOfficeBoxNumber}</p>
//         <p>Email: {invoiceDetail.shippingEmail}</p>
//         <p>Telephone: {invoiceDetail.shippingTelephone}</p>
//     </div>
// </div>

class InvoiceCard extends Component {
    render() {
        const {
            number, createdAt, dueAt, purchasedAt,

            billingGivenName, billingLastName, billingCountry, billingRegion,
            billingLocality, billingStreetAddress, billingStreetAddressExtra,
            billingPostalCode,

            shippingGivenName, shippingLastName, shippingCountry, shippingRegion,
            shippingLocality, shippingStreetAddress, shippingStreetAddressExtra,
            shippingPostalCode,

            totalBeforeTax, tax, taxPercent, totalAfterTax, shipping, credit, grandTotal
         } = this.props.invoiceDetail;
        return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h3 className="m-0">Invoice #{number}</h3>
                        { /* <button className="ml-auto btn btn-secondary btn-sm" type="button">
                            Copy this invoice
                        </button> */ }
                    </div>
                    <hr />
                    <div className="row mb-3">
                        <div className="col-xl-4 col-6 br py-2">
                            <div className="row">
                                <div className="col-lg-4 text-center d-none d-lg-block">
                                    <em className="fa fa-credit-card fa-4x text-muted"></em>
                                </div>
                                <div className="col-lg-8">
                                    <h4>{billingGivenName} {billingLastName}</h4>
                                    <address>
                                    {billingStreetAddress}<br />
                                    {billingPostalCode},&nbsp;{billingLocality}<br />
                                    {billingRegion}<br />
                                    {billingCountry}
                                    </address>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-6 br py-2">
                            <div className="row">
                                <div className="col-lg-4 text-center d-none d-lg-block">
                                    <em className="fa fa-truck fa-4x text-muted"></em>
                                </div>
                                <div className="col-lg-8">
                                    <h4>{shippingGivenName} {shippingLastName}</h4>
                                    <address>
                                    {shippingStreetAddress}<br />
                                    {shippingPostalCode},&nbsp;{shippingLocality}<br />
                                    {shippingRegion}<br />
                                    {shippingCountry}
                                    </address>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-xl-4 col-12 py-2">
                            <div className="clearfix">
                                <p className="float-left">INVOICE NO.</p>
                                <p className="float-right mr-2">{number}</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Created Date</p>
                                <p className="float-right mr-2">{createdAt}</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Due Date</p>
                                <p className="float-right mr-2">{dueAt}</p>
                            </div>
                            <div className="clearfix">
                                <p className="float-left">Payment Date</p>
                                <p className="float-right mr-2">{purchasedAt}</p>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive mb-3">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Item #</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1001</td>
                                <td>Iphone 5s - 64Gb</td>
                                <td>3</td>
                                <td>$ 200</td>
                                <td>$ 600</td>
                            </tr>
                            <tr>
                                <td>1002</td>
                                <td>Iphone 5s - 64Gb</td>
                                <td>3</td>
                                <td>$ 200</td>
                                <td>$ 600</td>
                            </tr>
                            <tr>
                                <td>1003</td>
                                <td>Iphone 5s - 64Gb</td>
                                <td>3</td>
                                <td>$ 200</td>
                                <td>$ 600</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                        </div>
                        <div className="col-lg-6 py-2">
                            <div className="row mb-3">
                                <div className="col-8">Subtotal</div>
                                <div className="col-4">
                                <div className="text-right">{totalBeforeTax}</div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-8">Tax ({taxPercent}%)</div>
                                <div className="col-4">
                                    <div className="text-right">{tax}</div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-8">Subtotal after tax</div>
                                <div className="col-4">
                                    <div className="text-right">{totalAfterTax}</div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-8">Shipping</div>
                                <div className="col-4">
                                    <div className="text-right">{shipping}</div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-8">Credit</div>
                                <div className="col-4">
                                    <div className="text-right">{credit}</div>
                                </div>
                            </div>

                            <div className="row mb-3 align-items-center">
                                <div className="col-7">
                                <div className="h3">GRAND TOTAL</div>
                                </div>
                                <div className="col-5">
                                    <div className="text-right h3">{grandTotal}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="d-print-none" />
                    <div className="clearfix">
                        <button className="btn btn-primary float-left mr-2" type="button">Edit</button>
                        <button className="btn btn-orange float-left" type="button">Print</button>
                        <button className="btn btn-success float-right" type="button">Send Invoice</button>
                    </div>
                </div>
            </div>
        );
    }
}

class InvoiceDetailComponent extends Component {
    render() {
        const { invoiceDetail } = this.props;

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/invoices"><i className="fas fa-book"></i>&nbsp;Invoices</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-file"></i>&nbsp;Invoice</li>
                    </ol>
                </nav>
                <h1>Invoice</h1>
                <InvoiceCard
                    invoiceDetail={invoiceDetail}
                />
            </div>
        );
    }
}

export default InvoiceDetailComponent;
