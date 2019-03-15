import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextFieldGroup from './textFieldGroup';


class LoginComponent extends Component {
    render() {
    const { email, password, onChange, onSubmit, errors = {}, isLoading } = this.props;
    return (
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <form onSubmit={onSubmit}>
                     <h1>Login</h1>

                     {errors.nonFieldErrors && <div class="alert alert-danger" role="alert">Wrong password or email.</div>}

                     <TextFieldGroup
                         error={errors.email}
                         label="Email"
                         onChange={onChange}
                         value={email}
                         field="email"
                     />

                     <TextFieldGroup
                         error={errors.password}
                         label="Password"
                         onChange={onChange}
                         value={password}
                         field="password"
                         type="password"
                     />

                    <div className="form-group">
                        <button className="btn btn-primary btn-lg" disabled={isLoading}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default LoginComponent;
