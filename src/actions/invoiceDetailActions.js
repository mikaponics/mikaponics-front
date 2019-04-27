import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import {
    INVOICE_DETAIL_REQUEST,
    INVOICE_DETAIL_FAILURE,
    INVOICE_DETAIL_SUCCESS,
    CLEAR_INVOICE_DETAIL
} from '../constants/actionTypes';
import {
    MIKAPONICS_INVOICE_DETAIL_API_URL
} from '../constants/api';


export const setInvoiceDetailRequest = () => ({
    type: INVOICE_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setInvoiceDetailFailure = (info) => ({
    type: INVOICE_DETAIL_FAILURE,
    payload: info,
});


export const setInvoiceDetailSuccess = (info) => ({
    type: INVOICE_DETAIL_SUCCESS,
    payload: info,
});


export const setClearInvoiceDetail = () => ({
    type: CLEAR_INVOICE_DETAIL,
    payload: {},
});


/**
 *  Function will pull the ``invoice`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullInvoiceDetail(user, slug) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setInvoiceDetailRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        const aURL = MIKAPONICS_INVOICE_DETAIL_API_URL+slug;

        axios.get(
            aURL,
            config
        ).then( (successResult) => { // SUCCESS
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // console.log(profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setInvoiceDetailSuccess(profile)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            // alert("Error fetching latest invoice.");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setInvoiceDetailFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
