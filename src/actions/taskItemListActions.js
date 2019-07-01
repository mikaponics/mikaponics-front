import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize } from 'humps';
import isEmpty from 'lodash/isEmpty';
import msgpack from 'msgpack-lite';

import {
    TASK_ITEM_LIST_REQUEST,
    TASK_ITEM_LIST_FAILURE,
    TASK_ITEM_LIST_SUCCESS,
    CLEAR_TASK_ITEM_LIST
} from '../constants/actionTypes';
import { MIKAPONICS_TASK_ITEM_LIST_API_URL } from '../constants/api';


export const setTaskItemListRequest = () => ({
    type: TASK_ITEM_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setTaskItemListFailure = (info) => ({
    type: TASK_ITEM_LIST_FAILURE,
    payload: info,
});


export const setTaskItemListSuccess = (info) => ({
    type: TASK_ITEM_LIST_SUCCESS,
    payload: info,
});


export const setClearTaskItemList = () => ({
    type: CLEAR_TASK_ITEM_LIST,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullTaskItemList(user, page=1, filtersMap=new Map()) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setTaskItemListRequest()
        );

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            headers: {
                'Authorization': "Bearer " + user.token,
                'Content-Type': 'application/msgpack;',
                'Accept': 'application/msgpack',
            },
            responseType: 'arraybuffer'
        });

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = MIKAPONICS_TASK_ITEM_LIST_API_URL+"?page="+page;
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
                setTaskItemListSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullTaskItemList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setTaskItemListFailure({
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
