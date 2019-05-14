import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';

import {
    // PRODUCTION_CROP_INSPECTION_LIST_REQUEST, PRODUCTION_CROP_INSPECTION_LIST_SUCCESS, PRODUCTION_CROP_INSPECTION_LIST_FAILURE,
    PRODUCTION_CROP_INSPECTION_DETAIL_REQUEST, PRODUCTION_CROP_INSPECTION_DETAIL_SUCCESS, PRODUCTION_CROP_INSPECTION_DETAIL_FAILURE,
} from "../constants/actionTypes";
import {
    MIKAPONICS_PRODUCTION_CROP_INSPECTION_LIST_CREATE_API_URL,
    MIKAPONICS_PRODUCTION_CROP_INSPECTION_RETRIEVE_UPDATE_API_URL
} from "../constants/api";


// export const setProductionCropInspectionListRequest = () => ({
//     type: PRODUCTION_CROP_INSPECTION_LIST_REQUEST,
//     payload: {
//         isAPIRequestRunning: true,
//         errors: {}
//     },
// });
//
//
// export const setProductionCropInspectionListSuccess = productionList => ({
//     type: PRODUCTION_CROP_INSPECTION_LIST_SUCCESS,
//     payload: productionList,
// });
//
//
// export const setProductionCropInspectionListFailure = productionList => ({
//     type: PRODUCTION_CROP_INSPECTION_LIST_FAILURE,
//     payload: productionList,
// });
//
//
// export function pullProductionCropInspectionList(user, page=1) {
//     return dispatch => {
//         // Change the global state to attempting to fetch latest user details.
//         store.dispatch(
//             setProductionCropInspectionListRequest()
//         );
//
//         // Create our oAuth 2.0 authenticated API header to use with our
//         // submission.
//         const config = {
//             headers: {'Authorization': "Bearer " + user.token}
//         };
//
//         axios.get(
//             MIKAPONICS_PRODUCTION_CROP_INSPECTION_LIST_CREATE_API_URL+"?page="+page,
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
//                 setProductionCropInspectionListSuccess(productionList)
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
//                 setProductionCropInspectionListFailure({
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


export const setProductionCropInspectionDetailRequest = () => ({
    type: PRODUCTION_CROP_INSPECTION_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProductionCropInspectionDetailSuccess = productionList => ({
    type: PRODUCTION_CROP_INSPECTION_DETAIL_SUCCESS,
    payload: productionList,
});


export const setProductionCropInspectionDetailFailure = productionList => ({
    type: PRODUCTION_CROP_INSPECTION_DETAIL_FAILURE,
    payload: productionList,
});



export function pullProductionCropInspectionDetail(user, slug) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProductionCropInspectionDetailRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        const aURL = MIKAPONICS_PRODUCTION_CROP_INSPECTION_RETRIEVE_UPDATE_API_URL+slug;

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
                setProductionCropInspectionDetailSuccess(profile)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            // alert("Error fetching latest invoice.");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setProductionCropInspectionDetailFailure({
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
// export function pullProductionCropInspectionDetail(user, slug) {
//     return dispatch => {
//         // Change the global state to attempting to fetch latest user details.
//         store.dispatch(
//             setProductionCropInspectionDetailRequest()
//         );
//
//         // Create our oAuth 2.0 authenticated API header to use with our
//         // submission.
//         const config = {
//             headers: {'Authorization': "Bearer " + user.token}
//         };
//
//         const aURL = MIKAPONICS_PRODUCTION_CROP_INSPECTION_RETRIEVE_UPDATE_API_URL+slug;
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
//                 setProductionCropInspectionDetailSuccess(profile)
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
//                 setProductionCropInspectionDetailFailure({
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


export function putProductionCropInspectionDetail(user, data, slug, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setProductionCropInspectionDetailRequest()
        );

        // For debugging purposes only.
        if (failedCallback === undefined || failedCallback === null) {
            alert("failedCallback is null value in parameter!");
            return;
        }

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        const url = MIKAPONICS_PRODUCTION_CROP_INSPECTION_RETRIEVE_UPDATE_API_URL+slug;

        // Perform our API submission.
        axios.put(url, decamelizedData, config).then( (successResult) => {

            const responseData = successResult.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setProductionCropInspectionDetailSuccess(device)
            );

            // Run our success callback function.
            successCallback(device);

        }).catch( (errorResult) => {
            // console.error("postProductionCropInspectionDetail - ERROR",errorResult);
            const responseData = errorResult.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
            let errors = camelizeKeys(responseData);
            // console.log(errors);

            store.dispatch(
                setProductionCropInspectionDetailFailure({
                    isAPIRequestRunning: false,
                    errors: errors
                })
            );

            // Run our failure callback function.
            if (failedCallback !== undefined && failedCallback !== null) {
                failedCallback(errors);
            }

        }).then( () => {
            // Do nothing.
        });

    }
}
