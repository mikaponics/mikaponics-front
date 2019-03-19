import axios from 'axios';
import store from '../store';

import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from "../constants/actionTypes";
import { MIKAPONICS_GET_PROFILE_API_URL } from "../constants/api";


export const setProfileRequest = () => ({
    type: PROFILE_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProfileSuccess = profile => ({
    type: PROFILE_SUCCESS,
    payload: profile,
});


export const setProfileFailure = profile => ({
    type: PROFILE_FAILURE,
    payload: profile,
});


export function refreshUser(user) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProfileRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            headers: {'Authorization': "Bearer " + user.token}
        };

        axios.get(
            MIKAPONICS_GET_PROFILE_API_URL,
            config
        ).then( (successResult) => { // SUCCESS

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setProfileSuccess({
                    id: successResult.data.id,
                    token: successResult.data.token,
                    scope: successResult.data.scope,
                    firstName: successResult.data.first_name,
                    lastName: successResult.data.last_name,

                    isAPIRequestRunning: false,
                    errors: {},
                    /**
                    ,"report_email_frequency":"2"
                    ,"type_of":"0",
                    "customer_id":null,
                    "customer_data":null,
                    "subscription_status":"not_interested",
                    "email":"bart@mikasoftware.com",
                    "first_name":"Bart","middle_name":null,
                    "last_name":"Mika",
                    "avatar":"","birthdate":null,"nationality":null,"gender":null,
                    "billing_country":null,"billing_region":null,"billing_locality":null,"billing_street_address":null,
                    "billing_street_address_extra":null,"billing_postal_code":null,"billing_post_office_box_number":null,
                    "billing_email":null,"billing_telephone":null,"shipping_country":null,"shipping_region":null,
                    "shipping_locality":null,"shipping_street_address":null,"shipping_street_address_extra":null,
                    "shipping_postal_code":null,"shipping_post_office_box_number":null,"shipping_email":null,
                    "shipping_telephone":null}
                    */
                })
            );

        }).catch( (errorResult) => { // ERROR

            store.dispatch(
                setProfileFailure({
                    isAPIRequestRunning: false,
                    errors: errorResult.response.data
                })
            );

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}
