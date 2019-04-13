import {
    DEVICE_LIST_REQUEST, DEVICE_LIST_FAILURE, DEVICE_LIST_SUCCESS, CLEAR_DEVICE_LIST
} from '../constants/actionTypes';


const deviceListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case DEVICE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case DEVICE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case DEVICE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_DEVICE_LIST:
            return action.payload;

        default:
            return state;
    }
}

export default deviceListReducer;
