import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

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
import getCustomAxios from '../helpers/customAxios';


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

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL.
        const aURL = MIKAPONICS_ALERT_ITEM_DETAIL_API_URL+instrumentSlug;

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
                setAlertItemDetailSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullAlertItemDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAlertItemDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // // DEVELOPERS NOTE:
                // // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // // OBJECT WE GOT FROM THE API.
                // if (failedCallback) {
                //     failedCallback(errors);
                // }
            }

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

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL.
        let aURL = MIKAPONICS_ALERT_ITEM_WAS_VIEWED_FUNC_API_URL+alertSlug;

        var buffer = msgpack.encode({});

        // Perform our API submission.
        customAxios.post(aURL, buffer).then( (successResponse) => {
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
                setAlertItemDetailSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullAlertItemDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAlertItemDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // // DEVELOPERS NOTE:
                // // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // // OBJECT WE GOT FROM THE API.
                // if (failedCallback) {
                //     failedCallback(errors);
                // }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
