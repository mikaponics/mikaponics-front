import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import ProductionTerminateStartComponent from "../../../components/production/terminate/productionTerminateStartComponent";
import { pullProductionDetail, putProductionDetail } from "../../../actions/productionActions";


class ProductionTerminateStartContainer extends Component {

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
            slug: slug,
            errors: Object(),
            plants: [],
            fish: [],
            crops: [],
            finishedAt: null,
            wasSuccessAtFinish: false,
            failureReasonAtFinish: "",
            notesAtFinish: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onFinishedAtChange = this.onFinishedAtChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // IF THE API ENDPOINT RETURNS NONE, THAT MEANS WE MUST CHOOSE EITHER
        // "FALSE" OR "TRUE" TO ACTIVATE THE TERMINATION PHASE.
        let { wasSuccessAtFinish } = this.props.productionDetail;
        if (wasSuccessAtFinish === null || wasSuccessAtFinish === undefined) {
            wasSuccessAtFinish = false;
        }

        this.setState({
            // NEW VALUES FROM THIS SCREEN.
            finishedAt: this.props.productionDetail.finishedAt,
            plants: this.props.productionDetail.plants,
            fish: this.props.productionDetail.fish,
            crops: this.props.productionDetail.crops,
            wasSuccessAtFinish: wasSuccessAtFinish,
            failureReasonAtFinish: this.props.productionDetail.failureReasonAtFinish,
            notesAtFinish: this.props.productionDetail.notesAtFinish,

            // DEFAULT VALUES
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
            referrer: this.props.productionDetail.absoluteURL
        });
    }

    onSubmit(e) {
        e.preventDefault();

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        this.props.putProductionDetail(
            this.props.user,
            this.state,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    onFinishedAtChange(finishedAt) {
        this.setState({
            finishedAt: finishedAt,
        })
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
        localStorage.setItem('terminateCropPageIndex', 0);
        this.setState({
            referrer: '/production/'+ this.state.slug + '/terminate-crop'
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
        const { referrer, errors, finishedAt, wasSuccessAtFinish, failureReasonAtFinish, notesAtFinish, crops } = this.state;
        const { name, slug, plants, fish } = this.props.productionDetail;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        console.log("render | PageIndex", 0);
        console.log("render | ArrayLength", this.props.productionDetail.crops.length);
        return (
            <ProductionTerminateStartComponent
                name={name}
                slug={slug}
                errors={errors}
                finishedAt={finishedAt}
                wasSuccessAtFinish={wasSuccessAtFinish}
                failureReasonAtFinish={failureReasonAtFinish}
                notesAtFinish={notesAtFinish}
                plants={plants}
                fish={fish}
                crops={crops}
                onSubmit={this.onSubmit}
                onBackClick={this.onBackClick}
                onSelectChange={this.onSelectChange}
                onTextChange={this.onTextChange}
                onCheckboxChange={this.onCheckboxChange}
                onFinishedAtChange={this.onFinishedAtChange}
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
)(ProductionTerminateStartContainer);
