import React from 'react';
import { Redirect, Link } from "react-router-dom";
import map from 'lodash/map';
import classnames from 'classnames';

import TextFieldGroup from "./textFieldGroup"


class OnboardPurchaseComponent extends React.Component {
    render() {
        const { numberOfDevices, errors, onChange, onSubmit } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">
                            <Link to="/onboard">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Purchase</li>
                    </ol>
                </nav>

                <div className="Onboarding-Purchase">
                   <div className="row">
                       <div className="col-md-4 offset-md-4">
                           <form onSubmit={onSubmit}>
                                <h1>Purchase</h1>
                                <p>All fields which have the (*) symbol are required to be filled out.</p>

                               {errors && <div className="alert alert-danger" role="alert">TODO: Implement render.</div>}

                               <TextFieldGroup
                                   error={errors.numberOfDevices}
                                   label="# of devices"
                                   onChange={onChange}
                                   value={numberOfDevices}
                                   field="numberOfDevices"
                                   type="number"
                               />
                           </form>
                       </div>
                   </div>
                </div>

            </div>
        );
    }
}


export default OnboardPurchaseComponent
