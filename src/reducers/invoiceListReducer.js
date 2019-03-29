import { INVOICE_LIST_REQUEST, INVOICE_LIST_FAILURE, INVOICE_LIST_SUCCESS, CLEAR_INVOICE_LIST } from '../constants/actionTypes';


const invoiceListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case INVOICE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case INVOICE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case INVOICE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_INVOICE_LIST:
            return action.payload;

        default:
            return state;
    }
}

export default invoiceListReducer;
