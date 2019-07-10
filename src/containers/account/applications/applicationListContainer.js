import React, { Component } from 'react';
import { connect } from 'react-redux';

import ApplicationListComponent from '../../../components/account/applications/applicationListComponent';
import { pullApplicationList, deleteApplication } from "../../../actions/applicationActions";


class ApplicationListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            isLoading: false,
        }
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onListSuccessCallback = this.onListSuccessCallback.bind(this);
        this.onListFailCallback = this.onListFailCallback.bind(this);
        this.onDeleteSuccessCallback = this.onDeleteSuccessCallback.bind(this);
        this.onDeleteFailCallback = this.onDeleteFailCallback.bind(this);
    }

    componentDidMount() {
        this.props.pullApplicationList(this.onListSuccessCallback, this.onListFailCallback);

        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    }

    onDeleteClick(e, slug) {
        this.setState({ errors: [], isLoading: true });
        this.props.deleteApplication(
            slug,
            this.onDeleteSuccessCallback,
            this.onDeleteFailCallback
        );
    }

    onListSuccessCallback() {
        this.setState({ errors: [], isLoading: false });
    }

    onListFailCallback(errors) {
        this.setState({ errors: errors, isLoading: false });
    }

    onDeleteSuccessCallback() {
        this.setState(
            { errors: [], isLoading: false },
            ()=> {
                this.props.pullApplicationList(this.onListSuccessCallback, this.onListFailCallback);
            }
        );
    }

    onDeleteFailCallback(errors) {
        this.setState({ errors: errors, isLoading: false });
    }

    render() {
        const { user } = this.props;
        return (
            <ApplicationListComponent
                user={user}
                isLoading={this.state.isLoading}
                applicationList={this.props.applicationList}
                onDeleteClick={this.onDeleteClick}
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
        deleteApplication: (slug, successCallback, failureCallback) => {
            dispatch(deleteApplication(slug, successCallback, failureCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationListContainer);
