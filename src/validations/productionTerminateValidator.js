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

    if ( data.wasHarvested === undefined || data.wasHarvested === null || data.wasHarvested === "" || data.wasHarvested === "null") {
        errors.wasHarvested = 'This field is required.';
    }
    if (data.wasHarvested === false || data.wasHarvested === "false") {
        if ( data.failureReason === undefined || data.failureReason === null || data.failureReason === "" || data.failureReason === "null" ) {
            errors.failureReason = 'This field is required.';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
