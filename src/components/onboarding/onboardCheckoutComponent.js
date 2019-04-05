import React from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from '../bootstrap/bootstrapInput';
import StripeComponent from "../stripeComponent";


class OnboardCheckoutComponent extends React.Component {
    render() {
        const {
            monthlyFee, numberOfDevices, pricePerDevice, totalBeforeTax, tax, totalAfterTax, shipping, credit, grandTotal,

            name, description, billingEmail, amountInCents, currency, stripeKey
        } = this.props;

        return (
            <div className="container">
                <main>

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">
                                <Link to="/onboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Home</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <Link to="/onboard/purchase"><i className="fas fa-shopping-cart"></i>&nbsp;Purchase</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-barcode"></i>&nbsp;Checkout</li>
                        </ol>
                    </nav>


                    <h1><i className="fas fa-barcode"></i>&nbsp;Checkout</h1>
                    <div className="col-md-5 mx-auto mt-2">

                        <div className="card">
                            <div className="card-header">
                                Monthly Subscription
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{monthlyFee} / monthy</h5>
                                <p className="card-text">You will be automatically enrolled in the subscription plan. Your bill will start next month.</p>
                            </div>
                        </div>

                        <h3 className="pt-4 pb-2 text-center">Summary</h3>

                        <form>
                             Number of device(s) purchasing:
                             <input className="form-control" type="text" placeholder="0" value={numberOfDevices} readOnly={true} />

                             Price per device:
                             <input className="form-control" type="text" placeholder="0" value={pricePerDevice} readOnly={true} />

                             Total before tax:
                             <input className="form-control" type="text" placeholder="0" value={totalBeforeTax} readOnly={true} />

                             Tax:
                             <input className="form-control" type="text" placeholder="0" value={tax} readOnly={true} />

                             Total after tax:
                             <input className="form-control" type="text" placeholder="0" value={totalAfterTax} readOnly={true} />

                             Shipping:
                             <input className="form-control" type="text" placeholder="0" value={shipping} readOnly={true} />

                             Credit:
                             <input className="form-control" type="text" placeholder="0" value={credit} readOnly={true} />

                             Grand total:
                             <input className="form-control" type="text" placeholder="0" value={grandTotal} readOnly={true} />

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


                    </div>



                </main>
            </div>
        );
    }
}


export default OnboardCheckoutComponent
