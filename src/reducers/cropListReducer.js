import {
    CROP_LIST_REQUEST, CROP_LIST_FAILURE, CROP_LIST_SUCCESS
} from '../constants/actionTypes';


const cropListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case CROP_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case CROP_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case CROP_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default cropListReducer;
