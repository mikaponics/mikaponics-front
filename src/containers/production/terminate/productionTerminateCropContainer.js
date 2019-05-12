import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import ProductionTerminateCropComponent from "../../../components/production/terminate/productionTerminateCropComponent";
import { pullProductionCropDetail } from "../../../actions/productionCropActions";
import { putProductionCropDetail } from "../../../actions/productionCropActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";


class ProductionTerminateCropContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        let pageIndex = 0;
        const terminateCropPageIndex = localStorage.getItem('terminateCropPageIndex');
        if (terminateCropPageIndex !== undefined && terminateCropPageIndex !== null) {
            pageIndex = parseInt(terminateCropPageIndex);
        }

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            referrer: null,
            pageSlug: slug,
            pageIndex: pageIndex,
            errors: Object(),
            crops: [],
            crop: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        let pageIndex = 0;
        const terminateCropPageIndex = localStorage.getItem('terminateCropPageIndex');
        if (terminateCropPageIndex !== undefined && terminateCropPageIndex !== null) {
            pageIndex = parseInt(terminateCropPageIndex);
        }

        this.setState({
            crops: this.props.productionDetail.crops,
            pageIndex: pageIndex,
            crop: this.props.productionDetail.crops[pageIndex]
        });

        // For debugging purposes only.
        console.log("componentDidMount | PageIndex", pageIndex);
        console.log("componentDidMount | ArrayLength", this.props.productionDetail.crops.length);
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

        const previousPageIndex = this.state.pageIndex - 1;

        // For debugging purposes only.
        console.log("onSubmit | PageIndex", previousPageIndex);
        console.log("onSubmit | ArrayLength", this.state.crops.length);

        if (this.state.pageIndex > 0) {
            localStorage.setItem('terminateCropPageIndex', previousPageIndex)
            this.setState({
                pageIndex: previousPageIndex,
                crop: this.props.productionDetail.crops[previousPageIndex]
            });
        } else {
            this.setState({
                referrer: '/production/'+ this.state.pageSlug + '/terminate-start'
            })
        }

        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    onSubmit(e) {
        e.preventDefault();

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        this.props.putProductionCropDetail(
            this.props.user,
            this.state.crop,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    onSuccessfulSubmissionCallback() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        const nextPageIndex = parseInt(this.state.pageIndex) + 1;

        // For debugging purposes only.
        console.log("onSuccessfulSubmissionCallback | PageIndex", nextPageIndex);
        console.log("onSuccessfulSubmissionCallback | ArrayLength", this.state.crops.length);

        localStorage.setItem('terminateCropPageIndex', nextPageIndex)

        if (nextPageIndex < this.state.crops.length) {
            this.setState({
                pageIndex: nextPageIndex,
                crop: this.props.productionDetail.crops[nextPageIndex],
                errors: {}
            });
        } else {
            this.setState({
                referrer: '/production/'+ this.state.pageSlug + '/terminate-finish'
            })
        }
    }

    onFailedSubmissionCallback() {
        console.log(this.props.productionCropDetail);
        if (this.props.productionCropDetail !== undefined && this.props.productionCropDetail !== null) {
            this.setState({
                errors: this.props.productionCropDetail.errors
            })

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }

    }

    onSelectChange(name, value) {
        let { crop } = this.state;
        crop[name] = value;

        // UPDATE OUR STATE WITH THE ARRAY.
        this.setState({
            crop: crop
        });
    }

    onTextChange(e) {
        const name = [e.target.name];
        const value = e.target.value;

        let { crop } = this.state;
        crop[name] = value;

        // UPDATE OUR STATE WITH THE ARRAY.
        this.setState({
            crop: crop
        });
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        // For debugging purposes only.
        console.log("render | PageIndex", this.state.pageIndex);
        console.log("render | ArrayLength", this.state.crops.length);

        const { pageIndex, crops, crop, pageSlug, referrer, errors, finishedAt } = this.state;
        const { name, slug, plants, fish } = this.props.productionDetail;
        if (referrer) {
            return <Redirect to={referrer} />
            // return this.props.history.push(referrer);
        }
        return (
            <ProductionTerminateCropComponent
                pageIndex={pageIndex}
                crops={crops}
                crop={crop}
                name={name}
                slug={slug}
                errors={errors}
                finishedAt={finishedAt}
                plants={plants}
                fish={fish}
                onSubmit={this.onSubmit}
                onBackClick={this.onBackClick}
                onSelectChange={this.onSelectChange}
                onTextChange={this.onTextChange}
            />
        );
    }
}


const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productionDetail: store.productionDetailState,
        productionCropDetail: store.productionCropDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProductionCropDetail: (user, slug) => {
            dispatch(
                pullProductionCropDetail(user, slug)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putProductionCropDetail: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                putProductionCropDetail(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTerminateCropContainer);
