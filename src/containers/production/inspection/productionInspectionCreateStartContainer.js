import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import ProductionInspectionCreateStartComponent from "../../../components/production/inspection/productionInspectionCreateStartComponent";
import {
    pullDefaultDraftProductionInspectionDetail,
    putProductionInspectionDetail
} from "../../../actions/productionInspectionActions";


class ProductionInspectionCreateStartContainer extends Component {

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
            referrer: '',
            slug: slug,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

         // Get latest data from API.
        this.props.pullDefaultDraftProductionInspectionDetail(this.props.user, this.props.productionDetail.slug);

        // IF THE API ENDPOINT RETURNS NONE, THAT MEANS WE MUST CHOOSE EITHER
        // "FALSE" OR "TRUE" TO ACTIVATE THE TERMINATION PHASE.
        let { didPass } = this.props.productionDetail;
        if (didPass === null || didPass === undefined) {
            didPass = false;
        }

        this.setState({
            // NEW VALUES FROM THIS SCREEN.
            // plants: this.props.productionDetail.plants,
            // fish: this.props.productionDetail.fish,
            crops: this.props.productionInspectionDetail.crops,
            didPass: didPass,
            failureReason: this.props.productionInspectionDetail.failureReason,
            notes: this.props.productionInspectionDetail.notes,
        });
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
        this.props.history.push(this.props.productionDetail.absoluteURL+"/inspection");
    }

    onSubmit(e) {
        e.preventDefault();

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        this.props.putProductionInspectionDetail(
            this.props.user,
            this.state,
            this.props.productionInspectionDetail.slug,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        })
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            errors: {},
        });
        const aURL = '/production/'+ this.state.slug + '/create-inspection/crop/0';
        this.props.history.push(aURL);
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
        const { referrer, errors, didPass, failureReason, notes, crops } = this.state;
        const { name, slug, plants, fish } = this.props.productionDetail;
        return (
            <ProductionInspectionCreateStartComponent
                productionInspectionDetail={this.props.productionInspectionDetail}
                productionDetail={this.props.productionDetail}
                name={name}
                slug={slug}
                errors={errors}
                didPass={didPass}
                failureReason={failureReason}
                notes={notes}
                plants={plants}
                fish={fish}
                crops={crops}
                onSubmit={this.onSubmit}
                onBackClick={this.onBackClick}
                onSelectChange={this.onSelectChange}
                onTextChange={this.onTextChange}
                onCheckboxChange={this.onCheckboxChange}
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
)(ProductionInspectionCreateStartContainer);
