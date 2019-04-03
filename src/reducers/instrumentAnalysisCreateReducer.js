import {
    INSTRUMENT_ANALYSIS_CREATE_REQUEST,
    INSTRUMENT_ANALYSIS_CREATE_FAILURE,
    INSTRUMENT_ANALYSIS_CREATE_SUCCESS,
    CLEAR_INSTRUMENT_ANALYSIS_CREATE
} from '../constants/actionTypes';


const instrumentAnalysisCreateReducer = function(state = [], action = {}) {
    switch (action.type) {
        case INSTRUMENT_ANALYSIS_CREATE_REQUEST:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_ANALYSIS_CREATE_FAILURE:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_ANALYSIS_CREATE_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_INSTRUMENT_ANALYSIS_CREATE:
            return action.payload;

        default:
            return state;
    }
}

export default instrumentAnalysisCreateReducer;
