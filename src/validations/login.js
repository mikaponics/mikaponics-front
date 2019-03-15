import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if (validator.isEmpty(data.email)) {
        errors.email = 'This field is required';
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
