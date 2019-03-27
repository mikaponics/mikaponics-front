import { INSTRUMENT_ALERT_LIST_REQUEST, INSTRUMENT_ALERT_LIST_FAILURE, INSTRUMENT_ALERT_LIST_SUCCESS, CLEAR_INSTRUMENT_ALERT_LIST } from '../constants/actionTypes';


const instrumentAlertListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case INSTRUMENT_ALERT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_ALERT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_ALERT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_INSTRUMENT_ALERT_LIST:
            return action.payload;

        default:
            return state;
    }
}

export default instrumentAlertListReducer;
