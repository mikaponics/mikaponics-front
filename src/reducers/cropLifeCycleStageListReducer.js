import {
    CROP_LIFE_CYCLE_STAGE_LIST_REQUEST,
    CROP_LIFE_CYCLE_STAGE_LIST_FAILURE,
    CROP_LIFE_CYCLE_STAGE_LIST_SUCCESS
} from '../constants/actionTypes';


const cropLifeCycleStageListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case CROP_LIFE_CYCLE_STAGE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case CROP_LIFE_CYCLE_STAGE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case CROP_LIFE_CYCLE_STAGE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default cropLifeCycleStageListReducer;
