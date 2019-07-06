import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import ProductionTerminateStep1StartComponent from "../../../components/production/terminate/productionTerminateStep1StartComponent";
import { localStorageGetDateItem, localStorageGetObjectItem, localStorageSetObjectOrArrayItem } from "../../../helpers/localStorageUtility";


class ProductionTerminateStartContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            referrer: null,
            errors: {},
            productionSlug: slug,
            productionName: this.props.productionDetail.name,
            finishedAt: localStorageGetDateItem("temp-production-terminate-finishedAt"),
            wasSuccessAtFinish: localStorageGetObjectItem("temp-production-terminate-wasSuccessAtFinish"),
            wasSuccessAtFinishOptions: [{
                id: 'wasSuccessAtFinish-true-choice',
                name: 'wasSuccessAtFinish',
                value: true,
                label: 'Yes',
            },{
                id: 'wasSuccessAtFinish-false-choice',
                name: 'wasSuccessAtFinish',
                value: false,
                label: 'No',
            }],
            failureReason: localStorage.getItem("temp-production-terminate-failureReason"),
            notes: localStorage.getItem("temp-production-terminate-notes"),
        }
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onFinishedAtChange = this.onFinishedAtChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        // this.onBackClick = this.onBackClick.bind(this);
        // this.onFinishedAtChange = this.onFinishedAtChange.bind(this);
        // this.onCheckboxChange = this.onCheckboxChange.bind(this);

        // this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        // this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onRadioChange(e) {
        // Get the values.
        const key = [e.target.name].toString();
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295

        // Generate our new keys.
        const storageValueKey = "temp-production-terminate-"+key;
        const storageLabelKey = "temp-production-terminate-"+key+"-label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.
    }

    onTextChange(e) {
        // Save to state.
        this.setState({
            [e.target.name]: e.target.value
        });

        // Save to storage.
        const storageValueKey = "temp-production-terminate-"+[e.target.name];
        localStorage.setItem(storageValueKey, e.target.value)
    }

    onFinishedAtChange(dateObj) {
        this.setState({
            finishedAt: dateObj,
        })
        localStorageSetObjectOrArrayItem('temp-production-terminate-finishedAt', dateObj);
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const {
            productionSlug, productionName, finishedAt, wasSuccessAtFinish, wasSuccessAtFinishOptions,
            failureReason, notes, errors
        } = this.state;
        return (
            <ProductionTerminateStep1StartComponent
                productionSlug={productionSlug}
                productionName={productionName}
                finishedAt={finishedAt}
                wasSuccessAtFinish={wasSuccessAtFinish}
                wasSuccessAtFinishOptions={wasSuccessAtFinishOptions}
                failureReason={failureReason}
                notes={notes}
                onRadioChange={this.onRadioChange}
                onTextChange={this.onTextChange}
                onFinishedAtChange={this.onFinishedAtChange}
                errors={errors}
            />
        );
    }
}


const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productionDetail: store.productionDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTerminateStartContainer);
