import { SET_PROFILE } from "../constants/actionTypes"


export const setProfileAction = profile => ({
    type: SET_PROFILE,
    payload: profile,
});
