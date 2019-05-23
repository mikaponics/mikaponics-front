import { TASK_ITEM_LIST_REQUEST, TASK_ITEM_LIST_FAILURE, TASK_ITEM_LIST_SUCCESS, CLEAR_TASK_ITEM_LIST } from '../constants/actionTypes';


const taskItemListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TASK_ITEM_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case TASK_ITEM_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case TASK_ITEM_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        case CLEAR_TASK_ITEM_LIST:
            return action.payload;

        default:
            return state;
    }
}

export default taskItemListReducer;
