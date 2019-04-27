import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import {
    INVOICE_LIST_REQUEST,
    INVOICE_LIST_FAILURE,
    INVOICE_LIST_SUCCESS,
    CLEAR_INVOICE_LIST
} from '../constants/actionTypes';
import {
    MIKAPONICS_INVOICE_LIST_API_URL
} from '../constants/api';


export const setInvoiceListRequest = () => ({
    type: INVOICE_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setInvoiceListFailure = (info) => ({
    type: INVOICE_LIST_FAILURE,
    payload: info,
});


export const setInvoiceListSuccess = (info) => ({
    type: INVOICE_LIST_SUCCESS,
    payload: info,
});


export const setClearInvoiceList = () => ({
    type: CLEAR_INVOICE_LIST,
    payload: {},
});


/**
 *  Function will pull the ``invoice`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullInvoiceList(user, pageIndex=1) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setInvoiceListRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_INVOICE_LIST_API_URL+"?page="+pageIndex,
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
                setInvoiceListSuccess(profile)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            // alert("Error fetching latest invoice.");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setInvoiceListFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
