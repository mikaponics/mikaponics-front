import {
    SUBSCRIPTION_INFO_REQUEST,
    SUBSCRIPTION_INFO_FAILURE,
    SUBSCRIPTION_INFO_SUCCESS,
} from '../constants/actionTypes';


const subscriptionInfoReducer = function(state = [], action = {}) {
    switch (action.type) {
        case SUBSCRIPTION_INFO_REQUEST:
            return Object.assign({}, state, action.payload);

        case SUBSCRIPTION_INFO_FAILURE:
            return Object.assign({}, state, action.payload);

        case SUBSCRIPTION_INFO_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
           return state;
    }
}

export default subscriptionInfoReducer;
