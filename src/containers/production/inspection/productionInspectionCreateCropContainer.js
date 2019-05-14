import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ProductionInspectionCreateCropComponent from "../../../components/production/inspection/productionInspectionCreateCropComponent";
import { pullProductionCropDetail } from "../../../actions/productionCropActions";
import { putProductionCropDetail } from "../../../actions/productionCropActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";


class ProductionInspectionCreateCropContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
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
        const { index } = this.props.match.params;
        this.setState({
            crops: this.props.productionDetail.crops,
            crop: this.props.productionDetail.crops[index]
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
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        const { slug, index } = this.props.match.params;
        const nextPageIndex = parseInt(index) - 1;
        if (nextPageIndex < 0) {
            this.props.history.push( '/production/'+ slug + '/terminate-start');
        } else {
            this.setState({
                crops: this.props.productionDetail.crops,
                crop: this.props.productionDetail.crops[nextPageIndex]
            }, () => {
                const aURL = '/production/'+ slug + '/terminate-crop/'+nextPageIndex.toString();
                this.props.history.push(aURL);
            });
        }
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
        const { slug, index } = this.props.match.params;
        const nextPageIndex = parseInt(index) + 1;
        if (nextPageIndex < this.state.crops.length) {
            this.setState({
                crops: this.props.productionDetail.crops,
                crop: this.props.productionDetail.crops[nextPageIndex]
            }, ()=>{
                const aURL = '/production/'+ slug + '/terminate-crop/'+nextPageIndex.toString();
                this.props.history.push(aURL);
            });

        } else {
            this.props.history.push( '/production/'+ slug + '/terminate-finish');
        }
    }

    onFailedSubmissionCallback() {
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
        const { index } = this.props.match.params;
        const { crops, crop, errors, finishedAt } = this.state;
        const { name, slug, plants, fish } = this.props.productionDetail;
        return (
            <ProductionInspectionCreateCropComponent
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
)(ProductionInspectionCreateCropContainer);
