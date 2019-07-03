import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAILURE, PRODUCT_LIST_SUCCESS } from '../constants/actionTypes';


const productListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PRODUCT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PRODUCT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default productListReducer;
