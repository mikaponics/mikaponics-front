import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';

import StripeComponent from "../../stripeComponent";


class SubscriptionCheckoutReviewComponent extends Component {
    render() {
        const {
            user, subscription, currency, stripeKey,

            billingGivenName, billingLastName, billingCountry,
            billingRegion, billingLocality, billingPostalCode, billingEmail,
            billingTelephone, billingStreetAddress,

            shippingGivenName, shippingLastName, shippingCountry,
            shippingRegion, shippingLocality, shippingStreetAddress,
            shippingPostalCode, shippingEmail,
            shippingTelephone, onBackClick,
        } = this.props;
        console.log("SubscriptionCheckoutReviewComponent | subscription", subscription);
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/subscription"><i className="fas fa-gem"></i>&nbsp;Subscription</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-shopping-cart"></i>&nbsp;Checkout</li>
                    </ol>
                </nav>

                <h1><i className="fas fa-shopping-cart"></i>&nbsp;Purchase Subscription</h1>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <p><strong>Please confirm these details before checking out your subscription.</strong></p>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">Billing Details</th>
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
                                <th scope="row" colSpan="2" className="text-light">Shipping Details</th>
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
                                    <th scope="row" colSpan="2" className="text-light">Financial Summary</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Subscription:</th>
                                    <td>{subscription.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Monthly Fee:</th>
                                    <td>{subscription.amountInDollars}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">First Payment:</th>
                                    <td>
                                        <Moment tz={user.timezone} format="YYYY/MM/DD hh:mm:ss a">
                                            {subscription.firstPaymentDate.asStr}
                                        </Moment>
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
                                    name={subscription.name}
                                    description=""
                                    onToken={(token) => this.props.onToken(token)}
                                    billingEmail={billingEmail}
                                    amountInCents={subscription.amountInCents}
                                    currency={currency}
                                    stripeKey={stripeKey}
                                 />
                                 { /*
                                     imageURL={"https://app.mikaponics.com/img/mikaponics-logo.png"}
                                 */}
                            </form>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

export default SubscriptionCheckoutReviewComponent;
