import {
    CROP_SUBSTRATE_LIST_REQUEST, CROP_SUBSTRATE_LIST_FAILURE, CROP_SUBSTRATE_LIST_SUCCESS
} from '../constants/actionTypes';


const cropSubstrateListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case CROP_SUBSTRATE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case CROP_SUBSTRATE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case CROP_SUBSTRATE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default cropSubstrateListReducer;
