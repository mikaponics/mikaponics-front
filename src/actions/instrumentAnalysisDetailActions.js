import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import { INSTRUMENT_ANALYSIS_DETAIL_REQUEST, INSTRUMENT_ANALYSIS_DETAIL_FAILURE, INSTRUMENT_ANALYSIS_DETAIL_SUCCESS, CLEAR_INSTRUMENT_ANALYSIS_DETAIL } from '../constants/actionTypes';
import { MIKAPONICS_INSTRUMENT_ANALYSIS_RETRIEVE_UPDATE_DELETE_API_URL } from '../constants/api';


export const setInstrumentAnalysisDetailRequest = () => ({
    type: INSTRUMENT_ANALYSIS_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setInstrumentAnalysisDetailFailure = (info) => ({
    type: INSTRUMENT_ANALYSIS_DETAIL_FAILURE,
    payload: info,
});


export const setInstrumentAnalysisDetailSuccess = (info) => ({
    type: INSTRUMENT_ANALYSIS_DETAIL_SUCCESS,
    payload: info,
});


export const setClearInstrumentAnalysisDetail = () => ({
    type: CLEAR_INSTRUMENT_ANALYSIS_DETAIL,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullInstrumentAnalysisDetail(user, analysisSlug=null, page=1) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setInstrumentAnalysisDetailRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // Generate the URL.
        let aURL = MIKAPONICS_INSTRUMENT_ANALYSIS_RETRIEVE_UPDATE_DELETE_API_URL+"/"+analysisSlug

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
                setInstrumentAnalysisDetailSuccess(data)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(">>>",errorResult);
            // alert("Error fetching latest data");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setInstrumentAnalysisDetailFailure({
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
