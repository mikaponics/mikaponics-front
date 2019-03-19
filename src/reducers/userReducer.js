import {
    LOGIN_REST_FORM,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    REGISTER_REST_FORM,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    PROFILE_REQUEST,
    PROFILE_FAILURE,
    PROFILE_SUCCESS
} from '../constants/actionTypes';


const userReducer = function(state = [], action = {}) {
    switch (action.type) {
        case LOGIN_REST_FORM:
            return Object.assign({}, state, action.payload);

        case LOGIN_SUCCESS:
            return Object.assign({}, state, action.payload);

        case LOGIN_FAILURE:
            return Object.assign({}, state, action.payload);

        case LOGIN_REQUEST:
            return Object.assign({}, state, action.payload);

        case LOGOUT_SUCCESS:
            return {}; // Note: Setting to empty dict clears the state.

        case REGISTER_REST_FORM:
            return Object.assign({}, state, action.payload);

        case REGISTER_REQUEST:
            return Object.assign({}, state, action.payload);

        case REGISTER_SUCCESS:
            return Object.assign({}, state, action.payload);

        case REGISTER_FAILURE:
            return Object.assign({}, state, action.payload);

        case PROFILE_REQUEST:
            return Object.assign({}, state, action.payload);

        case PROFILE_FAILURE:
            return Object.assign({}, state, action.payload);

        case PROFILE_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
           return state;
    }
}

export default userReducer;
