import React from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "./bootstrap/bootstrapAlert";
import TextFieldGroup from "./textFieldGroup"


class OnboardCheckoutComponent extends React.Component {
    render() {
        const {
            errors, onChange, onSubmit, isLoading, monthlyFee
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
                                <p>All fields which have the (*) symbol are required to be filled out.</p>

                                <BootstrapErrorsProcessingAlert errors={errors} />

                                <form>
                                <div class="form-group">
 <label for="exampleInputEmail1">Email address</label>
 <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
 <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
</div>
                                </form>




                           </form>
                       </div>
                   </div>
                </div>

            </div>
        );
    }
}


export default OnboardCheckoutComponent
