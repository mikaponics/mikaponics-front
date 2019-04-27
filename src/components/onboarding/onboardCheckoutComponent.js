import React from 'react';
import { Link } from "react-router-dom";

import StripeComponent from "../stripeComponent";


class OnboardCheckoutComponent extends React.Component {
    render() {
        const {
            monthlyFee, quantity, pricePerDevice, totalBeforeTax, tax, totalAfterTax, shipping, credit, grandTotal,
            onBackClick,
            name, description, billingEmail, amountInCents, currency, stripeKey
        } = this.props;

        return (
            <div>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">
                            <Link to="/onboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active">
                            <Link to="/onboard/purchase"><i className="fas fa-shopping-cart"></i>&nbsp;Purchase</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-barcode"></i>&nbsp;Checkout</li>
                    </ol>
                </nav>


                <h1><i className="fas fa-barcode"></i>&nbsp;Checkout</h1>


                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <p><strong>Please confirm these details before checking out your order.</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">Subscription</th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Cost</th>
                                <td>{monthlyFee} / monthy</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Description</th>
                                <td>You will be automatically enrolled in the subscription plan. Your bill will start next month.</td>
                            </tr>
                            </tbody>
                        </table>


                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Financial Summary</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Number of device(s) purchasing:</th>
                                    <td>{quantity}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Price per device:</th>
                                    <td>{pricePerDevice}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total before tax:</th>
                                    <td>{totalBeforeTax}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tax:</th>
                                    <td>{tax}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total after tax:</th>
                                    <td>{totalAfterTax} </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Shipping:</th>
                                    <td>{shipping} </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Credit:</th>
                                    <td>{credit}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Grand total:</th>
                                    <td>{grandTotal} </td>
                                </tr>
                            </tbody>
                        </table>


                        <div className="form-group">
                            <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onBackClick}>
                                <i className="fas fa-arrow-left"></i>&nbsp;Back
                            </button>
                            <form>
                                 <StripeComponent
                                    buttonClassName="btn btn-lg float-right pl-4 pr-4 btn-success"
                                    name={name}
                                    description={description}
                                    onToken={(token) => this.props.onToken(token)}
                                    billingEmail={billingEmail}
                                    amountInCents={amountInCents}
                                    currency={currency}
                                    stripeKey={stripeKey}
                                 />
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}


export default OnboardCheckoutComponent
