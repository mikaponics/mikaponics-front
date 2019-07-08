import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import DeviceCreateStep3IntegrateComponent from "../../../components/devices/create/deviceCreateStep3IntegrateComponent";
import { localStorageGetArrayItem } from "../../../helpers/localStorageUtility";
import { pullProfile } from "../../../actions/profileAction";


class DeviceCreateStep3IntegrateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: localStorageGetArrayItem("add-device-instruments"),
            errors: {},
            isLoading: false,
        }
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onAPICall = this.onAPICall.bind(this);
    }

    componentDidMount() {
        const { user } = this.props;

        // Run the async code to fetch the latest profile information from the
        // server and save the latest user's details into our global state.
        // Make the authenticated call to our web-service.
        this.props.pullProfile(user);

        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    }

    onSubmitClick(e) {
        e.preventDefault();
        this.setState(
            { errors: {}, isLoading: true },
            ()=>{
                alert("TODO: IMPLEMENT");
            }
        );
    }

    onAPICall() {
        // Create a new Axios instance which will be sending and receiving in
        // MessagePack (Buffer) format.
        const customAxios = axios.create({
            headers: {
                'Content-Type': 'application/msgpack;',
                'Accept': 'application/msgpack',
            },
            responseType: 'arraybuffer'
        });

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode({
            // 'email': email,
            // 'password': password,
        });

        const aURL = process.env.REACT_APP_API_HOST+'/api/devices/authorize';

        customAxios.post(aURL, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let data = camelizeKeys(responseData);

            // console.log("postLogin | successResponse:", data); // For debugging purposes.

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};

            // // DEVELOPERS NOTE:
            // // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // // OBJECT WE GOT FROM THE API.
            // if (successCallback) {
            //     successCallback(data);
            // }

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                // // DEVELOPERS NOTE:
                // // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // // OBJECT WE GOT FROM THE API.
                // if (failedCallback) {
                //     failedCallback(errors);
                // }
            }

        }).then( () => {
            // Do nothing.
        });
    }

    onSuccessfulSubmissionCallback(data) {
        this.setState(
            { errors: {}, isLoading: false },
            ()=>{

            }
        );
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false });
    }

    render() {
        return (
            <DeviceCreateStep3IntegrateComponent
                user={this.props.user}
                instruments={this.state.instruments}
                errors={this.state.errors}
                isLoading={this.state.isLoading}
                onSubmitClick={this.onSubmitClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (user) => {
            dispatch(pullProfile(user))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep3IntegrateContainer);
