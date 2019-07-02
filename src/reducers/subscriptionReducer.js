import {
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_FAILURE,
    SUBSCRIPTION_SUCCESS,
} from '../constants/actionTypes';


const subscriptionReducer = function(state = [], action = {}) {
    switch (action.type) {
        case SUBSCRIPTION_REQUEST:
            return Object.assign({}, state, action.payload);

        case SUBSCRIPTION_FAILURE:
            return Object.assign({}, state, action.payload);

        case SUBSCRIPTION_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
           return state;
    }
}

export default subscriptionReducer;
