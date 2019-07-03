import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export function validatePurchaseStep2Input(data) {
    let errors = {};

    if ( data.cart === undefined || data.cart === null || data.cart === "" || data.cart.length === 0 ) {
        errors.shoppingCart = 'Please pick a product before proceeding!';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
