import { APPLICATION_LIST_REQUEST, APPLICATION_LIST_FAILURE, APPLICATION_LIST_SUCCESS } from '../constants/actionTypes';


const applicationListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case APPLICATION_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case APPLICATION_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case APPLICATION_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default applicationListReducer;
