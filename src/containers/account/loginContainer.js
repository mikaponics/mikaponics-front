import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Scroll from 'react-scroll';

import LoginComponent from '../../components/account/loginComponent';
import validateInput from "../../validations/login";
import { postLogin } from "../../actions/loginAction";
import { clearFlashMessage } from "../../actions/flashMessageActions";


class LoginContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
            referrer: '',
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    /**
     *  Function will redirect the user, using the browsers redirect function,
     *  to the user's respected dashboard.
     */
    onSuccessfulSubmissionCallback(profile) {
        this.setState({
            errors: {},
            isLoading: false ,
            referrer: '/dashboard'
        });
        // this.props.history.push("/dashboard");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }


    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({
                errors: errors,
                isLoading: false
            });
        }

        return isValid;
    }

    onSubmit(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // Clear any and all flash messages in our queue to be rendered.
            this.props.clearFlashMessage();

            this.setState({ errors: {}, isLoading: true, })
            this.props.postLogin(
                this.state.email,
                this.state.password,
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { email, password, referrer } = this.state;
        const { user, flashMessage } = this.props;

        const isLoading = user.isAPIRequestRunning ? true : false;
        const errors = user.errors ? user.errors : {};

        if (referrer !== undefined && referrer !== null && referrer !== "") {
            return <Redirect to={referrer} />;
        }

        return (
            <LoginComponent
                email={email}
                password={password}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                errors={errors}
                isLoading={isLoading}
                flashMessage={flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postLogin: (email, password, successCallback, failedCallback) => {
            dispatch(postLogin(email, password, successCallback, failedCallback))
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
