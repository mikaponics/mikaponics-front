import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import {
    CROP_DATA_SHEET_LIST_REQUEST,
    CROP_DATA_SHEET_LIST_FAILURE,
    CROP_DATA_SHEET_LIST_SUCCESS
} from '../constants/actionTypes';
import { MIKAPONICS_CROP_DATA_SHEET_LIST_API_URL } from '../constants/api';


export const setCropDataSheetListRequest = () => ({
    type: CROP_DATA_SHEET_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setCropDataSheetListFailure = (info) => ({
    type: CROP_DATA_SHEET_LIST_FAILURE,
    payload: info,
});


export const setCropDataSheetListSuccess = (info) => ({
    type: CROP_DATA_SHEET_LIST_SUCCESS,
    payload: info,
});


/**
 *  Function will pull the ``crop`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullCropDataSheetList(user, page=1, typeOf=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setCropDataSheetListRequest()
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

        // Generate the URL.
        let aURL = MIKAPONICS_CROP_DATA_SHEET_LIST_API_URL+"?page="+page;

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
                setCropDataSheetListSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullCropDataSheetList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setCropDataSheetListFailure({
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
