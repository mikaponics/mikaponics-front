import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { INSTRUMENT_ANALYSIS_CREATE_REQUEST, INSTRUMENT_ANALYSIS_CREATE_FAILURE, INSTRUMENT_ANALYSIS_CREATE_SUCCESS, CLEAR_INSTRUMENT_ANALYSIS_CREATE } from '../constants/actionTypes';
import { MIKAPONICS_INSTRUMENT_ANALYSIS_LIST_CREATE_API_URL } from '../constants/api';


export const setInstrumentAnalysisCreateRequest = () => ({
    type: INSTRUMENT_ANALYSIS_CREATE_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setInstrumentAnalysisCreateFailure = (info) => ({
    type: INSTRUMENT_ANALYSIS_CREATE_FAILURE,
    payload: info,
});


export const setInstrumentAnalysisCreateSuccess = (info) => ({
    type: INSTRUMENT_ANALYSIS_CREATE_SUCCESS,
    payload: info,
});


export const setClearInstrumentAnalysisCreate = () => ({
    type: CLEAR_INSTRUMENT_ANALYSIS_CREATE,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function postInstrumentAnalysisCreate(user, instrumentSlug, data, successCallback=null, failedCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setInstrumentAnalysisCreateRequest()
        );

        console.log("--- postInstrumentAnalysisCreate ---");
        console.log("instrumentSlug >", instrumentSlug);
        console.log("data >", data);
        console.log("successCallback >", successCallback);
        console.log("failedCallback >", failedCallback);
        console.log("------------------------------------");

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // Generate the URL.
        let aURL = MIKAPONICS_INSTRUMENT_ANALYSIS_LIST_CREATE_API_URL;

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        axios.post(aURL, decamelizedData, config).then( (successResult) => {
            // console.log(successResult); // For debugging purposes.

            const responseData = successResult.data;
            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};

            // Run our success callback function.
            if (successCallback) {
                successCallback(data);
            }

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setInstrumentAnalysisCreateSuccess(data)
            );

        }).catch( (errorResult) => { // ERROR
            console.log(errorResult);
            // alert("Error fetching latest data");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            if (failedCallback) {
                failedCallback(errors);
            }

            store.dispatch(
                setInstrumentAnalysisCreateFailure({
                    isAPIRequestRunning: false,
                    errors: errors,
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
