import {
    PRODUCTION_CROP_LIST_REQUEST,
    PRODUCTION_CROP_LIST_FAILURE,
    PRODUCTION_CROP_LIST_SUCCESS
} from '../constants/actionTypes';


const productionCropListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PRODUCTION_CROP_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_CROP_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_CROP_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default productionCropListReducer;
