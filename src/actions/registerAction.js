import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

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

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            headers: {
                'Content-Type': 'application/msgpack;',
                'Accept': 'application/msgpack',
            },
            responseType: 'arraybuffer'
        });

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(userData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        customAxios.post(MIKAPONICS_REGISTER_API_URL, buffer).then( (successResponse) => {

            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            store.dispatch(
                setRegisterSuccess({
                    detail: responseData.detail,
                    isAPIRequestRunning: false,
                    errors: {},
                })
            );

            successCallback(responseData);

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setRegisterFailure({
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
