import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import {
    REGISTER_REST_FORM,
    REGISTER_REQUEST,
    REGISTER_FAILURE,
    REGISTER_SUCCESS
} from "../constants/actionTypes"
import { MIKAPONICS_REGISTER_API_URL } from "../constants/api"


export const setClearRegister = () => ({
    type: REGISTER_REST_FORM,
    payload: {
        isAPIRequestRunning: false,
        errors: {}
    },
});

export function clearRegister() {
    return dispatch => {
        store.dispatch(
            setClearRegister()
        );
    }
}

export const setRegisterRequest = () => ({
    type: REGISTER_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setRegisterSuccess = payload => ({
    type: REGISTER_SUCCESS,
    payload: payload,
});


export const setRegisterFailure = payload => ({
    type: REGISTER_FAILURE,
    payload: payload,
});


export function postRegister(userData, successCallback=null, failureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setRegisterRequest()
        );

        axios.post(MIKAPONICS_REGISTER_API_URL, {
            'email': userData.email,
            'password': userData.password,
            'password_repeat': userData.passwordConfirmation,
            'first_name': userData.firstName,
            'last_name': userData.lastName,
            'timezone': userData.timezone
        }).then( (successResult) => {

            store.dispatch(
                setRegisterSuccess({
                    detail: successResult.data.detail,
                    isAPIRequestRunning: false,
                    errors: {},
                })
            );

            successCallback(successResult.data);

        }).catch( (errorResult) => {
            const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
            let errors = camelizeKeys(responseData);
            // console.log(errors);

            store.dispatch(
                setRegisterFailure({
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
