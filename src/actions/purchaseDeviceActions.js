import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { PURCHASE_DEVICE_REQUEST, PURCHASE_DEVICE_SUCCESS, PURCHASE_DEVICE_FAILURE } from "../constants/actionTypes";
import { MIKAPONICS_PURCHASE_DEVICE_API_URL } from "../constants/api";


export const setPurchaseDeviceRequest = () => ({
    type: PURCHASE_DEVICE_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setPurchaseDeviceSuccess = purchaseDevice => ({
    type: PURCHASE_DEVICE_SUCCESS,
    payload: purchaseDevice,
});


export const setPurchaseDeviceFailure = purchaseDevice => ({
    type: PURCHASE_DEVICE_FAILURE,
    payload: purchaseDevice,
});


export function pullPurchaseDevice(user) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setPurchaseDeviceRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_PURCHASE_DEVICE_API_URL,
            config
        ).then( (successResult) => { // SUCCESS
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let purchaseDevice = camelizeKeys(responseData);

            // Extra.
            purchaseDevice['isAPIRequestRunning'] = false;
            purchaseDevice['errors'] = {};

            // console.log(purchaseDevice); // For debugging purposes.

            // Update the global state of the application to store our
            // user purchaseDevice for the application.
            store.dispatch(
                setPurchaseDeviceSuccess(purchaseDevice)
            );

        }).catch( (errorResult) => { // ERROR
            // // console.log(errorResult);
            // alert("Error fetching latest purchaseDevice");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setPurchaseDeviceFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


export function postPurchaseDevice(user, data, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setPurchaseDeviceRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        axios.post(MIKAPONICS_PURCHASE_DEVICE_API_URL, decamelizedData, config).then( (successResult) => {

            const responseData = successResult.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Run our success callback function.
            successCallback(device);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setPurchaseDeviceSuccess(device)
            );
        }).catch( (errorResult) => {
            console.error(errorResult);
            const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
            let errors = camelizeKeys(responseData);
            // console.log(errors);

            // Run our failure callback function.
            failedCallback(errors);

            store.dispatch(
                setPurchaseDeviceFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => {
            // Do nothing.
        });

    }
}
