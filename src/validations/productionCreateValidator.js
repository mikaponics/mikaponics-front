import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Form validator for step 1 in the `Production Create` page.
 */
export function validateStep1Input(data) {
    let errors = {};

    if (validator.isEmpty(data.name) || data.name === "")
    {
        errors.name = 'This field is required';
    }

    if (validator.isEmpty(data.description)) {
        errors.description = 'This field is required';
    }

    if (validator.isEmpty(data.device)) {
        errors.device = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
