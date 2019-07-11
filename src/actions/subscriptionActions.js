import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS, SUBSCRIPTION_FAILURE } from "../constants/actionTypes";
import { MIKAPONICS_SUBSCRIPTION_API_URL } from "../constants/api";
import getCustomAxios from '../helpers/customAxios';
import { getAccessTokenFromLocalStorage, attachAxiosRefreshTokenHandler } from '../helpers/tokenUtility';


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

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

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


export function postSubscription(data, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setSubscriptionRequest()
        );

        // IMPORTANT: THIS IS THE ONLY WAY WE CAN GET THE ACCESS TOKEN.
        const accessToken = getAccessTokenFromLocalStorage();

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            headers: {
                'Authorization': "Bearer " + accessToken.token,
                'Content-Type': 'application/json;',
                'Accept': 'application/json',
            },
        });

        // Attach our Axios "refesh token" interceptor.
        attachAxiosRefreshTokenHandler(customAxios);

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.post(MIKAPONICS_SUBSCRIPTION_API_URL, decamelizedData).then( (successResponse) => {
            let subscriptionReceipt = camelizeKeys(successResponse.data);

            // Extra.
            subscriptionReceipt['isAPIRequestRunning'] = false;
            subscriptionReceipt['errors'] = {};

            // Update the global state of the application to store our
            // user subscription receipt for the application.
            store.dispatch(
                setSubscriptionSuccess(subscriptionReceipt)
            );

            // Run our success callback function.
            successCallback(subscriptionReceipt);

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
                let errors = camelizeKeys(responseData);

                console.error(errors); // For debugging purposes only.

                // Run our failure callback function.
                failedCallback(errors);

                store.dispatch(
                    setSubscriptionFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );
            }
        }).then( () => {
            // Do nothing.
        });

    }
}


export function deleteSubscription(user, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setSubscriptionRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Perform our API submission.
        customAxios.delete(MIKAPONICS_SUBSCRIPTION_API_URL).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let subscriptionReceipt = camelizeKeys(responseData);

            // Extra.
            subscriptionReceipt['isAPIRequestRunning'] = false;
            subscriptionReceipt['errors'] = {};

            // Update the global state of the application to store our
            // user subscription receipt for the application.
            store.dispatch(
                setSubscriptionSuccess(subscriptionReceipt)
            );

            // Run our success callback function.
            successCallback(subscriptionReceipt);

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.error(errors); // For debugging purposes only.

                // Run our failure callback function.
                failedCallback(errors);

                store.dispatch(
                    setSubscriptionFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );
            }

        }).then( () => {
            // Do nothing.
        });

    }
}
