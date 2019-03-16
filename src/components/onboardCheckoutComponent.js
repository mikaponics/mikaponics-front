import React from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "./bootstrap/bootstrapAlert";
import TextFieldGroup from "./textFieldGroup"


class OnboardCheckoutComponent extends React.Component {
    render() {
        const {
            errors, onChange, onSubmit, isLoading,
            monthlyFee, numberOfDevices, pricePerDevice, totalBeforeTax, tax, totalAfterTax, shipping, credit, grandTotal
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
                           <form onSubmit={onSubmit}>
                                <h1>Checkout</h1>
                                <h2>Summary</h2>
                                Monthly fee:
                                <input class="form-control" type="text" placeholder="0" value={monthlyFee} readonly="true" />

                                Number of device(s):
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

                                <h2>Payment</h2>
                                <p>All fields which have the (*) symbol are required to be filled out.</p>

                                <BootstrapErrorsProcessingAlert errors={errors} />




                           </form>
                       </div>
                   </div>
                </div>

            </div>
        );
    }
}


export default OnboardCheckoutComponent
