import axios from 'axios';
import store from '../store';

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

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setLoginSuccess({
                    id: successResult.data.id,
                    token: successResult.data.token,
                    scope: successResult.data.scope,
                    firstName: successResult.data.first_name,
                    lastName: successResult.data.last_name,


                    isAPIRequestRunning: false,
                    errors: {},
                    /**
                    ,"report_email_frequency":"2"
                    ,"type_of":"0",
                    "customer_id":null,
                    "customer_data":null,
                    "subscription_status":"not_interested",
                    "email":"bart@mikasoftware.com",
                    "first_name":"Bart","middle_name":null,
                    "last_name":"Mika",
                    "avatar":"","birthdate":null,"nationality":null,"gender":null,
                    "billing_country":null,"billing_region":null,"billing_locality":null,"billing_street_address":null,
                    "billing_street_address_extra":null,"billing_postal_code":null,"billing_post_office_box_number":null,
                    "billing_email":null,"billing_telephone":null,"shipping_country":null,"shipping_region":null,
                    "shipping_locality":null,"shipping_street_address":null,"shipping_street_address_extra":null,
                    "shipping_postal_code":null,"shipping_post_office_box_number":null,"shipping_email":null,
                    "shipping_telephone":null}
                    */
                })
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
