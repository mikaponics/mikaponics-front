import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { PRODUCTION_LIST_REQUEST, PRODUCTION_LIST_SUCCESS, PRODUCTION_LIST_FAILURE } from "../constants/actionTypes";
import { MIKAPONICS_PRODUCTION_LIST_CREATE_API_URL } from "../constants/api";


export const setProductionListRequest = () => ({
    type: PRODUCTION_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProductionListSuccess = productionList => ({
    type: PRODUCTION_LIST_SUCCESS,
    payload: productionList,
});


export const setProductionListFailure = productionList => ({
    type: PRODUCTION_LIST_FAILURE,
    payload: productionList,
});


export function pullProductionList(user, page=1) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProductionListRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_PRODUCTION_LIST_CREATE_API_URL+"?page="+page,
            config
        ).then( (successResult) => { // SUCCESS
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let productionList = camelizeKeys(responseData);

            // Extra.
            productionList['isAPIRequestRunning'] = false;
            productionList['errors'] = {};

            // console.log(productionList); // For debugging purposes.

            // Update the global state of the application to store our
            // user productionList for the application.
            store.dispatch(
                setProductionListSuccess(productionList)
            );

        }).catch( (errorResult) => { // ERROR
            // // console.log(errorResult);
            // alert("Error fetching latest productionList");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setProductionListFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}


// export function postOnboarding(user, data, successCallback, failedCallback) {
//     return dispatch => {
//         // Change the global state to attempting to log in.
//         store.dispatch(
//             setOnboardingRequest()
//         );
//
//         // Create our oAuth 2.0 authenticated API header to use with our
//         // submission.
//         const config = {
//             headers: {'Authorization': "Bearer " + user.token}
//         };
//
//         // The following code will convert the `camelized` data into `snake case`
//         // data so our API endpoint will be able to read it.
//         let decamelizedData = decamelizeKeys(data);
//
//         // Perform our API submission.
//         axios.post(MIKAPONICS_PRODUCTION_LIST_CREATE_API_URL, decamelizedData, config).then( (successResult) => {
//
//             const responseData = successResult.data;
//             let device = camelizeKeys(responseData);
//
//             // Extra.
//             device['isAPIRequestRunning'] = false;
//             device['errors'] = {};
//
//             // Run our success callback function.
//             successCallback(device);
//
//             // Update the global state of the application to store our
//             // user device for the application.
//             store.dispatch(
//                 setOnboardingSuccess(device)
//             );
//         }).catch( (errorResult) => {
//             console.error(errorResult);
//             const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
//             let errors = camelizeKeys(responseData);
//             // console.log(errors);
//
//             // Run our failure callback function.
//             failedCallback(errors);
//
//             store.dispatch(
//                 setOnboardingFailure({
//                     isAPIRequestRunning: false,
//                     errors: errors
//                 })
//             );
//
//         }).then( () => {
//             // Do nothing.
//         });
//
//     }
// }
