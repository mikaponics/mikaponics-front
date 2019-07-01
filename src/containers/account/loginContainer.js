
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import LoginComponent from '../../components/account/loginComponent';
import validateInput from "../../validations/login";
import { attemptLoginRestForm, attemptLogin } from "../../actions/loginAction";
import { clearFlashMessage } from "../../actions/flashMessageActions";


class LoginContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

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

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();

        this.setState({ errors: {}, isLoading: true, })
        this.props.attemptLogin(this.state.email, this.state.password);
    }

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
        // When this component loads up, we want to clear any previous errors
        // returned in the state so do so now.
        if (this.props.user.errors !== undefined && this.props.user.errors !== null) {
            var keyCount = Object.keys(this.props.user.errors).length;
            if (keyCount > 0) {
                this.props.attemptLoginRestForm();
            }
        }
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render() {
        const { email, password } = this.state;
        const { user, flashMessage } = this.props;

        const isLoading = user.isAPIRequestRunning ? true : false;
        const errors = user.errors ? user.errors : {};

        if (user !== undefined && user.token !== undefined && user.token !== null) {
            return <Redirect to="/dashboard" />;
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
        attemptLogin: (email, password) => {
            dispatch(attemptLogin(email, password))
        },
        attemptLoginRestForm: () => {
            dispatch(attemptLoginRestForm())
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
