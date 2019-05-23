import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize } from 'humps';
import isEmpty from 'lodash/isEmpty';

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

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

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
            data['page'] = page;

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setTaskItemListSuccess(data)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            // task("Error fetching latest data");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setTaskItemListFailure({
                    isAPIRequestRunning: false,
                    errors: errors,
                    page: page,
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
