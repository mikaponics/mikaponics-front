import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { attemptLogout } from "../../actions/loginAction";
import OnboardPurchaseComponent from "../../components/onboardPurchaseComponent";


class OnboardPurchaseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfDevices: "1",
            user: this.props.user
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {

        const { numberOfDevices, user } = this.state;

        return (
            <OnboardPurchaseComponent
               onChange={this.onChange}
               onSubmit={this.onSubmit}
               user={user}
               errors={user.errors}
               numberOfDevices={numberOfDevices}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        attemptLogout: () => {
            dispatch(
                attemptLogout()
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnboardPurchaseContainer);
