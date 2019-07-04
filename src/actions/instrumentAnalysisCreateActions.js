import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { INSTRUMENT_ANALYSIS_CREATE_REQUEST, INSTRUMENT_ANALYSIS_CREATE_FAILURE, INSTRUMENT_ANALYSIS_CREATE_SUCCESS, CLEAR_INSTRUMENT_ANALYSIS_CREATE } from '../constants/actionTypes';
import { MIKAPONICS_INSTRUMENT_ANALYSIS_LIST_CREATE_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


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
export function postInstrumentAnalysisCreate(user, instrumentSlug, data) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setInstrumentAnalysisCreateRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL.
        let aURL = MIKAPONICS_INSTRUMENT_ANALYSIS_LIST_CREATE_API_URL;

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(aURL, buffer).then( (successResponse) => {
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
                setInstrumentAnalysisCreateSuccess(data)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postInstrumentAnalysisCreate | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setInstrumentAnalysisCreateFailure({
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
