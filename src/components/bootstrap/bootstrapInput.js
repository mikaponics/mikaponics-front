import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import shortid from "shortid";


/**
 * Primitive bootstrap alert wnich can be populated with any text. Primarly used
 * as a banner in our application.
 */
export const BootstrapInput = ({ name, type, label, placeholder, value, helpText, onChange, error, className = "form-group" }) => {
    const helpID = shortid.generate + "-help";
    return (
        <div className={classnames('form-group', { 'has-error': error })}>
            <label htmlFor={name} className="control-label">{label}</label>
            <input
                className={classnames(className, { 'is-invalid': error })}
                id={shortid.generate}
                name={name}
                type={type}
                aria-describedby={helpID}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <small id={helpID} className="form-text text-muted">{helpText}</small>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}


BootstrapInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    helpText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    // checkUserExists: PropTypes.func
    className: PropTypes.string.isRequired,
}


BootstrapInput.defaultProps = {
    type: 'text'
}
