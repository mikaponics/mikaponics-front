import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProductionInspectionCreateStartComponent from "../../../components/production/inspection/productionInspectionCreateStartComponent";
import { pullDefaultDraftProductionInspectionDetail } from "../../../actions/productionInspectionActions";


class ProductionInspectionCreateStartContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
            slug: null,
        }

        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            referrer: "/onboard/success"
        })
    }

    onFailedSubmissionCallback() {
        // Do nothing.
    }

    componentDidMount() {
        this.props.pullDefaultDraftProductionInspectionDetail(this.props.user, this.props.productionDetail.slug); // Get latest data from API.

    } // end FUNC.

    render() {
        return (
            <ProductionInspectionCreateStartComponent />
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
        pullDefaultDraftProductionInspectionDetail: (user, slug) => {
            dispatch(pullDefaultDraftProductionInspectionDetail(user, slug))
        },
        // postOnboarding: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
        //     dispatch(
        //         postOnboarding(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
        //     )
        // },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionCreateStartContainer);
