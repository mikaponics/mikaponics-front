import {
    ONBOARDING_REQUEST,
    ONBOARDING_FAILURE,
    ONBOARDING_SUCCESS
} from '../constants/actionTypes';


const onboardingReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ONBOARDING_REQUEST:
            return Object.assign({}, state, action.payload);

        case ONBOARDING_FAILURE:
            return Object.assign({}, state, action.payload);

        case ONBOARDING_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default onboardingReducer;
