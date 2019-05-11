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
    CROP_LIST_SUCCESS,
    CROP_SUBSTRATE_LIST_SUCCESS
} from "./constants/actionTypes";
import userReducer from "./reducers/userReducer";
import onboardingReducer from "./reducers/onboardingReducer";
import purchaseDeviceReducer from "./reducers/purchaseDeviceReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import deviceListReducer from "./reducers/deviceListReducer";
import deviceReducer from "./reducers/deviceReducer";
import instrumentReducer from "./reducers/instrumentReducer";
import dataReducer from "./reducers/dataReducer";
import instrumentAlertListReducer from "./reducers/instrumentAlertListReducer";
import instrumentAlertDetailReducer from "./reducers/instrumentAlertDetailReducer";
import instrumentAnalysisCreateReducer from "./reducers/instrumentAnalysisCreateReducer.js";
import instrumentAnalysisListReducer from "./reducers/instrumentAnalysisListReducer";
import instrumentAnalysisDetailReducer from "./reducers/instrumentAnalysisDetailReducer";
import flashMessageReducer from "./reducers/flashMessageReducer";
import invoiceListReducer from "./reducers/invoiceListReducer";
import invoiceDetailReducer from "./reducers/invoiceDetailReducer";
import productionListReducer from "./reducers/productionListReducer";
import productionDetailReducer from "./reducers/productionDetailReducer";
import cropListReducer from "./reducers/cropListReducer";
import cropSubstrateListReducer from "./reducers/cropSubstrateListReducer";


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
    instrumentAlertListState: instrumentAlertListReducer,
    instrumentAlertDetailState: instrumentAlertDetailReducer,
    instrumentAnalysisCreateState: instrumentAnalysisCreateReducer,
    instrumentAnalysisListState: instrumentAnalysisListReducer,
    instrumentAnalysisDetailState: instrumentAnalysisDetailReducer,
    flashMessageState: flashMessageReducer,
    invoiceListState: invoiceListReducer,
    invoiceDetailState: invoiceDetailReducer,
    productionListState: productionListReducer,
    productionDetailState: productionDetailReducer,
    cropListState: cropListReducer,
    cropSubstrateListState: cropSubstrateListReducer,
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
        if ([ LOGIN_SUCCESS, LOGOUT_SUCCESS, ONBOARDING_SUCCESS, DASHBOARD_SUCCESS, PROFILE_SUCCESS, DEVICE_SUCCESS, INSTRUMENT_SUCCESS, PURCHASE_DEVICE_SUCCESS, PRODUCTION_LIST_SUCCESS, PRODUCTION_DETAIL_SUCCESS, CROP_LIST_SUCCESS, CROP_SUBSTRATE_LIST_SUCCESS ].includes(result.type)) {
            console.log("De-hydrating store...");
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
        console.log("Re-hydrating Store...");
        const jsonData = JSON.parse(data);
        console.log("Store Contents:", jsonData); // For debugging purposes only.
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
