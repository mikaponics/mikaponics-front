import {
    SET_ONBOARDING_PURCHASE_INFO,
    SET_ONBOARDING_CHECKOUT_INFO,
    SET_ONBOARDING_PAYMENT_INFO,
    SET_ONBOARDING
} from '../constants/actionTypes';


const onboardingReducer = function(state = [], action = {}) {
    switch (action.type) {
        case SET_ONBOARDING:
            return Object.assign({}, state, action.payload);

        default:
           return state;
    }
}

export default onboardingReducer;
