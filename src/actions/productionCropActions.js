import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';

import {
    PRODUCTION_CROP_LIST_REQUEST, PRODUCTION_CROP_LIST_SUCCESS, PRODUCTION_CROP_LIST_FAILURE,
    PRODUCTION_CROP_DETAIL_REQUEST, PRODUCTION_CROP_DETAIL_SUCCESS, PRODUCTION_CROP_DETAIL_FAILURE,
} from "../constants/actionTypes";
import {
    MIKAPONICS_PRODUCTION_CROP_LIST_CREATE_API_URL,
    MIKAPONICS_PRODUCTION_CROP_RETRIEVE_UPDATE_API_URL,
} from "../constants/api";


export const setProductionCropListRequest = () => ({
    type: PRODUCTION_CROP_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProductionCropListSuccess = productionList => ({
    type: PRODUCTION_CROP_LIST_SUCCESS,
    payload: productionList,
});


export const setProductionCropListFailure = productionList => ({
    type: PRODUCTION_CROP_LIST_FAILURE,
    payload: productionList,
});


export function pullProductionCropList(user, page=1) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProductionCropListRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_PRODUCTION_CROP_LIST_CREATE_API_URL+"?page="+page,
            config
        ).then( (successResult) => { // SUCCESS
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let productionList = camelizeKeys(responseData);

            // Extra.
            productionList['isAPIRequestRunning'] = false;
            productionList['errors'] = {};

            // console.log(productionList); // For debugging purposes.

            // Update the global state of the application to store our
            // user productionList for the application.
            store.dispatch(
                setProductionCropListSuccess(productionList)
            );

        }).catch( (errorResult) => { // ERROR
            // // console.log(errorResult);
            // alert("Error fetching latest productionList");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setProductionCropListFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


export const setProductionCropDetailRequest = () => ({
    type: PRODUCTION_CROP_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProductionCropDetailSuccess = productionList => ({
    type: PRODUCTION_CROP_DETAIL_SUCCESS,
    payload: productionList,
});


export const setProductionCropDetailFailure = productionList => ({
    type: PRODUCTION_CROP_DETAIL_FAILURE,
    payload: productionList,
});



/**
 *  Function will pull the ``production`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullProductionCropDetail(user, slug) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProductionCropDetailRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        const aURL = MIKAPONICS_PRODUCTION_CROP_RETRIEVE_UPDATE_API_URL+slug;

        axios.get(
            aURL,
            config
        ).then( (successResult) => { // SUCCESS
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // console.log(profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setProductionCropDetailSuccess(profile)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            // alert("Error fetching latest invoice.");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setProductionCropDetailFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


export function putProductionCropDetail(user, data, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setProductionCropDetailRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        const url = MIKAPONICS_PRODUCTION_CROP_RETRIEVE_UPDATE_API_URL+data.slug;

        // Perform our API submission.
        axios.put(url, decamelizedData, config).then( (successResult) => {

            const responseData = successResult.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setProductionCropDetailSuccess(device)
            );

            // Run our success callback function.
            successCallback(device);

        }).catch( (errorResult) => {
            // console.error("postProductionCropDetail - ERROR",errorResult);
            const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
            let errors = camelizeKeys(responseData);
            // console.log(errors);

            store.dispatch(
                setProductionCropDetailFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

            // Run our failure callback function.
            failedCallback(errors);

        }).then( () => {
            // Do nothing.
        });

    }
}
