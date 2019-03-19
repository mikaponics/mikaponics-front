import store from '../store';

import { SET_ONBOARDING, CLEAR_ONBOARDING } from '../constants/actionTypes';


export const setOnboardingInfo = (info) => ({
    type: SET_ONBOARDING,
    payload: info,
});


export const clearOnboardingInfo = (info) => ({
    type: CLEAR_ONBOARDING,
    payload: {},
});


export function clearOnboarding() {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            clearOnboardingInfo()
        );
    }
}
