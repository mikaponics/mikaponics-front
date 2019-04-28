import {
    PURCHASE_DEVICE_REQUEST,
    PURCHASE_DEVICE_FAILURE,
    PURCHASE_DEVICE_SUCCESS
} from '../constants/actionTypes';


const purchaseDeviceReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PURCHASE_DEVICE_REQUEST:
            return Object.assign({}, state, action.payload);

        case PURCHASE_DEVICE_FAILURE:
            return Object.assign({}, state, action.payload);

        case PURCHASE_DEVICE_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default purchaseDeviceReducer;
