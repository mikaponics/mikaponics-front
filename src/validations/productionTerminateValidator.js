import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import {
    PRODUCTION_CROPS_DIED,
    PRODUCTION_CROPS_WERE_TERMINATED,
    PRODUCTION_CROPS_TERRIBLE_HARVEST_REVIEW,
    PRODUCTION_CROPS_BAD_HARVEST_REVIEW
} from "../constants/api";


export function validateStep1Input(data) {
    let errors = {};

    if ( data.finishedAt === undefined || data.finishedAt === null || data.finishedAt === "" || data.finishedAt === "null" ) {
        errors.finishedAt = 'This field is required.';
    }
    if ( data.wasSuccess === undefined || data.wasSuccess === null || data.wasSuccess === "" || data.wasSuccess === "null") {
        errors.wasSuccess = 'This field is required.';
    }
    if (data.wasSuccess === false || data.wasSuccess === "false") {
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
        if ( data.stateAtFinish === PRODUCTION_CROPS_DIED || data.stateAtFinish === PRODUCTION_CROPS_WERE_TERMINATED ) {
            if ( data.stateFailureReasonAtFinish === undefined || data.stateFailureReasonAtFinish === null || data.stateFailureReasonAtFinish === "" ) {
                errors.stateFailureReasonAtFinish = 'This field is required.';
            }
        }
    }

    if ( data.harvestAtFinish === undefined || data.harvestAtFinish === null || data.harvestAtFinish === "" ) {
        errors.harvestAtFinish = 'This field is required.';
    } else {
        if ( data.harvestAtFinish === PRODUCTION_CROPS_TERRIBLE_HARVEST_REVIEW || data.harvestAtFinish === PRODUCTION_CROPS_BAD_HARVEST_REVIEW ) {
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
