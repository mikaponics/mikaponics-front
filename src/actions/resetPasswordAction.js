import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS,
} from "../constants/actionTypes"
import {
    MIKAPONICS_PASSWORD_RESET_API_URL
} from "../constants/api"


export const setResetPasswordRequest = () => ({
    type: RESET_PASSWORD_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setResetPasswordSuccess = payload => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: payload,
});


export const setResetPasswordFailure = payload => ({
    type: RESET_PASSWORD_FAILURE,
    payload: payload,
});


export function postResetPassword(formData, successCallback=null, failureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setResetPasswordRequest()
        );

        axios.post(MIKAPONICS_PASSWORD_RESET_API_URL, {
            'password': formData.password,
            'password_repeat': formData.passwordConfirmation,
            'pr_access_code': formData.accessCode,
        }).then( (successResult) => {
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // console.log(profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setResetPasswordSuccess(profile)
            );

            // User profile is returned in the success callback function.
            successCallback(successResult.data);

        }).catch( (errorResult) => {
            const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
            let errors = camelizeKeys(responseData);
            // console.log(errors);

            store.dispatch(
                setResetPasswordFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

            // Run our failure callback function.
            failureCallback(errorResult.response.data);

        }).then( () => {
            // Do nothing.
        });

    }
}
