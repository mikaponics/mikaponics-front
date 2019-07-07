import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize } from 'humps';
import isEmpty from 'lodash/isEmpty';
import msgpack from 'msgpack-lite';

import {
    PROBLEM_DATA_SHEET_LIST_REQUEST,
    PROBLEM_DATA_SHEET_LIST_FAILURE,
    PROBLEM_DATA_SHEET_LIST_SUCCESS
} from '../constants/actionTypes';
import { MIKAPONICS_PROBLEM_DATA_SHEET_LIST_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


export const setProblemDataSheetListRequest = () => ({
    type: PROBLEM_DATA_SHEET_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setProblemDataSheetListFailure = (info) => ({
    type: PROBLEM_DATA_SHEET_LIST_FAILURE,
    payload: info,
});


export const setProblemDataSheetListSuccess = (info) => ({
    type: PROBLEM_DATA_SHEET_LIST_SUCCESS,
    payload: info,
});


/**
 *  Function will pull the ``crop`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullProblemDataSheetList(page=1, filtersMap=new Map(), successCallback=null, failedCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProblemDataSheetListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL.
        let aURL = MIKAPONICS_PROBLEM_DATA_SHEET_LIST_API_URL+"?page="+page;

        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        // Generate our URL parameters based on the Javascript filter map.
        filtersMap.forEach(
            (value, key) => {
                let decamelizedkey = decamelize(key)
                aURL += "&"+decamelizedkey+"="+value;
            }
        )

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
                setProblemDataSheetListSuccess(data)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (successCallback) {
                successCallback(data);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullProblemDataSheetList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setProblemDataSheetListFailure({
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


/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getProblemReactSelectOptions(problemList=[], selectName="problems") {
    const problemOptions = [];
    const isNotProductionsEmpty = isEmpty(problemList) === false;
    if (isNotProductionsEmpty) {
        const results = problemList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let problem = results[i];
                problemOptions.push({
                    selectName: selectName,
                    value: problem.slug,
                    label: problem.text  // Important difference in API.
                });
                // console.log(problem);
            }
        }
    }
    return problemOptions;
}
