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
        if ( data.harvestFailureReason === undefined || data.harvestFailureReason === null || data.harvestFailureReason === "" || data.harvestFailureReason === "null" ) {
            errors.harvestFailureReason = 'This field is required.';
        } else {
            if ( data.harvestFailureReasonOther === undefined || data.harvestFailureReasonOther === null || data.harvestFailureReasonOther === "" || data.harvestFailureReasonOther === "null") {
                errors.harvestFailureReasonOther = 'This field is required.';
            }
        }
    } else if (data.wasHarvested === true || data.wasHarvested === "true") {
        if ( data.harvestYield === undefined || data.harvestYield === null || data.harvestYield === "" || data.harvestYield === "null" ) {
            errors.harvestYield = 'This field is required.';
        }
        if ( data.harvestQuality === undefined || data.harvestQuality === null || data.harvestQuality === "" || data.harvestQuality === "null" ) {
            errors.harvestQuality = 'This field is required.';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
