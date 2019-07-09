import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export function validateInput(data) {
    let errors = {};

    if ( data.name === undefined || data.name === null || data.name === "") {
        errors.name = 'This field is required.';
    }
    if ( data.description === undefined || data.description === null || data.description === "") {
        errors.description = 'This field is required.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
