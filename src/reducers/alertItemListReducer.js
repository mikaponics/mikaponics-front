import { ALERT_ITEM_LIST_REQUEST, ALERT_ITEM_LIST_FAILURE, ALERT_ITEM_LIST_SUCCESS, CLEAR_ALERT_ITEM_LIST } from '../constants/actionTypes';


const alertItemListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ALERT_ITEM_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ALERT_ITEM_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ALERT_ITEM_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_ALERT_ITEM_LIST:
            return action.payload;

        default:
            return state;
    }
}

export default alertItemListReducer;
