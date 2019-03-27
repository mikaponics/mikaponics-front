import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import { DEVICE_REQUEST, DEVICE_FAILURE, DEVICE_SUCCESS, CLEAR_DEVICE } from '../constants/actionTypes';
import { MIKAPONICS_GET_DEVICE_API_URL } from '../constants/api';


export const setDeviceRequest = () => ({
    type: DEVICE_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setDeviceFailure = (info) => ({
    type: DEVICE_FAILURE,
    payload: info,
});


export const setDeviceSuccess = (info) => ({
    type: DEVICE_SUCCESS,
    payload: info,
});


export const setClearDevice = () => ({
    type: CLEAR_DEVICE,
    payload: {},
});


/**
 *  Function will pull the ``device`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullDevice(user, deviceSlug) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setDeviceRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_GET_DEVICE_API_URL+"/"+deviceSlug,
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
                setDeviceSuccess(profile)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            alert("Error fetching latest device.");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setDeviceFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


export function putDevice(user, deviceSlug, data) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setDeviceRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.put(MIKAPONICS_GET_DEVICE_API_URL+"/"+deviceSlug, {
            'name': data.name,
            'description': data.description,
            'data_interval_in_seconds': data.dataIntervalInSeconds,
        }, config).then( (successResult) => {

            const responseData = successResult.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setDeviceSuccess(device)
            );
        }).catch( (errorResult) => {
            const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
            let errors = camelizeKeys(responseData);
            // console.log(errors)

            store.dispatch(
                setDeviceFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => {
            // Do nothing.
        });

    }
}
