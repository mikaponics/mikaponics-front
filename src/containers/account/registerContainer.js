import React from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import RegisterComponent from '../../components/account/registerComponent';
import { postRegister, attemptRestRegisterForm } from "../../actions/registerAction";


class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            lastName: '',
            timezone: '',
            referrer: '',
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // When this component loads up, we want to clear any previous errors
        // returned in the state so do so now.
        if (this.props.user.errors !== undefined && this.props.user.errors !== null) {
            var keyCount = Object.keys(this.props.user.errors).length;
            if (keyCount > 0) {
                this.props.attemptRestRegisterForm();
            }
        }
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.postRegister(
            this.state,
            (data) => {
                console.log(data); // Do nothing.
            },
            (data) => {
                console.log(data);

                // The following code will cause the screen to scroll to the top of
                // the page. Please see ``react-scroll`` for more information:
                // https://github.com/fisshy/react-scroll
                var scroll = Scroll.animateScroll;
                scroll.scrollToTop();
            }
        );
    }

    render () {
        const { email, password, passwordConfirmation, firstName, lastName, timezone } = this.state;
        const { user } = this.props;

        const isLoading = user.isAPIRequestRunning ? true : false;
        const errors = user.errors ? user.errors : {};

        if (user !== undefined && user.token !== undefined && user.token !== null) {
            return <Redirect to={"/register-success"} />;
        }

        return (
            <RegisterComponent
                email={email}
                password={password}
                passwordConfirmation={passwordConfirmation}
                firstName={firstName}
                lastName={lastName}
                timezone={timezone}
                errors={errors}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                isLoading={isLoading}
            />
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        postRegister: (userData, successCallback, failureCallback) => {
            dispatch(postRegister(userData, successCallback, failureCallback))
        },
        attemptRestRegisterForm: () => {
            dispatch(attemptRestRegisterForm())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer);
