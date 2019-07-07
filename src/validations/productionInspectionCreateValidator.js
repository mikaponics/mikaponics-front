import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export function validateStep1Input(data) {
    let errors = {};
    // console.log("validateStep1Input:", data); // For debugging purposes.

    if ( data.didPass === undefined || data.didPass === null || data.didPass === "" || data.didPass === "null" ) {
        errors.didPass = 'This field is required.';
    }
    if (data.didPass === false || data.didPass === "false") {
        if ( data.failureReason === undefined || data.failureReason === null || data.failureReason === "" || data.failureReason === "null" ) {
            errors.failureReason = 'This field is required.';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateStep2Input(data) {
    let errors = {};
    // console.log("validateStep1Input:", data); // For debugging purposes.

    if ( data.stage === undefined || data.stage === null || data.stage === "" ) {
        errors.stage = 'This field is required.';
    }
    if ( data.review === undefined || data.review === null || data.review === "" ) {
        errors.review = 'This field is required.';
    } else {
        if ( data.review === 1 || data.review === 2 ) {
            if ( data.failureReason === undefined || data.failureReason === null || data.failureReason === "" ) {
                errors.failureReason = 'This field is required.';
            }
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
