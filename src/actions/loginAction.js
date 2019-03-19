import axios from 'axios';
import store from '../store';
import { camelCase } from 'lodash';

import { LOGIN_REST_FORM, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/actionTypes"
import { MIKAPONICS_LOGIN_API_URL } from "../constants/api"


export const setLoginRestForm = () => ({
    type: LOGIN_REST_FORM,
    payload: {
        isAPIRequestRunning: false,
        errors: {}
    },
});

export function attemptLoginRestForm() {
    return dispatch => {
        store.dispatch(
            setLoginRestForm()
        );
    }
}

export const setLoginRequest = () => ({
    type: LOGIN_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setLoginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload: payload,
});


export const setLoginFailure = payload => ({
    type: LOGIN_FAILURE,
    payload: payload,
});


export function attemptLogin(email, password) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLoginRequest()
        );

        axios.post(MIKAPONICS_LOGIN_API_URL, {
            'email': email,
            'password': password,
        }).then( (successResult) => {
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
                setLoginSuccess(profile)
            );
        }).catch( (errorResult) => {
            store.dispatch(
                setLoginFailure({
                    isAPIRequestRunning: false,
                    errors: {
                        email: errorResult.response.data.email,
                        password: errorResult.response.data.password,
                        nonFieldErrors: errorResult.response.data.non_field_errors
                    }
                })
            );

        }).then( () => {
            // Do nothing.
        });

    }
}

export const setLogoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: {
        isAPIRequestRunning: false,
        data: {},
        errors: {}
    },
});


export function attemptLogout() {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLogoutSuccess()
        );
    }
}
