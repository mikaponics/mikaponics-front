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
        if (data.crop === "" || data.crop === null || data.crop === undefined) {
            errors.crop = 'This field is required';
        } else {
            // If the user selected the "Other" option then we need to verify
            // that the "Other" textfield has been inputted, else raise a
            // validation error.
            if (data.showOther) {
                if (data.cropOther === "" || data.cropOther === null || data.cropOther === undefined) {
                    errors.cropOther = 'This field is required';
                }
            }
        }
        if (data.quantity === "" || data.quantity === null || data.quantity === undefined) {
            errors.quantity = 'This field is required';
        } else {
            if (data.quantity <= 0) {
                errors.quantity = 'Cannot enter a value less then zero.';
            }
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


export function validateStep3Input(data) {
    let errors = {};

    // Only do validation if we are running the modal.
    if (data.showModal) {
        if (data.fish === "" || data.fish === null || data.fish === undefined) {
            errors.fish = 'This field is required';
        } else {
            // If the user selected the "Other" option then we need to verify
            // that the "Other" textfield has been inputted, else raise a
            // validation error.
            if (data.showOther) {
                if (data.fishOther === "" || data.fishOther === null || data.fishOther === undefined) {
                    errors.fishOther = 'This field is required';
                }
            }
        }
        if (data.quantity === "" || data.quantity === null || data.quantity === undefined) {
            errors.quantity = 'This field is required';
        } else {
            if (data.quantity <= 0) {
                errors.quantity = 'Cannot enter a value less then zero.';
            }
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
