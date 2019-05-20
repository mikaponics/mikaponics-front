import {
    ALERT_ITEM_DETAIL_REQUEST, ALERT_ITEM_DETAIL_FAILURE, ALERT_ITEM_DETAIL_SUCCESS, CLEAR_ALERT_ITEM_DETAIL
} from '../constants/actionTypes';


const alertItemDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ALERT_ITEM_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case ALERT_ITEM_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case ALERT_ITEM_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_ALERT_ITEM_DETAIL:
            return action.payload;

        default:
            return state;
    }
}

export default alertItemDetailReducer;
