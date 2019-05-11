import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import ProductionTerminateFinishComponent from "../../../components/production/terminate/productionTerminateFinishComponent";
import { pullProductionDetail } from "../../../actions/productionActions";
import { putProductionDetail } from "../../../actions/productionActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { PRODUCTION_TERMINATED_STATE } from "../../../constants/api";


class ProductionTerminateFinishContainer extends Component {

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
            referrer: null,
            pageSlug: slug,
            errors: Object(),
            plants: [],
            fish: [],
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
            finishedAt: this.props.productionDetail.finishedAt,
            plants: this.props.productionDetail.plants,
            fish: this.props.productionDetail.fish,
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
        this.setState({
            referrer: '/production/'+ this.state.pageSlug + '/terminate-crop'
        });
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
        this.setState({
            referrer: '/productions'
        });
    }

    onFailedSubmissionCallback() {
        this.setState({
            errors: this.props.productionDetail.errors
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
        const { crops, referrer, errors, finishedAt } = this.state;
        const { name, slug, plants, fish } = this.props.productionDetail;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionTerminateFinishComponent
                crops={crops}
                name={name}
                slug={slug}
                errors={errors}
                finishedAt={finishedAt}
                plants={plants}
                fish={fish}
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
)(ProductionTerminateFinishContainer);
