import { TIME_SERIES_DATA_REQUEST, TIME_SERIES_DATA_FAILURE, TIME_SERIES_DATA_SUCCESS, CLEAR_TIME_SERIES_DATA } from '../constants/actionTypes';


const dataReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TIME_SERIES_DATA_REQUEST:
            return Object.assign({}, state, action.payload);

        case TIME_SERIES_DATA_FAILURE:
            return Object.assign({}, state, action.payload);

        case TIME_SERIES_DATA_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_TIME_SERIES_DATA:
            return action.payload;

        default:
            return state;
    }
}

export default dataReducer;
