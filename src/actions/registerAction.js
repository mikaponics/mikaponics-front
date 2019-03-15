import axios from 'axios';
import store from '../store';

import { REGISTER_REST_FORM, REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS } from "../constants/actionTypes"
import { MIKAPONICS_REGISTER_API_URL } from "../constants/api"


export const setRegisterRestForm = () => ({
    type: REGISTER_REST_FORM,
    payload: {
        isAPIRequestRunning: false,
        errors: {}
    },
});

export function attemptRestRegisterForm() {
    return dispatch => {
        store.dispatch(
            setRegisterRestForm()
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


export function attemptRegister(userData) {
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
                    id: successResult.data.id,
                    token: successResult.data.token,
                    scope: successResult.data.scope,
                    firstName: successResult.data.first_name,
                    lastName: successResult.data.last_name,

                    isAPIRequestRunning: false,
                    errors: {},
                })
            );

        }).catch( (errorResult) => {
            console.log(errorResult);
            store.dispatch(
                setRegisterFailure({
                    isAPIRequestRunning: false,
                    errors: {
                        email: errorResult.response.data.email,
                        password: errorResult.response.data.password,
                        passwordConfirmation: errorResult.response.data.password_repeat,
                        firstName: errorResult.response.data.first_name,
                        lastName: errorResult.response.data.last_name,
                        timezone: errorResult.response.data.timezone,
                        nonFieldErrors: errorResult.response.data.non_field_errors
                    }
                })
            );

        }).then( () => {
            // Do nothing.
        });

    }
}
