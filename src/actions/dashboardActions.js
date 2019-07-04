import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { DASHBOARD_REQUEST, DASHBOARD_FAILURE, DASHBOARD_SUCCESS, CLEAR_DASHBOARD } from '../constants/actionTypes';
import { MIKAPONICS_DASHBOARD_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


export const setDashboardRequest = () => ({
    type: DASHBOARD_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setDashboardFailure = (info) => ({
    type: DASHBOARD_FAILURE,
    payload: info,
});


export const setDashboardSuccess = (info) => ({
    type: DASHBOARD_SUCCESS,
    payload: info,
});


export const setClearDashboard = () => ({
    type: CLEAR_DASHBOARD,
    payload: {},
});


/**
 *  Function will pull the ``dashboard`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullDashboard(user) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setDashboardRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        customAxios.get(MIKAPONICS_DASHBOARD_API_URL).then( (successResponse) => { // SUCCESS
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
                setDashboardSuccess(profile)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setDashboardFailure({
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
