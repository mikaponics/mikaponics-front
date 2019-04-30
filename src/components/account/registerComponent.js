import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from "react-router-dom";
import map from 'lodash/map';
import classnames from 'classnames';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../bootstrap/bootstrapInput";
import timezones from "../../constants/timezones";


class RegisterComponent extends React.Component {
    render() {
        const { referrer, errors, email, password, passwordRepeat, firstName, lastName, timezone, onChange, onSubmit, isLoading } = this.props;

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
            <main id="main" role="main">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/"><i className="fas fa-home"></i>&nbsp;Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                             <i className="fas fa-user"></i>&nbsp;Register
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form onSubmit={onSubmit}>
                            <h1>Join and grow with us</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.email}
                                label="Email (*)"
                                onChange={onChange}
                                value={email}
                                name="email"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.password}
                                label="Password (*)"
                                onChange={onChange}
                                value={password}
                                name="password"
                                type="password"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.passwordRepeat}
                                label="Password Repeat (*)"
                                onChange={onChange}
                                value={passwordRepeat}
                                name="passwordRepeat"
                                type="password"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.firstName}
                                label="First Name (*)"
                                onChange={onChange}
                                value={firstName}
                                name="firstName"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.lastName}
                                label="Last Name (*)"
                                onChange={onChange}
                                value={lastName}
                                name="lastName"
                                type="text"
                            />

                            <div className={classnames("form-group", { 'has-error': errors.timezone } )}>
                                <label className="control-label">Timezone (*)</label>
                                <select
                                    className={classnames('form-control', { 'is-invalid': errors.timezone }, { 'border-primary': !errors.timezone } )}
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
            </main>
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
