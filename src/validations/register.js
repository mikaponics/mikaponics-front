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
    if (validator.isEmpty(data.passwordConfirmation)) {
      errors.password_repeat = 'This field is required';
    }
    if (!validator.equals(data.password, data.passwordConfirmation)) {
      errors.password_repeat = 'Passwords must match';
    }
    if (validator.isEmpty(data.firstName)) {
      errors.first_name = 'This field is required';
    }
    if (validator.isEmpty(data.lastName)) {
      errors.last_name = 'This field is required';
    }
    if (validator.isEmpty(data.timezone)) {
      errors.timezone = 'This field is required';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    }
}
