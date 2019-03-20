import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from "react-router-dom";
import map from 'lodash/map';
import classnames from 'classnames';

import { BootstrapErrorsProcessingAlert } from "./bootstrap/bootstrapAlert";
import TextFieldGroup from "./textFieldGroup"
import timezones from "../constants/timezones";


class RegisterComponent extends React.Component {
    render() {
        const { referrer, errors, email, password, passwordConfirmation, firstName, lastName, timezone, onChange, onSubmit, isLoading } = this.props;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        // Generate our options.
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );

        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={onSubmit}>
                        <h1>Join our community</h1>
                        <p>All fields which have the (*) symbol are required to be filled out.</p>

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <TextFieldGroup
                            error={errors.email}
                            label="Email (*)"
                            onChange={onChange}
                            value={email}
                            field="email"
                        />

                        <TextFieldGroup
                            error={errors.password}
                            label="Password (*)"
                            onChange={onChange}
                            value={password}
                            field="password"
                            type="password"
                        />

                        <TextFieldGroup
                          error={errors.passwordConfirmation}
                          label="Password Confirmation (*)"
                          onChange={onChange}
                          value={passwordConfirmation}
                          field="passwordConfirmation"
                          type="password"
                        />

                        <TextFieldGroup
                          error={errors.firstName}
                          label="First Name (*)"
                          onChange={onChange}
                          value={firstName}
                          field="firstName"
                          type="text"
                        />

                        <TextFieldGroup
                          error={errors.lastName}
                          label="Last Name (*)"
                          onChange={onChange}
                          value={lastName}
                          field="lastName"
                          type="text"
                        />

                        <div className={classnames("form-group", { 'has-error': errors.timezone } )}>
                            <label className="control-label">Timezone (*)</label>
                            <select
                                className={classnames('form-control', { 'is-invalid': errors.timezone })}
                                name="timezone"
                                onChange={onChange}
                                value={timezone}
                            >
                                <option value="" disabled>Choose your timezone</option>
                                {options}
                            </select>
                            {errors.timezone && <span className="help-block">{errors.timezone}</span>}
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-lg" disabled={isLoading}>
                                Sign up
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}


RegisterComponent.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    // error: PropTypes.string,
    // onChange: PropTypes.func.isRequired,
    // onSubmit: PropTypes.func.isRequired,
}

export default RegisterComponent
