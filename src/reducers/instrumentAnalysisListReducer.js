import { INSTRUMENT_ANALYSIS_LIST_REQUEST, INSTRUMENT_ANALYSIS_LIST_FAILURE, INSTRUMENT_ANALYSIS_LIST_SUCCESS, CLEAR_INSTRUMENT_ANALYSIS_LIST } from '../constants/actionTypes';


const instrumentAnalysisListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case INSTRUMENT_ANALYSIS_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_ANALYSIS_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_ANALYSIS_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_INSTRUMENT_ANALYSIS_LIST:
            return action.payload;

        default:
            return state;
    }
}

export default instrumentAnalysisListReducer;
