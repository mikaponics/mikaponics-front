import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize } from 'humps';
import isEmpty from 'lodash/isEmpty';
import msgpack from 'msgpack-lite';

import {
    ALERT_ITEM_LIST_REQUEST,
    ALERT_ITEM_LIST_FAILURE,
    ALERT_ITEM_LIST_SUCCESS,
    CLEAR_ALERT_ITEM_LIST
} from '../constants/actionTypes';
import { MIKAPONICS_ALERT_ITEM_LIST_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


export const setAlertItemListRequest = () => ({
    type: ALERT_ITEM_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setAlertItemListFailure = (info) => ({
    type: ALERT_ITEM_LIST_FAILURE,
    payload: info,
});


export const setAlertItemListSuccess = (info) => ({
    type: ALERT_ITEM_LIST_SUCCESS,
    payload: info,
});


export const setClearAlertItemList = () => ({
    type: CLEAR_ALERT_ITEM_LIST,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullAlertItemList(user, page=1, filtersMap=new Map()) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setAlertItemListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = MIKAPONICS_ALERT_ITEM_LIST_API_URL+"?page="+page;
        filtersMap.forEach(
            (value, key) => {
                let decamelizedkey = decamelize(key)
                aURL += "&"+decamelizedkey+"="+value;
            }
        )

        // Make the API call.
        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            data['page'] = page;

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setAlertItemListSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullAlertItemList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAlertItemListFailure({
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
