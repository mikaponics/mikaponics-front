import {
    SET_ONBOARDING_PURCHASE_INFO,
    SET_ONBOARDING_CHECKOUT_INFO,
    SET_ONBOARDING_PAYMENT_INFO
} from '../constants/actionTypes';


export const setOnboardingPurchaseInfo = (info) => ({
    type: SET_ONBOARDING_PURCHASE_INFO,
    payload: info,
});


export const setOnboardingCheckoutInfo = (info) => ({
    type: SET_ONBOARDING_CHECKOUT_INFO,
    payload: info,
});


export const setOnboardingPaymentInfo = (info) => ({
    type: SET_ONBOARDING_PAYMENT_INFO,
    payload: info,
});
