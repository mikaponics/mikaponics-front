import { INSTRUMENT_REQUEST, INSTRUMENT_FAILURE, INSTRUMENT_SUCCESS, CLEAR_INSTRUMENT } from '../constants/actionTypes';


const instrumentReducer = function(state = [], action = {}) {
    switch (action.type) {
        case INSTRUMENT_REQUEST:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_FAILURE:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_INSTRUMENT:
            return action.payload;

        default:
            return state;
    }
}

export default instrumentReducer;
