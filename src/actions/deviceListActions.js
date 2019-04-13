import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import { DEVICE_LIST_REQUEST, DEVICE_LIST_FAILURE, DEVICE_LIST_SUCCESS, CLEAR_DEVICE_LIST } from '../constants/actionTypes';
import { MIKAPONICS_DEVICE_LIST_API_URL } from '../constants/api';


export const setDeviceListRequest = () => ({
    type: DEVICE_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setDeviceListFailure = (info) => ({
    type: DEVICE_LIST_FAILURE,
    payload: info,
});


export const setDeviceListSuccess = (info) => ({
    type: DEVICE_LIST_SUCCESS,
    payload: info,
});


export const setClearDeviceList = () => ({
    type: CLEAR_DEVICE_LIST,
    payload: {},
});


/**
 *  Function will pull the ``device`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullDeviceList(user, page=1) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setDeviceListRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // Generate the URL.
        let aURL = MIKAPONICS_DEVICE_LIST_API_URL+"?page="+page;

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
                setDeviceListSuccess(data)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            alert("Error fetching latest data");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setDeviceListFailure({
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
