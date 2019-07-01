import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { TIME_SERIES_DATA_REQUEST, TIME_SERIES_DATA_FAILURE, TIME_SERIES_DATA_SUCCESS, CLEAR_TIME_SERIES_DATA } from '../constants/actionTypes';
import { MIKAPONICS_GET_TIME_SERIES_DATA_API_URL } from '../constants/api';


export const setTimeSeriesDataRequest = () => ({
    type: TIME_SERIES_DATA_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setTimeSeriesDataFailure = (info) => ({
    type: TIME_SERIES_DATA_FAILURE,
    payload: info,
});


export const setTimeSeriesDataSuccess = (info) => ({
    type: TIME_SERIES_DATA_SUCCESS,
    payload: info,
});


export const setClearTimeSeriesData = () => ({
    type: CLEAR_TIME_SERIES_DATA,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullTimeSeriesData(user, instrumentSlug, page=1, completionCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setTimeSeriesDataRequest()
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
        })
        // DEVELOPER NOTES:
        // (1) By setting the value to ``application/msgpack`` we are telling
        //     ``Django REST Framework`` to use our ``MessagePack`` library.
        // (2) Same as (1)
        // (3) We are telling ``Axios`` that the data returned from our server
        //     needs to be in ``arrayBuffer`` format so our ``msgpack-lite``
        //     library can decode it. Special thanks to the following link:
        //     https://blog.notabot.in/posts/how-to-use-protocol-buffers-with-rest

        customAxios.get(MIKAPONICS_GET_TIME_SERIES_DATA_API_URL+"?slug="+instrumentSlug+"&page="+page).then( (successResponse) => { // SUCCESS
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
                setTimeSeriesDataSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setTimeSeriesDataFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );
            }

        }).then( completionCallback );
    }
}
