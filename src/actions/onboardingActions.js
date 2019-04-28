import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { ONBOARDING_REQUEST, ONBOARDING_SUCCESS, ONBOARDING_FAILURE } from "../constants/actionTypes";
import { MIKAPONICS_ONBOARDING_API_URL } from "../constants/api";

//------------------------------------------------------------------------------
import { SET_ONBOARDING, CLEAR_ONBOARDING } from '../constants/actionTypes';


export const setOnboardingInfo = (info) => ({
    type: SET_ONBOARDING,
    payload: info,
});


export const clearOnboardingInfo = (info) => ({
    type: CLEAR_ONBOARDING,
    payload: {},
});


export function clearOnboarding() {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            clearOnboardingInfo()
        );
    }
}
//------------------------------------------------------------------------------



export const setOnboardingRequest = () => ({
    type: ONBOARDING_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setOnboardingSuccess = onboarding => ({
    type: ONBOARDING_SUCCESS,
    payload: onboarding,
});


export const setOnboardingFailure = onboarding => ({
    type: ONBOARDING_FAILURE,
    payload: onboarding,
});


export function pullOnboarding(user) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setOnboardingRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_ONBOARDING_API_URL,
            config
        ).then( (successResult) => { // SUCCESS
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let onboarding = camelizeKeys(responseData);

            // Extra.
            onboarding['isAPIRequestRunning'] = false;
            onboarding['errors'] = {};

            // console.log(onboarding); // For debugging purposes.

            // Update the global state of the application to store our
            // user onboarding for the application.
            store.dispatch(
                setOnboardingSuccess(onboarding)
            );

        }).catch( (errorResult) => { // ERROR
            // // console.log(errorResult);
            // alert("Error fetching latest onboarding");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setOnboardingFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


export function postOnboarding(user, data, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setOnboardingRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        axios.post(MIKAPONICS_ONBOARDING_API_URL, decamelizedData, config).then( (successResult) => {

            const responseData = successResult.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Run our success callback function.
            successCallback(device);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setOnboardingSuccess(device)
            );
        }).catch( (errorResult) => {
            console.error(errorResult);
            const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
            let errors = camelizeKeys(responseData);
            // console.log(errors);

            // Run our failure callback function.
            failedCallback(errors);

            store.dispatch(
                setOnboardingFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => {
            // Do nothing.
        });

    }
}
