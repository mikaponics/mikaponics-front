import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { INSTRUMENT_ANALYSIS_DETAIL_REQUEST, INSTRUMENT_ANALYSIS_DETAIL_FAILURE, INSTRUMENT_ANALYSIS_DETAIL_SUCCESS, CLEAR_INSTRUMENT_ANALYSIS_DETAIL } from '../constants/actionTypes';
import { MIKAPONICS_INSTRUMENT_ANALYSIS_RETRIEVE_UPDATE_DELETE_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


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

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL.
        let aURL = MIKAPONICS_INSTRUMENT_ANALYSIS_RETRIEVE_UPDATE_DELETE_API_URL+"/"+analysisSlug

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
                setInstrumentAnalysisDetailSuccess(data)
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
                    setInstrumentAnalysisDetailFailure({
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
