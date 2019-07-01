import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

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

        customAxios.get(MIKAPONICS_INVOICE_LIST_API_URL+"?page="+pageIndex).then( (successResponse) => { // SUCCESS
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
                setInvoiceListSuccess(profile)
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
                    setInvoiceListFailure({
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
