import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS, SUBSCRIPTION_FAILURE } from "../constants/actionTypes";
import { MIKAPONICS_SUBSCRIPTION_API_URL } from "../constants/api";


export const setSubscriptionRequest = () => ({
    type: SUBSCRIPTION_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setSubscriptionSuccess = subscription => ({
    type: SUBSCRIPTION_SUCCESS,
    payload: subscription,
});


export const setSubscriptionFailure = subscription => ({
    type: SUBSCRIPTION_FAILURE,
    payload: subscription,
});


export function pullSubscription(user) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setSubscriptionRequest()
        );

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            headers: {
                'Authorization': "Bearer " + user.token,
                'Content-Type': 'application/msgpack;',
                'Accept': 'application/msgpack',
            },
            responseType: 'arraybuffer'
        });

        customAxios.get(MIKAPONICS_SUBSCRIPTION_API_URL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let subscription = camelizeKeys(responseData);

            // Extra.
            subscription['isAPIRequestRunning'] = false;
            subscription['errors'] = {};

            // console.log(subscription); // For debugging purposes.

            // Update the global state of the application to store our
            // user subscription for the application.
            store.dispatch(
                setSubscriptionSuccess(subscription)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullProductionInspectionList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setSubscriptionFailure({
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

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
