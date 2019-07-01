import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

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

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            headers: {
                'Content-Type': 'application/msgpack;',
                'Accept': 'application/msgpack',
            },
            responseType: 'arraybuffer'
        });

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode({
            'password': formData.password,
            'password_repeat': formData.passwordConfirmation,
            'pr_access_code': formData.accessCode,
        });

        customAxios.post(MIKAPONICS_PASSWORD_RESET_API_URL, buffer).then( (successResponse) => {

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
                setResetPasswordSuccess(profile)
            );

            // User profile is returned in the success callback function.
            successCallback(profile);

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setResetPasswordFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (failureCallback) {
                    failureCallback(errors);
                }
            }

        }).then( () => {
            // Do nothing.
        });

    }
}
