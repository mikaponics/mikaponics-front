import {
    PRODUCTION_LIST_REQUEST,
    PRODUCTION_LIST_FAILURE,
    PRODUCTION_LIST_SUCCESS
} from '../constants/actionTypes';


const productionReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PRODUCTION_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PRODUCTION_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default productionReducer;
