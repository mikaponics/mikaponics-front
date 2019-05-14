import {
    PRODUCTION_INSPECTION_LIST_REQUEST,
    PRODUCTION_INSPECTION_LIST_FAILURE,
    PRODUCTION_INSPECTION_LIST_SUCCESS
} from '../constants/actionTypes';


const productionInspectionListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PRODUCTION_INSPECTION_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_INSPECTION_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_INSPECTION_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default productionInspectionListReducer;
