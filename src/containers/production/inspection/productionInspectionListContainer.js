import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductionInspectionListComponent from "../../../components/production/inspection/productionInspectionListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import {
    pullProductionInspectionList
} from "../../../actions/productionInspectionActions";
import { PRODUCTION_INSPECTION_SUBMITTED_STATE } from '../../../constants/api';
import { localStorageSetObjectOrArrayItem } from "../../../helpers/localStorageUtility";


class ProductionInspectionContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            page: 1,
            slug: slug
        }

        this.onAddClick = this.onAddClick.bind(this);
    }

    componentDidMount() {
        if ( this.props.productionDetail !== undefined && this.props.productionDetail !== null) {
            this.props.pullProductionInspectionList(
                this.props.user,
                this.state.page,
                this.props.productionDetail.slug,
                PRODUCTION_INSPECTION_SUBMITTED_STATE
            );
        }
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(); // Clear the messages.

        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    onAddClick(e) {
        e.preventDefault();

        // Shallow copy of the array to create a NEW ARRAY with a few modifications
        // which is required by the API web-service.
        let a = this.props.productionDetail.crops.slice(); //creates the clone of the state
        for (let i = 0; i < a.length; i++) {
            let item = a[i];
            item.productionCrop = item.slug;
        }

        // Save to the persistent storage a COMPLETE COPY of the crops in the
        // production detail which we will use in the `create` pages to override
        // with our own values pertaining to crop inspections.
        localStorageSetObjectOrArrayItem("temp-production-inspection-create-cropInspections", a);

        // Clear the `create inspection` form.
        localStorage.setItem("temp-production-inspection-create-didPass", null);
        localStorage.setItem("temp-production-inspection-create-failureReason", "");
        localStorage.setItem("temp-production-inspection-create-notes", "");

        // Start our create page.
        const aURL = "/production/" + this.props.productionDetail.slug + "/create-inspection/start";
        this.props.history.push(aURL);
    }

    render() {
        return (
            <ProductionInspectionListComponent
                user={this.props.user}
                productionDetail={this.props.productionDetail}
                productionInspectionList={this.props.productionInspectionList}
                page={this.state.page}
                flashMessage={this.props.flashMessage}
                onAddClick={this.onAddClick}
            />
        );
    }
}


const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productionDetail: store.productionDetailState,
        flashMessage: store.flashMessageState,
        productionInspectionList: store.productionInspectionListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullProductionInspectionList: (user, page, productionSlugFilter, stateFilter) => {
            dispatch(pullProductionInspectionList(user, page, productionSlugFilter, stateFilter))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionContainer);
