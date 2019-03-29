import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import RegisterComponent from '../components/registerComponent';
// import validateInput from "../validations/register";
import { ACTIVE_SUBSCRIPTION_STATUS } from "../constants/api"
import { attemptRegister, attemptRestRegisterForm } from "../actions/registerAction";


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

    // isValid() {
    //     const { errors, isValid } = validateInput(this.state);
    //
    //     if (!isValid) {
    //         this.setState({
    //             errors: errors,
    //             isLoading: false
    //         })
    //     }
    //
    //     return isValid;
    // }

    onSubmit(e) {
        e.preventDefault();
        this.props.attemptRegister(this.state);

        // if (this.isValid()) {
        //     this.props.attemptRegister(this.state);
        // }
    }

    render () {
        const { email, password, passwordConfirmation, firstName, lastName, timezone } = this.state;
        const { user } = this.props;

        const isLoading = user.isAPIRequestRunning ? true : false;
        const errors = user.errors ? user.errors : {};

        if (user !== undefined && user.token !== undefined && user.token !== null) {
            if (user.subscription_status === ACTIVE_SUBSCRIPTION_STATUS) {
                return <Redirect to={"/dashboard"} />;
            } else {
                return <Redirect to={"/onboard"} />;
            }
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
        attemptRegister: (userData) => {
            dispatch(attemptRegister(userData))
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
