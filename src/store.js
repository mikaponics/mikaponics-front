import thunk from 'redux-thunk';
import  { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { APP_STATE } from "./constants/redux";
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    ONBOARDING_SUCCESS,
    DASHBOARD_SUCCESS,
    PROFILE_SUCCESS,
    DEVICE_SUCCESS,
    INSTRUMENT_SUCCESS,
    PURCHASE_DEVICE_SUCCESS,
    PRODUCTION_LIST_SUCCESS,
    PRODUCTION_DETAIL_SUCCESS,
    CROP_LIFE_CYCLE_STAGE_LIST_SUCCESS,
    CROP_DATA_SHEET_LIST_SUCCESS,
    CROP_SUBSTRATE_LIST_SUCCESS,
    PRODUCTION_CROP_LIST_SUCCESS,
    PRODUCTION_CROP_DETAIL_SUCCESS,
    PRODUCTION_INSPECTION_LIST_SUCCESS,
    PRODUCTION_INSPECTION_DETAIL_SUCCESS,
    PRODUCTION_CROP_INSPECTION_LIST_SUCCESS,
    PRODUCTION_CROP_INSPECTION_DETAIL_SUCCESS,
} from "./constants/actionTypes";
import userReducer from "./reducers/userReducer";
import onboardingReducer from "./reducers/onboardingReducer";
import purchaseDeviceReducer from "./reducers/purchaseDeviceReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import deviceListReducer from "./reducers/deviceListReducer";
import deviceReducer from "./reducers/deviceReducer";
import instrumentReducer from "./reducers/instrumentReducer";
import dataReducer from "./reducers/dataReducer";
import alertItemListReducer from "./reducers/alertItemListReducer";
import alertItemDetailReducer from "./reducers/alertItemDetailReducer";
import instrumentAnalysisCreateReducer from "./reducers/instrumentAnalysisCreateReducer.js";
import instrumentAnalysisListReducer from "./reducers/instrumentAnalysisListReducer";
import instrumentAnalysisDetailReducer from "./reducers/instrumentAnalysisDetailReducer";
import flashMessageReducer from "./reducers/flashMessageReducer";
import invoiceListReducer from "./reducers/invoiceListReducer";
import invoiceDetailReducer from "./reducers/invoiceDetailReducer";
import productionListReducer from "./reducers/productionListReducer";
import productionDetailReducer from "./reducers/productionDetailReducer";
import cropLifeCycleStageListReducer from "./reducers/cropLifeCycleStageListReducer";
import cropDataSheetListReducer from "./reducers/cropDataSheetListReducer";
import cropSubstrateListReducer from "./reducers/cropSubstrateListReducer";
import productionCropListReducer from "./reducers/productionCropListReducer";
import productionCropDetailReducer from "./reducers/productionCropDetailReducer";
import productionInspectionListReducer from "./reducers/productionInspectionListReducer";
import productionInspectionDetailReducer from "./reducers/productionInspectionDetailReducer";
import productionCropInspectionListReducer from "./reducers/productionCropInspectionListReducer";
import productionCropInspectionDetailReducer from "./reducers/productionCropInspectionDetailReducer";


// Combine Reducers
const appReducer = combineReducers({
    onboardingState: onboardingReducer,
    purchaseDeviceState: purchaseDeviceReducer,
    dashboardState: dashboardReducer,
    userState: userReducer,
    deviceListState: deviceListReducer,
    deviceState: deviceReducer,
    instrumentState: instrumentReducer,
    dataState: dataReducer,
    alertItemListState: alertItemListReducer,
    alertItemDetailState: alertItemDetailReducer,
    instrumentAnalysisCreateState: instrumentAnalysisCreateReducer,
    instrumentAnalysisListState: instrumentAnalysisListReducer,
    instrumentAnalysisDetailState: instrumentAnalysisDetailReducer,
    flashMessageState: flashMessageReducer,
    invoiceListState: invoiceListReducer,
    invoiceDetailState: invoiceDetailReducer,
    productionListState: productionListReducer,
    productionDetailState: productionDetailReducer,
    cropLifeCycleStageListState: cropLifeCycleStageListReducer,
    cropDataSheetListState: cropDataSheetListReducer,
    cropSubstrateListState: cropSubstrateListReducer,
    productionCropListState: productionCropListReducer,
    productionCropDetailState: productionCropDetailReducer,
    productionInspectionListState: productionInspectionListReducer,
    productionInspectionDetailState: productionInspectionDetailReducer,
    productionCropInspectioListState: productionCropInspectionListReducer,
    productionCropInspectionDetailState: productionCropInspectionDetailReducer,
});


/**
 *  Reducer to be used before the "appReducer" used. The difference with is
 *  this reducer will clear the `redux` state if the logout state was detected.
 *
 *  Special thanks to:
 *  https://stackoverflow.com/a/35641992
 */
const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined
    }
    return appReducer(state, action)
}


/**
 *  Function will save the application state if a specific 'react-redux' state
 *  was triggered.
 *
 *  Special thanks: https://stackoverflow.com/a/52593860
 */
const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        if ([ LOGIN_SUCCESS, LOGOUT_SUCCESS, ONBOARDING_SUCCESS, DASHBOARD_SUCCESS, PROFILE_SUCCESS, DEVICE_SUCCESS, INSTRUMENT_SUCCESS, PURCHASE_DEVICE_SUCCESS, PRODUCTION_LIST_SUCCESS, PRODUCTION_DETAIL_SUCCESS, CROP_LIFE_CYCLE_STAGE_LIST_SUCCESS, CROP_DATA_SHEET_LIST_SUCCESS, CROP_SUBSTRATE_LIST_SUCCESS, PRODUCTION_CROP_LIST_SUCCESS, PRODUCTION_CROP_DETAIL_SUCCESS, PRODUCTION_INSPECTION_LIST_SUCCESS, PRODUCTION_INSPECTION_DETAIL_SUCCESS ].includes(result.type)) {
            // console.log("De-hydrating store...");
            localStorage.setItem(APP_STATE, JSON.stringify(getState()))
        }
        return result;
    };
};


/**
 *  Function will load up the saved app-state from the local storage on
 *  application initial startup.
 *
 *  Special thanks: https://stackoverflow.com/a/52593860
 */
const reHydrateStore = () => {
    const data = localStorage.getItem(APP_STATE);
    if (data) {
        // console.log("Re-hydrating Store...");
        const jsonData = JSON.parse(data);
        // console.log("Store Contents:", jsonData); // For debugging purposes only.
        return jsonData;
    }
    return undefined;
};


// Create our store singleton object and populate it with our initial data.
const store = createStore(
    rootReducer,
    reHydrateStore(),
    composeWithDevTools(
        applyMiddleware(
            thunk,
            localStorageMiddleware
        )
    )
);


export default store;
