import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { CROP_SUBSTRATE_LIST_REQUEST, CROP_SUBSTRATE_LIST_FAILURE, CROP_SUBSTRATE_LIST_SUCCESS } from '../constants/actionTypes';
import { MIKAPONICS_CROP_SUBSTRATE_LIST_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


export const setCropSubstrateListRequest = () => ({
    type: CROP_SUBSTRATE_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setCropSubstrateListFailure = (info) => ({
    type: CROP_SUBSTRATE_LIST_FAILURE,
    payload: info,
});


export const setCropSubstrateListSuccess = (info) => ({
    type: CROP_SUBSTRATE_LIST_SUCCESS,
    payload: info,
});


/**
 *  Function will pull the ``crop substrates`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullCropSubstrateList(user, page=1, typeOf=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setCropSubstrateListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL.
        let aURL = MIKAPONICS_CROP_SUBSTRATE_LIST_API_URL+"?page="+page;

        // Append our URL parameter if we have a `type_of` variable to filter
        // by.
        if (typeOf !== null && typeOf !== undefined) {
            aURL = aURL +"&type_of="+typeOf;
        }

        // Make the API call.
        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            // console.log(successResult); // For debugging purposes.

            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            data['page'] = page;

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setCropSubstrateListSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullCropSubstrateList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setCropSubstrateListFailure({
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
