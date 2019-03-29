import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import { INSTRUMENT_REQUEST, INSTRUMENT_FAILURE, INSTRUMENT_SUCCESS, CLEAR_INSTRUMENT } from '../constants/actionTypes';
import { MIKAPONICS_GET_INSTRUMENT_API_URL } from '../constants/api';


export const setInstrumentRequest = () => ({
    type: INSTRUMENT_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setInstrumentFailure = (info) => ({
    type: INSTRUMENT_FAILURE,
    payload: info,
});


export const setInstrumentSuccess = (info) => ({
    type: INSTRUMENT_SUCCESS,
    payload: info,
});


export const setClearInstrument = () => ({
    type: CLEAR_INSTRUMENT,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullInstrument(user, instrumentSlug) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setInstrumentRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_GET_INSTRUMENT_API_URL+"/"+instrumentSlug,
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
                setInstrumentSuccess(profile)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            alert("Error fetching latest profile");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setInstrumentFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


export function putInstrument(user, instrumentSlug, data, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setInstrumentRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.put(MIKAPONICS_GET_INSTRUMENT_API_URL+"/"+instrumentSlug, {
            'red_above_value': data.redAboveValue,
            'red_below_value': data.redBelowValue,
            'red_alert_delay_in_seconds': data.redAlertDelayInSeconds,

            'orange_above_value': data.orangeAboveValue,
            'orange_below_value': data.orangeBelowValue,
            'orange_alert_delay_in_seconds': data.orangeAlertDelayInSeconds,

            'yellow_above_value': data.yellowAboveValue,
            'yellow_below_value': data.yellowBelowValue,
            'yellow_alert_delay_in_seconds': data.yellowAlertDelayInSeconds,
        }, config).then( (successResult) => {

            const responseData = successResult.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Run our success callback function.
            successCallback(device);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setInstrumentSuccess(device)
            );
        }).catch( (errorResult) => {
            console.log(errorResult);
            const responseData = errorResult.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
            let errors = camelizeKeys(responseData);
            // console.log(errors)

            // Run our failure callback function.
            failedCallback(errors);

            store.dispatch(
                setInstrumentFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => {
            // Do nothing.
        });

    }
}
