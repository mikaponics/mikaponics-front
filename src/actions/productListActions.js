import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAILURE,
    PRODUCT_LIST_SUCCESS
} from '../constants/actionTypes';
import { MIKAPONICS_PRODUCT_LIST_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


export const setProductListRequest = () => ({
    type: PRODUCT_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProductListFailure = (info) => ({
    type: PRODUCT_LIST_FAILURE,
    payload: info,
});


export const setProductListSuccess = (info) => ({
    type: PRODUCT_LIST_SUCCESS,
    payload: info,
});


/**
 *  Function will pull the ``product`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullProductList(user, pageIndex=1) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProductListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        customAxios.get(MIKAPONICS_PRODUCT_LIST_API_URL+"?page="+pageIndex).then( (successResponse) => { // SUCCESS
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
                setProductListSuccess(profile)
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
                    setProductListFailure({
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
