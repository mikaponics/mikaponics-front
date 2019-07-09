import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import ApplicationListComponent from '../../../components/account/applications/applicationListComponent';
import { pullApplicationList } from "../../../actions/applicationActions";


class ApplicationListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        }
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    componentDidMount() {
        this.props.pullApplicationList();

        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    }

    onSuccessfulSubmissionCallback() {
        // Do nothing.
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })
    }

    render() {
        const { referrer } = this.state;
        const { user } = this.props;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        return (
            <ApplicationListComponent
                user={user}
                applicationList={this.props.applicationList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        applicationList: store.applicationListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullApplicationList: (successCallback, failureCallback) => {
            dispatch(pullApplicationList(successCallback, failureCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationListContainer);
