import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

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

        // Generate the URL.
        let aURL = MIKAPONICS_DEVICE_LIST_API_URL+"?page="+page;

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
                setDeviceListSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setDeviceListFailure({
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
