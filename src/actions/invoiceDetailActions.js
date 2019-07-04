import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import {
    INVOICE_DETAIL_REQUEST,
    INVOICE_DETAIL_FAILURE,
    INVOICE_DETAIL_SUCCESS,
    CLEAR_INVOICE_DETAIL
} from '../constants/actionTypes';
import { MIKAPONICS_INVOICE_DETAIL_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


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

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = MIKAPONICS_INVOICE_DETAIL_API_URL+slug;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
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
                setInvoiceDetailSuccess(profile)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullInstrumentAnalysisDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setInvoiceDetailFailure({
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
