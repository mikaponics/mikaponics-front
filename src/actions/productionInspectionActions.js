import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';

import {
    // PRODUCTION_INSPECTION_LIST_REQUEST, PRODUCTION_INSPECTION_LIST_SUCCESS, PRODUCTION_INSPECTION_LIST_FAILURE,
    PRODUCTION_INSPECTION_DETAIL_REQUEST, PRODUCTION_INSPECTION_DETAIL_SUCCESS, PRODUCTION_INSPECTION_DETAIL_FAILURE,
} from "../constants/actionTypes";
import {
    MIKAPONICS_PRODUCTION_INSPECTION_LIST_CREATE_API_URL,
    MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_UPDATE_API_URL,
    MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_OR_CREATE_DEFAULT_DRAFT_API_URL,
} from "../constants/api";


// export const setProductionInspectionListRequest = () => ({
//     type: PRODUCTION_INSPECTION_LIST_REQUEST,
//     payload: {
//         isAPIRequestRunning: true,
//         errors: {}
//     },
// });
//
//
// export const setProductionInspectionListSuccess = productionList => ({
//     type: PRODUCTION_INSPECTION_LIST_SUCCESS,
//     payload: productionList,
// });
//
//
// export const setProductionInspectionListFailure = productionList => ({
//     type: PRODUCTION_INSPECTION_LIST_FAILURE,
//     payload: productionList,
// });
//
//
// export function pullProductionInspectionList(user, page=1) {
//     return dispatch => {
//         // Change the global state to attempting to fetch latest user details.
//         store.dispatch(
//             setProductionInspectionListRequest()
//         );
//
//         // Create our oAuth 2.0 authenticated API header to use with our
//         // submission.
//         const config = {
//             headers: {'Authorization': "Bearer " + user.token}
//         };
//
//         axios.get(
//             MIKAPONICS_PRODUCTION_INSPECTION_LIST_CREATE_API_URL+"?page="+page,
//             config
//         ).then( (successResult) => { // SUCCESS
//             // console.log(successResult); // For debugging purposes.
//
//             const responseData = successResult.data;
//             let productionList = camelizeKeys(responseData);
//
//             // Extra.
//             productionList['isAPIRequestRunning'] = false;
//             productionList['errors'] = {};
//
//             // console.log(productionList); // For debugging purposes.
//
//             // Update the global state of the application to store our
//             // user productionList for the application.
//             store.dispatch(
//                 setProductionInspectionListSuccess(productionList)
//             );
//
//         }).catch( (errorResult) => { // ERROR
//             // // console.log(errorResult);
//             // alert("Error fetching latest productionList");
//
//             const responseData = errorResult.data;
//             let errors = camelizeKeys(responseData);
//
//             store.dispatch(
//                 setProductionInspectionListFailure({
//                     isAPIRequestRunning: false,
//                     errors: errors
//                 })
//             );
//
//         }).then( () => { // FINALLY
//             // Do nothing.
//         });
//
//     }
// }


export const setProductionInspectionDetailRequest = () => ({
    type: PRODUCTION_INSPECTION_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProductionInspectionDetailSuccess = productionList => ({
    type: PRODUCTION_INSPECTION_DETAIL_SUCCESS,
    payload: productionList,
});


export const setProductionInspectionDetailFailure = productionList => ({
    type: PRODUCTION_INSPECTION_DETAIL_FAILURE,
    payload: productionList,
});



export function pullDefaultDraftProductionInspectionDetail(user, productionSlug) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProductionInspectionDetailRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        const aURL = MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_OR_CREATE_DEFAULT_DRAFT_API_URL+productionSlug;

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
                setProductionInspectionDetailSuccess(profile)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            // alert("Error fetching latest invoice.");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setProductionInspectionDetailFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}



// /**
//  *  Function will pull the ``production`` API endpoint and override our
//  *  global application state for the 'dashboard'.
//  */
// export function pullProductionInspectionDetail(user, slug) {
//     return dispatch => {
//         // Change the global state to attempting to fetch latest user details.
//         store.dispatch(
//             setProductionInspectionDetailRequest()
//         );
//
//         // Create our oAuth 2.0 authenticated API header to use with our
//         // submission.
//         const config = {
//             headers: {'Authorization': "Bearer " + user.token}
//         };
//
//         const aURL = MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_UPDATE_API_URL+slug;
//
//         axios.get(
//             aURL,
//             config
//         ).then( (successResult) => { // SUCCESS
//             // console.log(successResult); // For debugging purposes.
//
//             const responseData = successResult.data;
//             let profile = camelizeKeys(responseData);
//
//             // Extra.
//             profile['isAPIRequestRunning'] = false;
//             profile['errors'] = {};
//
//             // console.log(profile); // For debugging purposes.
//
//             // Update the global state of the application to store our
//             // user profile for the application.
//             store.dispatch(
//                 setProductionInspectionDetailSuccess(profile)
//             );
//
//         }).catch( (errorResult) => { // ERROR
//             // console.log(errorResult);
//             // alert("Error fetching latest invoice.");
//
//             const responseData = errorResult.data;
//             let errors = camelizeKeys(responseData);
//
//             store.dispatch(
//                 setProductionInspectionDetailFailure({
//                     isAPIRequestRunning: false,
//                     errors: errors
//                 })
//             );
//
//         }).then( () => { // FINALLY
//             // Do nothing.
//         });
//
//     }
// }
//
//
// export function putProductionInspectionDetail(user, data, successCallback, failedCallback) {
//     return dispatch => {
//         // Change the global state to attempting to log in.
//         store.dispatch(
//             setProductionInspectionDetailRequest()
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
//         const url = MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_UPDATE_API_URL+data.slug;
//
//         // Perform our API submission.
//         axios.put(url, decamelizedData, config).then( (successResult) => {
//
//             const responseData = successResult.data;
//             let device = camelizeKeys(responseData);
//
//             // Extra.
//             device['isAPIRequestRunning'] = false;
//             device['errors'] = {};
//
//             // Update the global state of the application to store our
//             // user device for the application.
//             store.dispatch(
//                 setProductionInspectionDetailSuccess(device)
//             );
//
//             // Run our success callback function.
//             successCallback(device);
//
//         }).catch( (errorResult) => {
//             // console.error("postProductionInspectionDetail - ERROR",errorResult);
//             const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
//             let errors = camelizeKeys(responseData);
//             // console.log(errors);
//
//             store.dispatch(
//                 setProductionInspectionDetailFailure({
//                     isAPIRequestRunning: false,
//                     errors: errors
//                 })
//             );
//
//             // Run our failure callback function.
//             failedCallback(errors);
//
//         }).then( () => {
//             // Do nothing.
//         });
//
//     }
// }
