import {
    INSTRUMENT_ALERT_DETAIL_REQUEST, INSTRUMENT_ALERT_DETAIL_FAILURE, INSTRUMENT_ALERT_DETAIL_SUCCESS, CLEAR_INSTRUMENT_ALERT_DETAIL
} from '../constants/actionTypes';


const instrumentAlertDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case INSTRUMENT_ALERT_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_ALERT_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_ALERT_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_INSTRUMENT_ALERT_DETAIL:
            return action.payload;

        default:
            return state;
    }
}

export default instrumentAlertDetailReducer;
