import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { INSTRUMENT_ANALYSIS_LIST_REQUEST, INSTRUMENT_ANALYSIS_LIST_FAILURE, INSTRUMENT_ANALYSIS_LIST_SUCCESS, CLEAR_INSTRUMENT_ANALYSIS_LIST } from '../constants/actionTypes';
import { MIKAPONICS_INSTRUMENT_ANALYSIS_LIST_CREATE_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


export const setInstrumentAnalysisListRequest = () => ({
    type: INSTRUMENT_ANALYSIS_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setInstrumentAnalysisListFailure = (info) => ({
    type: INSTRUMENT_ANALYSIS_LIST_FAILURE,
    payload: info,
});


export const setInstrumentAnalysisListSuccess = (info) => ({
    type: INSTRUMENT_ANALYSIS_LIST_SUCCESS,
    payload: info,
});


export const setClearInstrumentAnalysisList = () => ({
    type: CLEAR_INSTRUMENT_ANALYSIS_LIST,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullInstrumentAnalysisList(user, instrumentSlug=null, page=1) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setInstrumentAnalysisListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL.
        let aURL = "";
        if (instrumentSlug) {
            aURL = MIKAPONICS_INSTRUMENT_ANALYSIS_LIST_CREATE_API_URL+"?instrument_slug="+instrumentSlug+"&page="+page;
        } else {
            aURL = MIKAPONICS_INSTRUMENT_ANALYSIS_LIST_CREATE_API_URL+"?page="+page;
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
                setInstrumentAnalysisListSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullInstrumentAnalysisDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setInstrumentAnalysisListFailure({
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
