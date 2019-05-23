import {
    TASK_ITEM_DETAIL_REQUEST, TASK_ITEM_DETAIL_FAILURE, TASK_ITEM_DETAIL_SUCCESS, CLEAR_TASK_ITEM_DETAIL
} from '../constants/actionTypes';


const taskItemDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TASK_ITEM_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case TASK_ITEM_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case TASK_ITEM_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_TASK_ITEM_DETAIL:
            return action.payload;

        default:
            return state;
    }
}

export default taskItemDetailReducer;
