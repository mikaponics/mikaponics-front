import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import { TIME_SERIES_DATA_REQUEST, TIME_SERIES_DATA_FAILURE, TIME_SERIES_DATA_SUCCESS, CLEAR_TIME_SERIES_DATA } from '../constants/actionTypes';
import { MIKAPONICS_GET_TIME_SERIES_DATA_API_URL } from '../constants/api';


export const setTimeSeriesDataRequest = () => ({
    type: TIME_SERIES_DATA_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setTimeSeriesDataFailure = (info) => ({
    type: TIME_SERIES_DATA_FAILURE,
    payload: info,
});


export const setTimeSeriesDataSuccess = (info) => ({
    type: TIME_SERIES_DATA_SUCCESS,
    payload: info,
});


export const setClearTimeSeriesData = () => ({
    type: CLEAR_TIME_SERIES_DATA,
    payload: {},
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullTimeSeriesData(user, instrumentSlug, page=1) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setTimeSeriesDataRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_GET_TIME_SERIES_DATA_API_URL+"?slug="+instrumentSlug+"&page="+page,
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
                setTimeSeriesDataSuccess(data)
            );

        }).catch( (errorResult) => { // ERROR
            // console.log(errorResult);
            alert("Error fetching latest data");

            const responseData = errorResult.data;
            let errors = camelizeKeys(responseData);

            store.dispatch(
                setTimeSeriesDataFailure({
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
