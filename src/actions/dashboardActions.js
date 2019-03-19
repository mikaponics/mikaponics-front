import axios from 'axios';
import store from '../store';
import { camelCase } from 'lodash';

import { DASHBOARD_REQUEST, DASHBOARD_FAILURE, DASHBOARD_SUCCESS, CLEAR_DASHBOARD } from '../constants/actionTypes';
import { MIKAPONICS_DASHBOARD_API_URL } from '../constants/api';


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

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_DASHBOARD_API_URL,
            config
        ).then( (successResult) => { // SUCCESS
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let profile = {};
            Object.keys(responseData).forEach(key => {
                let value = responseData[key];
                let camelKey = camelCase(key);
                // console.log(camelKey, value); // For debugging purposes.
                profile[camelKey] = value;
            });

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // console.log(profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setDashboardSuccess(profile)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            alert("Error fetching latest profile");

            const responseData = errorResult.data;
            let errors = {};
            Object.keys(responseData).forEach(key => {
                let value = responseData[key];
                let camelKey = camelCase(key);
                // console.log(camelKey, value); // For debugging purposes.
                errors[camelKey] = value;
            });

            store.dispatch(
                setDashboardFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
