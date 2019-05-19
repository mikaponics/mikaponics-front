import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ProductionInspectionDetailomponent from "../../../components/production/inspection/productionInspectionDetailComponent";
import { pullProductionInspectionDetail } from "../../../actions/productionInspectionActions";
import { PRODUCTION_INSPECTION_SUBMITTED_STATE } from '../../../constants/api';


class ProductionInspectionDetailContainer extends Component {

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
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullProductionInspectionDetail(
            this.props.user,
            this.state.slug,
            null,
            null
        )
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
        const aURL = '/production/:slug/inspection';
        this.props.history.push(aURL);
    }

    onSubmit(e) {
        e.preventDefault();

        // // Once our state has been validated `client-side` then we will
        // // make an API request with the server to create our new production.
        // this.props.putProductionInspectionDetail(
        //     this.props.user,
        //     {
        //         state: PRODUCTION_INSPECTION_SUBMITTED_STATE,
        //         review: this.props.productionInspectionDetail.review,
        //         failureReason: this.props.productionInspectionDetail.failureReason,
        //         stage: this.props.productionInspectionDetail.stage,
        //         notes: this.props.productionInspectionDetail.notes
        //     },
        //     this.props.productionInspectionDetail.slug,
        //     this.onSuccessfulSubmissionCallback,
        //     this.onFailedSubmissionCallback
        // );
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        return (
            <ProductionInspectionDetailomponent
                productionDetail={this.props.productionDetail}
                productionInspectionDetail={this.props.productionInspectionDetail}
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
        pullProductionInspectionDetail: (user, slug, successCallback, failedCallback) => {
            dispatch(
                pullProductionInspectionDetail(user, slug, successCallback, failedCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionDetailContainer);
