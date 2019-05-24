import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import isNaN from 'lodash/isNaN';

import { PRODUCTION_OTHER_SYSTEM } from "../constants/api";


export function validateStep1Input(data) {
    let errors = {};

    if (data.name === undefined || data.name === null || validator.isEmpty(data.name) || data.name === "") {
        errors.name = 'This field is required';
    }

    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.description = 'This field is required';
    }

    if (data.device === undefined || data.device === null || validator.isEmpty(data.device) || data.device === "null") {
        errors.device = 'This field is required';
    }

    if (data.environment === undefined || data.environment === null || isNaN(data.environment)) {
        errors.environment = 'This field is required';
    }

    if (data.typeOf === undefined || data.typeOf === null || isNaN(data.typeOf)) {
        errors.typeOf = 'This field is required';
    }

    if (data.growSystem === undefined || data.growSystem === null || isNaN(data.growSystem)) {
        errors.growSystem = 'This field is required';
    } else {
        if (data.growSystem === PRODUCTION_OTHER_SYSTEM) {
            if (data.growSystemOther === undefined || data.growSystemOther === null || isEmpty(data.growSystemOther)) {
                errors.growSystemOther = 'This field is required';
            }
        }
    }

    if (data.hasDayAndNightCycle) {
        if (data.dayStartsAt === undefined || data.dayStartsAt === null || data.dayStartsAt == "null") {
            errors.dayStartsAt = 'This field is required';
        }
        if (data.dayFinishesAt === undefined || data.dayFinishesAt === null || data.dayFinishesAt == "null") {
            errors.dayFinishesAt = 'This field is required';
        }
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
        if (data.plant === "" || data.plant === null || data.plant === undefined) {
            errors.plant = 'This field is required';
        } else {
            // If the user selected the "Other" option then we need to verify
            // that the "Other" textfield has been inputted, else raise a
            // validation error.
            if (data.showPlantOther) {
                if (data.plantOther === "" || data.plantOther === null || data.plantOther === undefined) {
                    errors.plantOther = 'This field is required';
                }
            }
        }
        if (data.stage === "" || data.stage === null || data.stage === undefined) {
            errors.stage = 'This field is required';
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
            if (data.showFishOther) {
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


export function validateStep4Input(data) {
    let errors = {};

    const hasNoPlants = isEmpty(data.plantsArray);
    const hasNoFish = isEmpty(data.fishArray);
    if (hasNoPlants && hasNoFish) {
        errors['Missing Crops'] = 'You did not select any plants nor fish. Please select one before submitting.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
