import React from 'react';
import { Link } from "react-router-dom";

import StripeComponent from "../stripeComponent";


class OnboardCheckoutComponent extends React.Component {
    render() {
        const {
            monthlyFee, numberOfDevices, pricePerDevice, totalBeforeTax, tax, totalAfterTax, shipping, credit, grandTotal,

            name, description, billingEmail, amountInCents, currency, stripeKey
        } = this.props;

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">
                            <Link to="/onboard">Home</Link>
                        </li>
                        <li className="breadcrumb-item active">
                            <Link to="/onboard/purchase">Purchase</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                    </ol>
                </nav>

                <div className="Onboarding-Purchase">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <h1>Checkout</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div class="card">
                                <div class="card-header">
                                    Monthly Subscription
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">{monthlyFee} / monthy</h5>
                                    <p class="card-text">You will be automatically enrolled in the subscription plan. Your bill will start next month.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div class="card">
                                <div class="card-header">
                                    Product Purchase
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Mikapod Device</h5>
                                    <p class="card-text">

                                        <form>
                                             Number of device(s) purchasing:
                                             <input class="form-control" type="text" placeholder="0" value={numberOfDevices} readonly="true" />

                                             Price per device:
                                             <input class="form-control" type="text" placeholder="0" value={pricePerDevice} readonly="true" />

                                             Total before tax:
                                             <input class="form-control" type="text" placeholder="0" value={totalBeforeTax} readonly="true" />

                                             Tax:
                                             <input class="form-control" type="text" placeholder="0" value={tax} readonly="true" />

                                             Total after tax:
                                             <input class="form-control" type="text" placeholder="0" value={totalAfterTax} readonly="true" />

                                             Shipping:
                                             <input class="form-control" type="text" placeholder="0" value={shipping} readonly="true" />

                                             Credit:
                                             <input class="form-control" type="text" placeholder="0" value={credit} readonly="true" />

                                             Grand total:
                                             <input class="form-control" type="text" placeholder="0" value={grandTotal} readonly="true" />

                                             <br />


                                             <StripeComponent
                                                 name={name}
                                                 description={description}
                                                 onToken={(token) => this.props.onToken(token)}
                                                 billingEmail={billingEmail}
                                                 amountInCents={amountInCents}
                                                 currency={currency}
                                                 stripeKey={stripeKey}
                                             />

                                        </form>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default OnboardCheckoutComponent
