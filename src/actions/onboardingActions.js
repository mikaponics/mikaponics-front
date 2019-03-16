import { SET_ONBOARDING } from '../constants/actionTypes';


export const setOnboardingInfo = (info) => ({
    type: SET_ONBOARDING,
    payload: info,
});
