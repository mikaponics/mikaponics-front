import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';


/**
 * Primitive bootstrap alert wnich can be populated with any text. Primarly used
 * as a banner in our application.
 */
export const BootstrapTextarea = ({ id, field, type, label, placeholder, rows, value, helpText, onChange, error }) => {
    const helpID = id + "-help";
    return (
        <div className={classnames('form-group', { 'has-error': error })}>
            <label htmlFor={field} className="control-label">{label}</label>
            <textarea
                className={classnames('form-control', { 'is-invalid': error })}
                id={id}
                name={field}
                type={type}
                aria-describedby={helpID}
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={onChange}
            />
            <small id={helpID} class="form-text text-muted">{helpText}</small>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}

BootstrapTextarea.propTypes = {
    id: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    rows: PropTypes.number.isRequired,
    value: PropTypes.string,
    helpText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    // checkUserExists: PropTypes.func
}

BootstrapTextarea.defaultProps = {
    type: 'text'
}
