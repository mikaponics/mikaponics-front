import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ProductionTerminateStep3FinishComponent from "../../../components/production/terminate/productionTerminateStep3FinishComponent";
// import { putProductionDetail } from "../../../actions/productionActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { PRODUCTION_TERMINATED_STATE } from "../../../constants/api";
import {
    localStorageGetArrayItem,
    localStorageGetDateItem,
    localStorageGetObjectItem
} from "../../../helpers/localStorageUtility";


class ProductionTerminateStep3FinishContainer extends Component {

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
            crops: localStorageGetArrayItem("temp-production-terminate-crops"),
            productionSlug: slug,
            productionName: this.props.productionDetail.name,
            finishedAt: localStorageGetDateItem("temp-production-terminate-finishedAt"),
            wasSuccessAtFinish: localStorage.getItem("temp-production-terminate-wasSuccessAtFinish"),
            wasSuccessAtFinishLabel: localStorage.getItem("temp-production-terminate-wasSuccessAtFinish-label"),
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

        // Change the state of the object and then submit to API endpoint.
        this.setState({
            state: PRODUCTION_TERMINATED_STATE
        },() => {
            //TODO: IMPL.
        });
    }

    onSuccessfulSubmissionCallback() {
        this.props.setFlashMessage("success", "This production has been successfully terminated.");
        this.props.history.push('/productions');
    }

    onFailedSubmissionCallback() {
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
            crops, productionSlug, productionName, finishedAt, wasSuccessAtFinish, wasSuccessAtFinishOptions,
            wasSuccessAtFinishLabel, failureReason, notes, errors, isLoading
        } = this.state;
        return (
            <ProductionTerminateStep3FinishComponent
                user={this.props.user}
                crops={crops}
                productionSlug={productionSlug}
                productionName={productionName}
                finishedAt={finishedAt}
                wasSuccessAtFinish={wasSuccessAtFinish}
                wasSuccessAtFinishOptions={wasSuccessAtFinishOptions}
                wasSuccessAtFinishLabel={wasSuccessAtFinishLabel}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTerminateStep3FinishContainer);
