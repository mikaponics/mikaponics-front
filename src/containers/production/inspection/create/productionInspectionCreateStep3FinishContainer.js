import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ProductionInspectionCreateStep3FinishComponent from "../../../../components/production/inspection/create/productionInspectionCreateStep3FinishComponent";
import {
    pullDefaultDraftProductionInspectionDetail,
    putProductionInspectionDetail
} from "../../../../actions/productionInspectionActions";
import { PRODUCTION_INSPECTION_SUBMITTED_STATE } from '../../../../constants/api';
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { localStorageGetArrayItem } from "../../../../helpers/localStorageUtility";


class ProductionInspectionCreateFinishContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // Fetch our progress.
        const cropInspections = localStorageGetArrayItem("temp-production-inspection-create-cropInspections");

        this.state = {
            referrer: '',
            slug: slug,
            cropInspections: cropInspections,
            didPass: localStorage.getItem("temp-production-inspection-create-didPass"),
            didPassOption: {},
            didPassOptions: [{
                id: 'didPass-true-choice',
                name: 'didPass',
                value: true,
                label: 'Yes',
            },{
                id: 'didPass-false-choice',
                name: 'didPass',
                value: false,
                label: 'No',
            }],
            notes: localStorage.getItem("temp-production-inspection-create-notes"),
            failureReason: localStorage.getItem("temp-production-inspection-create-failureReason"),
        }

        this.onSubmit = this.onSubmit.bind(this);
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

        const { slug, cropInspections } = this.state;
        const len = cropInspections.length - 1;
        const aURL = '/production/'+ slug + '/create-inspection/crop/'+len.toString();
        this.props.history.push(aURL);
    }

    onSubmit(e) {
        e.preventDefault();

        // const data = {
        //     state: PRODUCTION_INSPECTION_SUBMITTED_STATE,
        //     didPass: this.props.productionInspectionDetail.didPass,
        //     failureReason: this.props.productionInspectionDetail.failureReason,
        //     notes: this.props.productionInspectionDetail.notes
        // };
        // console.log("onSubmit | data:", data); // For debugging purposes only.
        //
        // // Once our state has been validated `client-side` then we will
        // // make an API request with the server to create our new production.
        // this.props.putProductionInspectionDetail(
        //     this.props.user,
        //     data,
        //     this.props.productionInspectionDetail.slug,
        //     this.onSuccessfulSubmissionCallback,
        //     this.onFailedSubmissionCallback
        // );
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            errors: {},
        });
        this.props.setFlashMessage("success", "Inspection has been successfully created.");
        this.props.history.push(this.props.productionDetail.absoluteUrl+"/inspection");
    }

    onFailedSubmissionCallback() {
        this.setState({
            errors: this.props.productionInspectionDetail.errors
        })

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
        const { referrer, errors, didPass, didPassOptions, failureReason, notes, cropInspections } = this.state;
        return (
            <ProductionInspectionCreateStep3FinishComponent
                productionDetail={this.props.productionDetail}
                cropInspections={cropInspections}
                didPassOptions={didPassOptions}
                didPass={didPass}
                failureReason={failureReason}
                notes={notes}
                cropInspections={cropInspections}
                errors={errors}
                onBackClick={this.onBackClick}
                onSubmit={this.onSubmit}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productionDetail: store.productionDetailState,
        productionInspectionDetail: store.productionInspectionDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullDefaultDraftProductionInspectionDetail: (user, slug) => {
            dispatch(pullDefaultDraftProductionInspectionDetail(user, slug))
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putProductionInspectionDetail: (user, state, slug, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                putProductionInspectionDetail(user, state, slug, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionCreateFinishContainer);
