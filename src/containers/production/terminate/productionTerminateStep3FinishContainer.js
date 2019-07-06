import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import ProductionTerminateStep3FinishComponent from "../../../components/production/terminate/productionTerminateStep3FinishComponent";
import { putProductionTerminationDetail } from "../../../actions/productionActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import {
    localStorageGetArrayItem,
    localStorageGetDateItem,
    localStorageGetObjectItem,
    localStorageGetBooleanItem
} from "../../../helpers/localStorageUtility";


class ProductionTerminateStep3FinishContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // inspections start
        const finishedAtDate = localStorageGetDateItem("temp-production-terminate-finishedAt");
        const finishedAtMoment = moment(finishedAtDate);
        const finishedAt = finishedAtMoment.format("YYYY-MM-DD")

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            slug: slug, // Place this because of API requirement.
            crops: localStorageGetArrayItem("temp-production-terminate-crops"),
            productionSlug: slug,
            productionName: this.props.productionDetail.name,
            finishedAt: finishedAt,
            wasSuccess: localStorageGetBooleanItem("temp-production-terminate-wasSuccess"),
            wasSuccessLabel: localStorage.getItem("temp-production-terminate-wasSuccess-label"),
            failureReason: localStorage.getItem("temp-production-terminate-failureReason"),
            notes: localStorage.getItem("temp-production-terminate-notes"),
        }
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
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

    onBackClick(e) {
        e.preventDefault();
        let len = this.state.crops.length;
        len -= 1;
        const aURL = '/production/'+ this.state.pageSlug + '/terminate-crop/'+len.toString()
        this.props.history.push(aURL);
    }

    onSubmitClick(e) {
        e.preventDefault();
        console.log(this.state); // For debugging purposes only.
        this.setState({ errors: {}, isLoading: true });

        // // Once our state has been validated `client-side` then we will
        // // make an API request with the server to create our new production.
        this.props.putProductionTerminationDetail(
            this.state,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    onSuccessfulSubmissionCallback() {
        this.props.setFlashMessage("success", "This production has been successfully terminated.");
        this.props.history.push('/productions');
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const {
            crops, productionSlug, productionName, finishedAt, wasSuccess, wasSuccessOptions,
            wasSuccessLabel, failureReason, notes, errors, isLoading
        } = this.state;
        return (
            <ProductionTerminateStep3FinishComponent
                user={this.props.user}
                crops={crops}
                productionSlug={productionSlug}
                productionName={productionName}
                finishedAt={finishedAt}
                wasSuccess={wasSuccess}
                wasSuccessOptions={wasSuccessOptions}
                wasSuccessLabel={wasSuccessLabel}
                failureReason={failureReason}
                notes={notes}
                errors={errors}
                isLoading={isLoading}
                productionDetail={this.props.productionDetail}
                onSubmitClick={this.onSubmitClick}
                onBackClick={this.onBackClick}
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
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putProductionTerminationDetail: (state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                putProductionTerminationDetail(state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTerminateStep3FinishContainer);
