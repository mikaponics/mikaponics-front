import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import {
    PRODUCTION_INSPECTION_LIST_REQUEST, PRODUCTION_INSPECTION_LIST_SUCCESS, PRODUCTION_INSPECTION_LIST_FAILURE,
    PRODUCTION_INSPECTION_DETAIL_REQUEST, PRODUCTION_INSPECTION_DETAIL_SUCCESS, PRODUCTION_INSPECTION_DETAIL_FAILURE,
} from "../constants/actionTypes";
import {
    MIKAPONICS_PRODUCTION_INSPECTION_LIST_CREATE_API_URL,
    MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_UPDATE_API_URL,
    MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_OR_CREATE_DEFAULT_DRAFT_API_URL,
} from "../constants/api";
import getCustomAxios from '../helpers/customAxios';


export const setProductionInspectionListRequest = () => ({
    type: PRODUCTION_INSPECTION_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProductionInspectionListSuccess = productionList => ({
    type: PRODUCTION_INSPECTION_LIST_SUCCESS,
    payload: productionList,
});


export const setProductionInspectionListFailure = productionList => ({
    type: PRODUCTION_INSPECTION_LIST_FAILURE,
    payload: productionList,
});


export function pullProductionInspectionList(user, page=1, productionSlugFilter=null, stateFilter=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProductionInspectionListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        let aURL = MIKAPONICS_PRODUCTION_INSPECTION_LIST_CREATE_API_URL+"?page="+page;
        if (productionSlugFilter !== undefined && productionSlugFilter !== null) {
            aURL += "&production_slug="+productionSlugFilter;
        }
        if (stateFilter !== undefined && stateFilter !== null) {
            aURL += "&state="+stateFilter;
        }

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let productionList = camelizeKeys(responseData);

            // Extra.
            productionList['isAPIRequestRunning'] = false;
            productionList['errors'] = {};

            // console.log(productionList); // For debugging purposes.

            // Update the global state of the application to store our
            // user productionList for the application.
            store.dispatch(
                setProductionInspectionListSuccess(productionList)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullProductionInspectionList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setProductionInspectionListFailure({
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

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_OR_CREATE_DEFAULT_DRAFT_API_URL+productionSlug;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let productionInspection = camelizeKeys(responseData);

            // Extra.
            productionInspection['isAPIRequestRunning'] = false;
            productionInspection['errors'] = {};

            // console.log(productionInspection); // For debugging purposes.

            // Update the global state of the application to store our
            // user productionInspection for the application.
            store.dispatch(
                setProductionInspectionDetailSuccess(productionInspection)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setProductionInspectionDetailFailure({
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


export function pullProductionInspectionDetail(user, slug, successCallback=null, failedCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProductionInspectionDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_UPDATE_API_URL+slug;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            // console.log(successResult); // For debugging purposes.

            let productionInspection = camelizeKeys(responseData);

            // Extra.
            productionInspection['isAPIRequestRunning'] = false;
            productionInspection['errors'] = {};

            // console.log(productionInspection); // For debugging purposes.

            // Update the global state of the application to store our
            // user productionInspection for the application.
            store.dispatch(
                setProductionInspectionDetailSuccess(productionInspection)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (successCallback) {
                successCallback(productionInspection);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setProductionInspectionDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (failedCallback) {
                    failedCallback(errors);
                }
            }

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
//             let productionInspection = camelizeKeys(responseData);
//
//             // Extra.
//             productionInspection['isAPIRequestRunning'] = false;
//             productionInspection['errors'] = {};
//
//             // console.log(productionInspection); // For debugging purposes.
//
//             // Update the global state of the application to store our
//             // user productionInspection for the application.
//             store.dispatch(
//                 setProductionInspectionDetailSuccess(productionInspection)
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


export function putProductionInspectionDetail(user, data, slug, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setProductionInspectionDetailRequest()
        );

        // For debugging purposes only.
        if (failedCallback === undefined || failedCallback === null) {
            alert("failedCallback is null value in parameter!");
            return;
        }

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();


        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        const url = MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_UPDATE_API_URL+slug;

        // Perform our API submission.
        customAxios.put(url, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setProductionInspectionDetailSuccess(device)
            );

            // Run our success callback function.
            successCallback(device);

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setProductionInspectionDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (failedCallback) {
                    failedCallback(errors);
                }
            }

        }).then( () => {
            // Do nothing.
        });

    }
}
