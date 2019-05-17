import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

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

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // Generate the URL.
        let aURL = MIKAPONICS_CROP_DATA_SHEET_LIST_API_URL+"?page="+page;

        // Append our URL parameter if we have a `type_of` variable to filter
        // by.
        if (typeOf !== null && typeOf !== undefined) {
            aURL = aURL +"&type_of="+typeOf;
        }

        // Make the API call.
        axios.get(
            aURL,
            config
        ).then( (successResult) => { // SUCCESS
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
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

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            // alert("Error fetching latest data");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setCropDataSheetListFailure({
                    isAPIRequestRunning: false,
                    errors: errors,
                    page: page,
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
