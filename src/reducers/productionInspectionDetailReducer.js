import {
    PRODUCTION_INSPECTION_DETAIL_REQUEST,
    PRODUCTION_INSPECTION_DETAIL_FAILURE,
    PRODUCTION_INSPECTION_DETAIL_SUCCESS
} from '../constants/actionTypes';


const productionInspectionDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PRODUCTION_INSPECTION_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_INSPECTION_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_INSPECTION_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default productionInspectionDetailReducer;
