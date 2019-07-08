import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export function validatePurchaseStep2Input(data) {
    let errors = {};

    if ( data.cart === undefined || data.cart === null || data.cart === "" || data.cart.length === 0 ) {
        errors.shoppingCart = 'This field is required.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validatePurchaseStep3Input(data) {
    let errors = {};

    if ( data.billingGivenName === undefined || data.billingGivenName === null || data.billingGivenName === "") {
        errors.billingGivenName = 'This field is required.';
    }
    if ( data.billingLastName === undefined || data.billingLastName === null || data.billingLastName === "") {
        errors.billingLastName = 'This field is required.';
    }
    if ( data.billingCountry === undefined || data.billingCountry === null || data.billingCountry === "") {
        errors.billingCountry = 'This field is required.';
    }
    if ( data.billingRegion === undefined || data.billingRegion === null || data.billingRegion === "") {
        errors.billingRegion = 'This field is required.';
    }
    if ( data.billingLocality === undefined || data.billingLocality === null || data.billingLocality === "") {
        errors.billingLocality = 'This field is required.';
    }
    if ( data.billingPostalCode === undefined || data.billingPostalCode === null || data.billingPostalCode === "") {
        errors.billingPostalCode = 'This field is required.';
    }
    if ( data.billingTelephone === undefined || data.billingTelephone === null || data.billingTelephone === "") {
        errors.billingTelephone = 'This field is required.';
    }
    if ( data.billingEmail === undefined || data.billingEmail === null || data.billingEmail === "") {
        errors.billingEmail = 'This field is required.';
    }
    if ( data.billingStreetAddress === undefined || data.billingStreetAddress === null || data.billingStreetAddress === "") {
        errors.billingStreetAddress = 'This field is required.';
    }
    if ( data.shippingGivenName === undefined || data.shippingGivenName === null || data.shippingGivenName === "") {
        errors.shippingGivenName = 'This field is required.';
    }
    if ( data.shippingLastName === undefined || data.shippingLastName === null || data.shippingLastName === "") {
        errors.shippingLastName = 'This field is required.';
    }
    if ( data.shippingCountry === undefined || data.shippingCountry === null || data.shippingCountry === "") {
        errors.shippingCountry = 'This field is required.';
    }
    if ( data.shippingRegion === undefined || data.shippingRegion === null || data.shippingRegion === "") {
        errors.shippingRegion = 'This field is required.';
    }
    if ( data.shippingLocality === undefined || data.shippingLocality === null || data.shippingLocality === "") {
        errors.shippingLocality = 'This field is required.';
    }
    if ( data.shippingPostalCode === undefined || data.shippingPostalCode === null || data.shippingPostalCode === "") {
        errors.shippingPostalCode = 'This field is required.';
    }
    if ( data.shippingTelephone === undefined || data.shippingTelephone === null || data.shippingTelephone === "") {
        errors.shippingTelephone = 'This field is required.';
    }
    if ( data.shippingEmail === undefined || data.shippingEmail === null || data.shippingEmail === "") {
        errors.shippingEmail = 'This field is required.';
    }
    if ( data.shippingStreetAddress === undefined || data.shippingStreetAddress === null || data.shippingStreetAddress === "") {
        errors.shippingStreetAddress = 'This field is required.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateIntegrateStep2Input(data) {
    let errors = {};

    if ( data.name === undefined || data.name === null || data.name === "") {
        errors.name = 'This field is required.';
    }
    if ( data.description === undefined || data.description === null || data.description === "") {
        errors.description = 'This field is required.';
    }
    if ( data.instruments === undefined || data.instruments === null || data.instruments === "" || data.instruments.length === 0 ) {
        errors.instruments = 'This field is required.';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
