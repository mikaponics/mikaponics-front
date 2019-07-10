import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize } from 'humps';
import isEmpty from 'lodash/isEmpty';
import msgpack from 'msgpack-lite';

import {
    APPLICATION_LIST_REQUEST,
    APPLICATION_LIST_FAILURE,
    APPLICATION_LIST_SUCCESS
} from '../constants/actionTypes';
import { MIKAPONICS_APPLICATION_LIST_API_URL, MIKAPONICS_APPLICATION_DELETE_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


export const setApplicationListRequest = () => ({
    type: APPLICATION_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setApplicationListFailure = (info) => ({
    type: APPLICATION_LIST_FAILURE,
    payload: info,
});


export const setApplicationListSuccess = (info) => ({
    type: APPLICATION_LIST_SUCCESS,
    payload: info,
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullApplicationList(successCallback=null, failureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setApplicationListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        let aURL = MIKAPONICS_APPLICATION_LIST_API_URL;

        // Make the API call.
        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setApplicationListSuccess(data)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (successCallback) {
                successCallback(data);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullApplicationList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setApplicationListFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (failureCallback) {
                    failureCallback(errors);
                }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


export function deleteApplication(slug, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setApplicationListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Perform our API submission.
        customAxios.delete(MIKAPONICS_APPLICATION_DELETE_API_URL+slug).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let subscriptionReceipt = camelizeKeys(responseData);

            // Extra.
            subscriptionReceipt['isAPIRequestRunning'] = false;
            subscriptionReceipt['errors'] = {};

            // Update the global state of the application to store our
            // user subscription receipt for the application.
            store.dispatch(
                setApplicationListSuccess(subscriptionReceipt)
            );

            // Run our success callback function.
            successCallback(subscriptionReceipt);

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.error(errors); // For debugging purposes only.

                // Run our failure callback function.
                failedCallback(errors);

                store.dispatch(
                    setApplicationListFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );
            }

        }).then( () => {
            // Do nothing.
        });

    }
}
