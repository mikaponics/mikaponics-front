import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


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


export function validateStep2Input(data) {
    let errors = {};

    // Only do validation if we are running the modal.
    if (data.showModal) {
        if (data.crop === "" || data.quantity === null || data.quantity === undefined) {
            errors.crop = 'This field is required';
        }
        if (data.quantity === "" || data.quantity === null || data.quantity === undefined) {
            errors.quantity = 'This field is required';
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
