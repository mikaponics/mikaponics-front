import { DEVICE_REQUEST, DEVICE_FAILURE, DEVICE_SUCCESS, CLEAR_DEVICE } from '../constants/actionTypes';


const deviceReducer = function(state = [], action = {}) {
    switch (action.type) {
        case DEVICE_REQUEST:
            return Object.assign({}, state, action.payload);

        case DEVICE_FAILURE:
            return Object.assign({}, state, action.payload);

        case DEVICE_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_DEVICE:
            return action.payload;

        default:
            return state;
    }
}

export default deviceReducer;
