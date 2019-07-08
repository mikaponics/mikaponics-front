import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { LOGOUT_REQUEST, LOGOUT_FAILURE, LOGOUT_SUCCESS } from "../constants/actionTypes"
import { MIKAPONICS_LOGOUT_API_URL } from "../constants/api"
import { getAccessTokenFromLocalStorage, attachAxiosRefreshTokenHandler } from '../helpers/tokenUtility';


export const setLogoutRequest = () => ({
    type: LOGOUT_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


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


export const setLogoutFailure = payload => ({
    type: LOGOUT_FAILURE,
    payload: payload,
});


export function postLogout(user) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLogoutRequest()
        );

        attemptLogout();

        // Generate the URL.
        let aURL = MIKAPONICS_LOGOUT_API_URL;

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();
        
        const decamelizedData = {
            token: user.token
        }

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        customAxios.post(aURL, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setLogoutSuccess()
            );

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setLogoutFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // // DEVELOPERS NOTE:
                // // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // // OBJECT WE GOT FROM THE API.
                // if (failedCallback) {
                //     failedCallback(errors);
                // }
            }

        }).then( () => {
            // Do nothing.
        });
    }
}
