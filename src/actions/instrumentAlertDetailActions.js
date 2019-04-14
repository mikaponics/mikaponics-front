import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import {
    INSTRUMENT_ALERT_DETAIL_REQUEST, INSTRUMENT_ALERT_DETAIL_FAILURE, INSTRUMENT_ALERT_DETAIL_SUCCESS, CLEAR_INSTRUMENT_ALERT_DETAIL
} from '../constants/actionTypes';
import {
    MIKAPONICS_INSTRUMENT_ALERT_DETAIL_API_URL
} from '../constants/api';


export const setInstrumentAlertDetailRequest = () => ({
    type: INSTRUMENT_ALERT_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setInstrumentAlertDetailFailure = (info) => ({
    type: INSTRUMENT_ALERT_DETAIL_FAILURE,
    payload: info,
});


export const setInstrumentAlertDetailSuccess = (info) => ({
    type: INSTRUMENT_ALERT_DETAIL_SUCCESS,
    payload: info,
});


export const setClearInstrumentAlertDetail = () => ({
    type: CLEAR_INSTRUMENT_ALERT_DETAIL,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullInstrumentAlertDetail(user, instrumentSlug=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setInstrumentAlertDetailRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // Generate the URL.
        const aURL = MIKAPONICS_INSTRUMENT_ALERT_DETAIL_API_URL+instrumentSlug;

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

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setInstrumentAlertDetailSuccess(data)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            alert("Error fetching latest data");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setInstrumentAlertDetailFailure({
                    isAPIRequestRunning: false,
                    errors: errors,
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
