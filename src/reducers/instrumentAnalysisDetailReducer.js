import { INSTRUMENT_ANALYSIS_DETAIL_REQUEST, INSTRUMENT_ANALYSIS_DETAIL_FAILURE, INSTRUMENT_ANALYSIS_DETAIL_SUCCESS, CLEAR_INSTRUMENT_ANALYSIS_DETAIL } from '../constants/actionTypes';


const instrumentAnalysisDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case INSTRUMENT_ANALYSIS_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_ANALYSIS_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case INSTRUMENT_ANALYSIS_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_INSTRUMENT_ANALYSIS_DETAIL:
            return action.payload;

        default:
            return state;
    }
}

export default instrumentAnalysisDetailReducer;
