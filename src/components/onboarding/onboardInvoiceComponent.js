import React, { Component } from 'react';
import { Link } from "react-router-dom";


class InvoiceItemRow extends Component {
    render() {
        const { description, quantity, pricePerDevice, totalBeforeTax } = this.props.calculation;
        return (
            <tr>
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{pricePerDevice}</td>
                <td>{totalBeforeTax}</td>
            </tr>
        );
    }
}


class InvoiceItemsTable extends Component {
    render() {
        const { calculation } = this.props;
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                    <InvoiceItemRow calculation={calculation} />
                </tbody>
            </table>
        );
    }
}

class InvoiceCard extends Component {
    render() {
        const {
            calculation,

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
        if (calculation !== null && calculation !== undefined) {
            tableElement = (
                <InvoiceItemsTable calculation={calculation} />
            )
        }

        console.log(calculation);

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
                    { /*
                    <div className="clearfix">
                        <button className="btn btn-primary float-left mr-2" type="button">Edit</button>
                        <button className="btn btn-orange float-left" type="button">Print</button>
                        <button className="btn btn-success float-right" type="button">Send Invoice</button>
                    </div>
                    */ }
                </div>
            </div>
        );
    }
}

class OnboardInvoiceComponent extends Component {
    render() {
        const { onboarding } = this.props;
        return (
            <div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/onboard">
                                <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-book"></i>&nbsp;Invoice
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-book"></i>&nbsp;Invoice Receipt
                </h1>
                <InvoiceCard
                    invoiceDetail={onboarding}
                />

            </div>
        );
    }
}


export default OnboardInvoiceComponent
