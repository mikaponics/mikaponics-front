import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ProductionTerminateStep3FinishComponent from "../../../components/production/terminate/productionTerminateStep3FinishComponent";
import { pullProductionDetail } from "../../../actions/productionActions";
import { putProductionDetail } from "../../../actions/productionActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { PRODUCTION_TERMINATED_STATE } from "../../../constants/api";


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
            pageSlug: slug,
            crops: [],
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.setState({
            crops: this.props.productionDetail.crops,

            // Set the production object.
            slug: this.props.productionDetail.slug,
            name: this.props.productionDetail.name,
            description: this.props.productionDetail.description,
            isCommercial: this.props.productionDetail.isCommercial,
            device: this.props.productionDetail.device,
            environment: parseInt(this.props.productionDetail.environment),
            typeOf: parseInt(this.props.productionDetail.typeOf),
            growSystem: parseInt(this.props.productionDetail.growSystem),
            growSystemOther: this.props.productionDetail.growSystemOther,
            startedAt: this.props.productionDetail.startedAt,
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
        let len = this.state.crops.length;
        len -= 1;
        const aURL = '/production/'+ this.state.pageSlug + '/terminate-crop/'+len.toString()
        this.props.history.push(aURL);
    }

    onSubmit(e) {
        e.preventDefault();

        // Change the state of the object and then submit to API endpoint.
        this.setState({
            state: PRODUCTION_TERMINATED_STATE
        },() => {
            // Once our state has been validated `client-side` then we will
            // make an API request with the server to create our new production.
            this.props.putProductionDetail(
                this.props.user,
                this.state,
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );
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
        return (
            <ProductionTerminateStep3FinishComponent
                productionDetail={this.props.productionDetail}
                onSubmit={this.onSubmit}
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
        pullProductionDetail: (user, slug) => {
            dispatch(
                pullProductionDetail(user, slug)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putProductionDetail: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                putProductionDetail(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTerminateStep3FinishContainer);
