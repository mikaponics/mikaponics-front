import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FlashMessageComponent } from "../flashMessageComponent";


class InvoiceItemRow extends Component {
    render() {
        const { product, description, quantity, unitPrice, totalPrice } = this.props.rowData;
        return (
            <tr>
                <td>{product}</td>
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{unitPrice}</td>
                <td>{totalPrice}</td>
            </tr>
        );
    }
}


class InvoiceItemsTable extends Component {
    render() {
        const { items } = this.props;

        let rowElements = [];
        for (let i = 0; i < items.length; i++) {
            let rowData = items[i];
            rowElements.push(
                <InvoiceItemRow rowData={rowData} />
            );
        }
        return (
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
                    {rowElements}
                </tbody>
            </table>
        );
    }
}

class InvoiceCard extends Component {
    render() {
        const {
            slug,

            onPrintClick,

            number, createdAt, dueAt, purchasedAt, items,

            billingGivenName, billingLastName, billingCountry, billingRegion,
            billingLocality, billingStreetAddress, billingStreetAddressExtra,
            billingPostalCode,

            shippingGivenName, shippingLastName, shippingCountry, shippingRegion,
            shippingLocality, shippingStreetAddress, shippingStreetAddressExtra,
            shippingPostalCode,

            totalBeforeTax, tax, taxPercent, totalAfterTax, shipping, credit, grandTotal
        } = this.props.invoiceDetail;

        // Generate our table row of tiems.
        let tableElement;
        if (items !== null && items !== undefined) {
            tableElement = (
                <InvoiceItemsTable items={items} />
            )
        }

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
                                    {billingStreetAddress}&nbsp;{billingStreetAddressExtra}<br />
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
                                    {shippingStreetAddress}&nbsp;{shippingStreetAddressExtra}<br />
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
                        {tableElement}
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
                        <Link to="/invoices" className="btn btn-primary float-left mr-2">
                            <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                        </Link>
                        <button className="btn btn-orange float-left" type="button" onClick={onPrintClick}>
                            <i className="fas fa-print"></i>&nbsp;Print
                        </button>
                        <Link to={`/invoice-send-email/${slug}`} className="btn btn-success float-right" >
                            <i className="fas fa-share-square"></i>&nbsp;Send Invoice
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

class InvoiceDetailComponent extends Component {
    render() {
        const { flashMessage, invoiceDetail, onPrintClick } = this.props;

        return (
            <div>

                <div className="row">
                    <div className="col-md-12">
                        <FlashMessageComponent object={flashMessage} />
                    </div>
                </div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/invoices"><i className="fas fa-receipt"></i>&nbsp;Invoices</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-file"></i>&nbsp;Invoice</li>
                    </ol>
                </nav>
                <h1>Invoice</h1>
                <InvoiceCard
                    invoiceDetail={invoiceDetail}
                    onPrintClick={onPrintClick}
                />
            </div>
        );
    }
}

export default InvoiceDetailComponent;
