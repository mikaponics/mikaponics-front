import React from 'react';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

import StripeComponent from "../../stripeComponent";


export default class DeviceCreateStep4PurchaseComponent extends React.Component {
    render() {
        const {
            cart,
            totalBeforeTax, tax, totalAfterTax, shipping, credit, grandTotal, grandTotalInCents,
            onBackClick,
            name, description, amountInCents, currency, stripeKey,

            billingGivenName, billingLastName, billingCountry,
            billingRegion, billingLocality, billingPostalCode, billingEmail,
            billingTelephone, billingStreetAddress,

            shippingGivenName, shippingLastName, shippingCountry,
            shippingRegion, shippingLocality, shippingStreetAddress,
            shippingPostalCode, shippingEmail,
            shippingTelephone,
        } = this.props;

        // Render our component output.
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/devices"><i className="fas fa-cubes"></i>&nbsp;Devices</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"></i>&nbsp;Add (Purchase)</li>
                    </ol>
                </nav>
                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Device
                </h1>
                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/devices/create/step-2-purchase">
                                <span className="num">1.</span><span className="">Cart</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/devices/create/step-3-purchase">
                                <span className="num">2.</span><span className="">Billing / Shipping</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <span className="num">3.</span><span className="">Checkout</span>
                        </div>
                    </div>
                </div>


                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <p><strong>Please confirm these details before checking out your order.</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">
                                    <i className="fas fa-address-card"></i>&nbsp;Billing Details
                                </th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Given Name</th>
                                <td>{billingGivenName}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Last Name</th>
                                <td>{billingLastName}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Country</th>
                                <td>{billingCountry}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Region</th>
                                <td>{billingRegion}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Locality</th>
                                <td>{billingLocality}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Street Address</th>
                                <td>{billingStreetAddress}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Postal Code / Zip</th>
                                <td>{billingPostalCode}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Email</th>
                                <td>{billingEmail}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Telephone</th>
                                <td>{billingTelephone}</td>
                            </tr>
                            </tbody>
                        </table>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">
                                    <i className="fas fa-map-marker"></i>&nbsp;Shipping Details
                                </th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Given Name</th>
                                <td>{shippingGivenName}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Last Name</th>
                                <td>{shippingLastName}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Country</th>
                                <td>{shippingCountry}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Region</th>
                                <td>{shippingRegion}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Locality</th>
                                <td>{shippingLocality}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Street Address</th>
                                <td>{shippingStreetAddress}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Postal Code / Zip</th>
                                <td>{shippingPostalCode}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Email</th>
                                <td>{shippingEmail}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Telephone</th>
                                <td>{shippingTelephone}</td>
                            </tr>
                            </tbody>
                        </table>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-receipt"></i>&nbsp;Bill
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Items:</th>
                                    <td>
                                        <CartItemsUnorderedList cart={cart} />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total before tax:</th>
                                    <td>
                                        <NumberFormat
                                            value={totalBeforeTax}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            prefix={'$'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tax:</th>
                                    <td>
                                        <NumberFormat
                                            value={tax}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            prefix={'$'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total after tax:</th>
                                    <td>
                                        <NumberFormat
                                            value={totalAfterTax}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            prefix={'$'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Shipping:</th>
                                    <td>
                                        <NumberFormat
                                            value={shipping}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            prefix={'$'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Credit:</th>
                                    <td>
                                        <NumberFormat
                                            value={credit}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            prefix={'$'}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Grand total:</th>
                                    <td>
                                        <NumberFormat
                                            value={grandTotal}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            prefix={'$'}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        <div className="form-group">
                            <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onBackClick}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
                            <form>
                                 <StripeComponent
                                    buttonClassName="btn btn-lg float-right pl-4 pr-4 btn-success"
                                    name={name}
                                    description={description}
                                    onToken={(token) => this.props.onToken(token)}
                                    billingEmail={billingEmail}
                                    amountInCents={grandTotalInCents}
                                    currency={currency}
                                    stripeKey={stripeKey}
                                    imageURL={"https://app.mikaponics.com/img/mikaponics-logo.png"}
                                 />
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

class CartItemsUnorderedList extends React.Component {
    render() {
        const { cart } = this.props;
        return(
            <div>
                {cart &&
                    <ul>
                        {cart.map(
                            (product, i) => <CartItemsUnorderedListItem product={product} key={i} />)
                        }
                    </ul>
                }
            </div>
        );
    }
}


class CartItemsUnorderedListItem extends React.Component {
    render() {
        const { name, quantity } = this.props.product;
        return(
            <li>{name}&nbsp;(x{quantity})</li>
        );
    }
}
