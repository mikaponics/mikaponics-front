import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { INSTRUMENT_REQUEST, INSTRUMENT_FAILURE, INSTRUMENT_SUCCESS, CLEAR_INSTRUMENT } from '../constants/actionTypes';
import { MIKAPONICS_GET_INSTRUMENT_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


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

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        customAxios.get(MIKAPONICS_GET_INSTRUMENT_API_URL+"/"+instrumentSlug).then( (successResponse) => { // SUCCESS
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
                setInstrumentSuccess(profile)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setInstrumentFailure({
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


export function putInstrument(user, instrumentSlug, data, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setInstrumentRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode({
            'red_above_value': data.redAboveValue,
            'red_below_value': data.redBelowValue,
            'red_alert_delay_in_seconds': data.redAlertDelayInSeconds,

            'orange_above_value': data.orangeAboveValue,
            'orange_below_value': data.orangeBelowValue,
            'orange_alert_delay_in_seconds': data.orangeAlertDelayInSeconds,

            'yellow_above_value': data.yellowAboveValue,
            'yellow_below_value': data.yellowBelowValue,
            'yellow_alert_delay_in_seconds': data.yellowAlertDelayInSeconds,
        });

        customAxios.put(MIKAPONICS_GET_INSTRUMENT_API_URL+"/"+instrumentSlug, buffer).then( (successResponse) => {
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
                setInstrumentSuccess(device)
            );
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putInstrument | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setInstrumentFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (failedCallback) {
                    failedCallback(errors);
                }
            }

        }).then( () => {
            // Do nothing.
        });

    }
}
