import {
    PRODUCTION_DETAIL_REQUEST,
    PRODUCTION_DETAIL_FAILURE,
    PRODUCTION_DETAIL_SUCCESS
} from '../constants/actionTypes';


const productionReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PRODUCTION_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default productionReducer;
