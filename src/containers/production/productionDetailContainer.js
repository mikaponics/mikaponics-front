import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductionDetailComponent from "../../components/production/productionDetailComponent";
import { pullProductionDetail } from "../../actions/productionActions";
import { clearFlashMessage } from "../../actions/flashMessageActions";
import { localStorageSetObjectOrArrayItem } from "../../helpers/localStorageUtility";


class ProductionListContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            slug: slug
        }

        // Attach our functions.
        this.tick = this.tick.bind(this);
        this.onHarvestClick = this.onHarvestClick.bind(this);
    }

    componentDidMount() {
        this.props.pullProductionDetail(this.props.user, this.state.slug);
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // This function will call the API backend every second to get the
        // device data.
        this.timerID = setInterval(
            () => this.tick(),
            10000 // 1000 milliseconds = 1 second
        );
    } // end FUNC.

    /**
     * Function used by the event timer to call the latest data from the API
     *  backend to get the latest device data.
     */
    tick() {
        this.props.pullProductionDetail(this.props.user, this.state.slug);
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(); // Clear the messages.
        clearInterval(this.timerID); // Clear our timer.

        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    onHarvestClick(e) {
        e.preventDefault();

        // Shallow copy of the array to create a NEW ARRAY with a few modifications
        // which is required by the API web-service.
        let a = this.props.productionDetail.crops.slice(); //creates the clone of the state
        for (let i = 0; i < a.length; i++) {
            let item = a[i];
            item.productionCrop = item.slug;

            // BUGFIX: Make sure you set the values to be blank strings or else React will cause problems in our GUI.
            item.wasHarvested = "";
            item.harvestFailureReason = "";
            item.harvestFailureReasonOther = "";
            item.harvestYield = "";
            item.harvestQuality = "";
            item.harvestNotes = "";
            item.harvestWeight = "";
            item.harvestWeightUnit = "";
            item.averageLength = "";
            item.averageWidth = "";
            item.averageHeight = "";
            item.averageMeasureUnit = "";
            item.wasAliveAfterHarvest = "";
        }

        // Save to the persistent storage a COMPLETE COPY of the crops in the
        // production detail which we will use in the `create` pages to override
        // with our own values pertaining to crop inspections.
        localStorageSetObjectOrArrayItem("temp-production-terminate-crops", a);

        // Clear the `create inspection` form.
        localStorage.removeItem("temp-production-terminate-finishedAt");
        localStorage.removeItem("temp-production-terminate-wasSuccess");
        localStorage.removeItem("temp-production-terminate-failureReason");
        localStorage.removeItem("temp-production-terminate-notes");

        // Start our create page.
        const aURL = "/production/" + this.props.productionDetail.slug + "/terminate-start";
        this.props.history.push(aURL);
    }


    render() {
        return (
            <ProductionDetailComponent
                user={this.props.user}
                productionDetail={this.props.productionDetail}
                flashMessage={this.props.flashMessage}
                onHarvestClick={this.onHarvestClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productionDetail: store.productionDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProductionDetail: (user, slug) => {
            dispatch(
                pullProductionDetail(user, slug)
            )
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionListContainer);
