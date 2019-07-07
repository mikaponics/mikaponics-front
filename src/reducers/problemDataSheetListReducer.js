import {
    PROBLEM_DATA_SHEET_LIST_REQUEST,
    PROBLEM_DATA_SHEET_LIST_FAILURE,
    PROBLEM_DATA_SHEET_LIST_SUCCESS
} from '../constants/actionTypes';


const problemDataSheetListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PROBLEM_DATA_SHEET_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PROBLEM_DATA_SHEET_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PROBLEM_DATA_SHEET_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default problemDataSheetListReducer;
