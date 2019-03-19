import axios from 'axios';
import store from '../store';
import { camelCase } from 'lodash';

import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from "../constants/actionTypes";
import { MIKAPONICS_GET_PROFILE_API_URL } from "../constants/api";


export const setProfileRequest = () => ({
    type: PROFILE_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProfileSuccess = profile => ({
    type: PROFILE_SUCCESS,
    payload: profile,
});


export const setProfileFailure = profile => ({
    type: PROFILE_FAILURE,
    payload: profile,
});


export function refreshUser(user) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProfileRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_GET_PROFILE_API_URL,
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

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setProfileSuccess(profile)
            );

        }).catch( (errorResult) => { // ERROR
            console.log(errorResult);

            const responseData = errorResult.response.data;
            let errors = {};
            Object.keys(responseData).forEach(key => {
                let value = responseData[key];
                let camelKey = camelCase(key);
                // console.log(camelKey, value); // For debugging purposes.
                errors[camelKey] = value;
            });

            store.dispatch(
                setProfileFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
