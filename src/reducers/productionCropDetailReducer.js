import {
    PRODUCTION_CROP_DETAIL_REQUEST,
    PRODUCTION_CROP_DETAIL_FAILURE,
    PRODUCTION_CROP_DETAIL_SUCCESS
} from '../constants/actionTypes';


const productionCropDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PRODUCTION_CROP_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_CROP_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_CROP_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default productionCropDetailReducer;
