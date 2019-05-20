import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import {
    ALERT_ITEM_DETAIL_REQUEST,
    ALERT_ITEM_DETAIL_FAILURE,
    ALERT_ITEM_DETAIL_SUCCESS,
    CLEAR_ALERT_ITEM_DETAIL
} from '../constants/actionTypes';
import {
    MIKAPONICS_ALERT_ITEM_DETAIL_API_URL,
    MIKAPONICS_ALERT_ITEM_WAS_VIEWED_FUNC_API_URL
} from '../constants/api';


export const setAlertItemDetailRequest = () => ({
    type: ALERT_ITEM_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setAlertItemDetailFailure = (info) => ({
    type: ALERT_ITEM_DETAIL_FAILURE,
    payload: info,
});


export const setAlertItemDetailSuccess = (info) => ({
    type: ALERT_ITEM_DETAIL_SUCCESS,
    payload: info,
});


export const setClearAlertItemDetail = () => ({
    type: CLEAR_ALERT_ITEM_DETAIL,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullAlertItemDetail(user, instrumentSlug=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setAlertItemDetailRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // Generate the URL.
        const aURL = MIKAPONICS_ALERT_ITEM_DETAIL_API_URL+instrumentSlug;

        // Make the API call.
        axios.get(
            aURL,
            config
        ).then( (successResult) => { // SUCCESS
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setAlertItemDetailSuccess(data)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            // alert("Error fetching latest data");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setAlertItemDetailFailure({
                    isAPIRequestRunning: false,
                    errors: errors,
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


export function postAlertItemDetailWasViewed(user, alertSlug) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setAlertItemDetailRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // Generate the URL.
        let aURL = MIKAPONICS_ALERT_ITEM_WAS_VIEWED_FUNC_API_URL+alertSlug;

        // Perform our API submission.
        axios.post(aURL, {}, config).then( (successResult) => {
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setAlertItemDetailSuccess(data)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            // alert("Error fetching latest data");

            const responseData = errorResult.response.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setAlertItemDetailFailure({
                    isAPIRequestRunning: false,
                    errors: errors,
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
