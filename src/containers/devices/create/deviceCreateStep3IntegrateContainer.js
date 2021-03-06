import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import DeviceCreateStep3IntegrateComponent from "../../../components/devices/create/deviceCreateStep3IntegrateComponent";
import { localStorageGetArrayItem } from "../../../helpers/localStorageUtility";
import { pullProfile } from "../../../actions/profileAction";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import getCustomAxios from '../../../helpers/customAxios';


class DeviceCreateStep3IntegrateContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem("add-device-name"),
            description: localStorage.getItem("add-device-description"),
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
                this.onAPICall();
            }
        );
    }

    onAPICall() {
        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode({
            'name': this.state.name,
            'description': this.state.description,
            'instruments': this.state.instruments,
        });

        const aURL = process.env.REACT_APP_API_HOST+'/api/device-authorize';

        customAxios.post(aURL, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let data = camelizeKeys(responseData);

            // console.log("postLogin | successResponse:", data); // For debugging purposes.

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            this.onSuccessfulSubmissionCallback(data);

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);
                this.onFailedSubmissionCallback(errors);
            }

        }).then( () => {
            // Do nothing.
        });
    }

    onSuccessfulSubmissionCallback(data) {
        this.props.setFlashMessage("success", "Device has been successfully authorized.");
        this.props.history.push("/devices");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    render() {
        return (
            <DeviceCreateStep3IntegrateComponent
                user={this.props.user}
                name={this.state.name}
                description={this.state.description}
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep3IntegrateContainer);
