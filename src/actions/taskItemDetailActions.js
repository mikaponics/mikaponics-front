import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import {
    TASK_ITEM_DETAIL_REQUEST,
    TASK_ITEM_DETAIL_FAILURE,
    TASK_ITEM_DETAIL_SUCCESS,
    CLEAR_TASK_ITEM_DETAIL
} from '../constants/actionTypes';
import {
    MIKAPONICS_TASK_ITEM_DETAIL_API_URL,
    MIKAPONICS_TASK_ITEM_WAS_VIEWED_FUNC_API_URL
} from '../constants/api';


export const setTaskItemDetailRequest = () => ({
    type: TASK_ITEM_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setTaskItemDetailFailure = (info) => ({
    type: TASK_ITEM_DETAIL_FAILURE,
    payload: info,
});


export const setTaskItemDetailSuccess = (info) => ({
    type: TASK_ITEM_DETAIL_SUCCESS,
    payload: info,
});


export const setClearTaskItemDetail = () => ({
    type: CLEAR_TASK_ITEM_DETAIL,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullTaskItemDetail(user, instrumentSlug=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setTaskItemDetailRequest()
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
        const aURL = MIKAPONICS_TASK_ITEM_DETAIL_API_URL+instrumentSlug;

        // Make the API call.
        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            // console.log(successResult); // For debugging purposes.

            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setTaskItemDetailSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullTaskItemDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setTaskItemDetailFailure({
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


// export function postTaskItemDetailWasViewed(user, taskSlug) {
//     return dispatch => {
//         // Change the global state to attempting to fetch latest user details.
//         store.dispatch(
//             setTaskItemDetailRequest()
//         );
//
//         // Create our oAuth 2.0 authenticated API header to use with our
//         // submission.
//         const config = {
//             headers: {'Authorization': "Bearer " + user.token}
//         };
//
//         // Generate the URL.
//         let aURL = MIKAPONICS_TASK_ITEM_WAS_VIEWED_FUNC_API_URL+taskSlug;
//
//         // Perform our API submission.
//         axios.post(aURL, {}, config).then( (successResult) => {
//             // console.log(successResult); // For debugging purposes.
//
//             const responseData = successResult.data;
//             let data = camelizeKeys(responseData);
//
//             // Extra.
//             data['isAPIRequestRunning'] = false;
//             data['errors'] = {};
//
//             // console.log(data); // For debugging purposes.
//
//             // Update the global state of the application to store our
//             // user data for the application.
//             store.dispatch(
//                 setTaskItemDetailSuccess(data)
//             );
//
//         }).catch( (errorResult) => { // ERROR
//             // console.log(errorResult);
//             // task("Error fetching latest data");
//
//             const responseData = errorResult.response.data;
//             let errors = camelizeKeys(responseData);
//
//             store.dispatch(
//                 setTaskItemDetailFailure({
//                     isAPIRequestRunning: false,
//                     errors: errors,
//                 })
//             );
//
//         }).then( () => { // FINALLY
//             // Do nothing.
//         });
//
//     }
// }
