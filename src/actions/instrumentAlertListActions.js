import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import { INSTRUMENT_ALERT_LIST_REQUEST, INSTRUMENT_ALERT_LIST_FAILURE, INSTRUMENT_ALERT_LIST_SUCCESS, CLEAR_INSTRUMENT_ALERT_LIST } from '../constants/actionTypes';
import { MIKAPONICS_INSTRUMENT_ALERT_LIST_API_URL } from '../constants/api';


export const setInstrumentAlertListRequest = () => ({
    type: INSTRUMENT_ALERT_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setInstrumentAlertListFailure = (info) => ({
    type: INSTRUMENT_ALERT_LIST_FAILURE,
    payload: info,
});


export const setInstrumentAlertListSuccess = (info) => ({
    type: INSTRUMENT_ALERT_LIST_SUCCESS,
    payload: info,
});


export const setClearInstrumentAlertList = () => ({
    type: CLEAR_INSTRUMENT_ALERT_LIST,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullInstrumentAlertList(user, instrumentSlug=null, page=1) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setInstrumentAlertListRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        // Generate the URL.
        let aURL = "";
        if (instrumentSlug) {
            aURL = MIKAPONICS_INSTRUMENT_ALERT_LIST_API_URL+"?instrument_slug="+instrumentSlug+"&page="+page;
        } else {
            aURL = MIKAPONICS_INSTRUMENT_ALERT_LIST_API_URL+"?page="+page;
        }

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
                setInstrumentAlertListSuccess(data)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            alert("Error fetching latest data");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setInstrumentAlertListFailure({
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
