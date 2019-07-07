import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import { Redirect } from 'react-router-dom';

import ProductionInspectionCreateStep3FinishComponent from "../../../../components/production/inspection/create/productionInspectionCreateStep3FinishComponent";
import { postProductionInspectionDetail } from "../../../../actions/productionInspectionActions";
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

        // Convert our string value into a boolean value.
        let didPass = localStorage.getItem("temp-production-inspection-create-didPass");
        if (didPass === "false") {
            didPass = false;
        }
        else if(didPass === "true") {
            didPass = true
        }

        this.state = {
            isLoading: false,
            errors: {},
            slug: slug,
            production: slug,
            cropInspections: cropInspections,
            didPass: didPass,
            didPassLabel: localStorage.getItem("temp-production-inspection-create-didPass-label"),
            notes: localStorage.getItem("temp-production-inspection-create-notes"),
            failureReason: localStorage.getItem("temp-production-inspection-create-failureReason"),
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

        const { slug, cropInspections } = this.state;
        const len = cropInspections.length - 1;
        const aURL = '/production/'+ slug + '/create-inspection/crop/'+len.toString();
        this.props.history.push(aURL);
    }

    onSubmitClick(e) {
        e.preventDefault();
        console.log(this.state); // For debugging purposes only.
        this.setState({ errors: {}, isLoading: true, })

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        this.props.postProductionInspectionDetail(
            this.state,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    onSuccessfulSubmissionCallback() {
        this.setState({ errors: {}, });
        this.props.setFlashMessage("success", "Inspection has been successfully created.");
        this.props.history.push(this.props.productionDetail.absoluteUrl+"/inspection");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

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
            slug, isLoading, errors, didPass, didPassLabel, failureReason, notes, cropInspections
        } = this.state;
        if (slug === undefined || slug === "undefined") { // Defensive Code: Prevent undefined values.
            alert("Error - Cannot have `undefined` in URL slug, redirecting back to `/productions`.")
            return <Redirect to="/productions" />
        }
        return (
            <ProductionInspectionCreateStep3FinishComponent
                productionDetail={this.props.productionDetail}
                cropInspections={cropInspections}
                didPassLabel={didPassLabel}
                didPass={didPass}
                failureReason={failureReason}
                notes={notes}
                cropInspections={cropInspections}
                errors={errors}
                onBackClick={this.onBackClick}
                onSubmitClick={this.onSubmitClick}
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postProductionInspectionDetail: (state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                postProductionInspectionDetail(state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionCreateFinishContainer);
