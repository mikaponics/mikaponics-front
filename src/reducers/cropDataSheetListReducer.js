import {
    CROP_DATA_SHEET_LIST_REQUEST, CROP_DATA_SHEET_LIST_FAILURE, CROP_DATA_SHEET_LIST_SUCCESS
} from '../constants/actionTypes';


const cropDataSheetListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case CROP_DATA_SHEET_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case CROP_DATA_SHEET_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case CROP_DATA_SHEET_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default cropDataSheetListReducer;
