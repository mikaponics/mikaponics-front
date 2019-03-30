import { INVOICE_DETAIL_REQUEST, INVOICE_DETAIL_FAILURE, INVOICE_DETAIL_SUCCESS, CLEAR_INVOICE_DETAIL } from '../constants/actionTypes';


const invoiceDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case INVOICE_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case INVOICE_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case INVOICE_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_INVOICE_DETAIL:
            return action.payload;

        default:
            return state;
    }
}

export default invoiceDetailReducer;
