import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export function validateStep1Input(data) {
    let errors = {};

    if ( data.finishedAt === undefined || data.finishedAt === null || data.finishedAt === "" || data.finishedAt === "null" ) {
        errors.finishedAt = 'This field is required.';
    }
    if ( data.wasSuccessAtFinish === undefined || data.wasSuccessAtFinish === null || data.wasSuccessAtFinish === "" || data.wasSuccessAtFinish === "null" || isEmpty(data.wasSuccessAtFinish)) {
        errors.wasSuccessAtFinish = 'This field is required.';
    }
    if (data.wasSuccessAtFinish === false || data.wasSuccessAtFinish === "false") {
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

    if ( data.stateAtFinish === undefined || data.stateAtFinish === null || data.stateAtFinish === "" ) {
        errors.stateAtFinish = 'This field is required.';
    } else {
        if ( data.stateAtFinish === 1 || data.stateAtFinish === 2 ) {
            if ( data.stateFailureReasonAtFinish === undefined || data.stateFailureReasonAtFinish === null || data.stateFailureReasonAtFinish === "" ) {
                errors.stateFailureReasonAtFinish = 'This field is required.';
            }
        }
    }

    if ( data.harvestAtFinish === undefined || data.harvestAtFinish === null || data.harvestAtFinish === "" ) {
        errors.harvestAtFinish = 'This field is required.';
    } else {
        if ( data.harvestAtFinish === 1 || data.harvestAtFinish === 2 ) {
            if ( data.harvestFailureReasonAtFinish === undefined || data.harvestFailureReasonAtFinish === null || data.harvestFailureReasonAtFinish === "" ) {
                errors.harvestFailureReasonAtFinish = 'This field is required.';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
