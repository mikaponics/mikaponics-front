import Scroll from 'react-scroll';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ApplicationCreateStep1Component from "../../../../components/account/applications/create/applicationCreateStep1Component";
import { pullProfile } from "../../../../actions/profileAction";
import {
    // localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem, localStorageGetDateItem, localStorageGetArrayItem
} from '../../../../helpers/localStorageUtility';
import { INSTRUMENT_OPTIONS } from "../../../../constants/api";
import { validateInput } from "../../../../validations/applicationValidator";


class ApplicationCreateStep2Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: localStorage.getItem("add-application-name"),
            description: localStorage.getItem("add-application-description"),
            errors: {},
            isLoading: false,
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            instrumentOptions: INSTRUMENT_OPTIONS
        });

        // Start the page at the top of the page.
        window.scrollTo(0, 0);
    }

    onTextChange(e) {
        // Update our state.
        this.setState({
            [e.target.name]: e.target.value,
        });

        // Update our persistent storage.
        const key = "add-application-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onNextClick(e) {
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/applications/add/step-2");
            return;
        }

        // CASE 2 OF 2: Validation failed.
        this.setState({
            errors: errors, isLoading: false,
        });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    render() {
        return (
            <ApplicationCreateStep1Component
                user={this.props.user}
                name={this.state.name}
                description={this.state.description}
                errors={this.state.errors}
                isLoading={this.state.isLoading}
                onTextChange={this.onTextChange}
                onMultiChange={this.onMultiChange}
                onNextClick={this.onNextClick}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationCreateStep2Container);
