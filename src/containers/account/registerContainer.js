import React from 'react';
import Scroll from 'react-scroll';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import RegisterComponent from '../../components/account/registerComponent';
import { postRegister, clearRegister } from "../../actions/registerAction";


class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);

        const referralCode = this.props.match.params['referral']

        this.state = {
            email: '',
            password: '',
            passwordRepeat: '',
            firstName: '',
            lastName: '',
            timezone: '',
            referrer: '',
            hasSignedTos: false,
            referralCode: referralCode,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // When this component loads up, we want to clear any previous errors
        // returned in the state so do so now.
        if (this.props.user.errors !== undefined && this.props.user.errors !== null) {
            var keyCount = Object.keys(this.props.user.errors).length;
            if (keyCount > 0) {
                this.props.clearRegister();
            }
        }
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        this.props.clearRegister();
    }

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
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
        const { email, password, passwordRepeat, firstName, lastName, timezone, hasSignedTos, referralCode } = this.state;
        const { user } = this.props;

        const isLoading = user.isAPIRequestRunning ? true : false;
        const errors = user.errors ? user.errors : {};

        // The following code will check to see what the user details are and
        // if we have a "Your account was been registered" text has been
        // detected then we move the user to the success page.
        if (user !== undefined && user !== null) {
            const userLength = Object.keys(user).length;
            if (userLength > 0) {
                var myJSON = JSON.stringify(user);
                if (myJSON.includes("Your account has been registered") === true) {
                    return <Redirect to={"/register-success"} />;
                }
            }
        }

        return (
            <RegisterComponent
                email={email}
                password={password}
                passwordRepeat={passwordRepeat}
                firstName={firstName}
                lastName={lastName}
                timezone={timezone}
                hasSignedTos={hasSignedTos}
                referralCode={referralCode}
                errors={errors}
                onTextChange={this.onTextChange}
                onCheckboxChange={this.onCheckboxChange}
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
        clearRegister: () => {
            dispatch(clearRegister())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer);
