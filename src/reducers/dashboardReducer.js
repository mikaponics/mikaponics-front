import { DASHBOARD_REQUEST, DASHBOARD_FAILURE, DASHBOARD_SUCCESS, CLEAR_DASHBOARD } from '../constants/actionTypes';


const dashboardReducer = function(state = [], action = {}) {
    switch (action.type) {
        case DASHBOARD_REQUEST:
            return Object.assign({}, state, action.payload);

        case DASHBOARD_FAILURE:
            return Object.assign({}, state, action.payload);

        case DASHBOARD_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_DASHBOARD:
            return action.payload;

        default:
            return state;
    }
}

export default dashboardReducer;
