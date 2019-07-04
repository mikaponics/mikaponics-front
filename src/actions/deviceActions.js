import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { DEVICE_REQUEST, DEVICE_FAILURE, DEVICE_SUCCESS, CLEAR_DEVICE } from '../constants/actionTypes';
import { MIKAPONICS_GET_DEVICE_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


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

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        customAxios.get(MIKAPONICS_GET_DEVICE_API_URL+"/"+deviceSlug).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

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

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setDeviceFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


export function putDevice(user, deviceSlug, data, successCallback, errorCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setDeviceRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode({
            'name': data.name,
            'description': data.description,
            'data_interval_in_seconds': data.dataIntervalInSeconds,
        });

        customAxios.put(MIKAPONICS_GET_DEVICE_API_URL+"/"+deviceSlug, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Run our success callback function.
            successCallback(device);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setDeviceSuccess(device)
            );

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setDeviceFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (errorCallback) {
                    errorCallback(errors);
                }
            }
        }).then( () => {
            // Do nothing.
        });

    }
}
