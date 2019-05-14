import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ProductionInspectionCreateCropComponent from "../../../components/production/inspection/productionInspectionCreateCropComponent";
import {
    pullProductionCropInspectionDetail,
    putProductionCropInspectionDetail
} from "../../../actions/productionCropInspectionActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";


class ProductionInspectionCreateCropContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            // DEVELOPERS NOTE:
            // THE ERRORS DICTIONARY CONTAINS KEY-VALUES OF THE THE FIELDS AND
            // THEIR RESPECTED ERRORS TO DISPLAY TO THE USER.
            errors: Object(),
            crops: [],
            crop: {},
            review: null,
            failureReason: null,
            stage: null,
            notes: null,
        }
        this.getStageOptions = this.getStageOptions.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    componentDidMount() {
        // DEVELOPERS NOTE:
        // (1) FETCH THE INDEX NUMBER FROM THE URL AND LOOK THAT NUMBER UP IN
        //     CROPS ARRAY. THIS WILL RETRIEVE THE CROP WE WILL BE PROCESSING
        //     IN THIS COMPONENT!
        // (2) EXTRACT THE CROP INSPECTION `SLUG` AND CALL THE API TO GET THE
        //     DETAILS FOR THE CROP INSPECTION OBJECT.
        // (3) POPULATE OUR COMPONENT STATE WITH THE DATA RECEIVED FROM API.
        const { index } = this.props.match.params;
        const cropInspection = this.props.productionInspectionDetail.crops[index];
        this.props.pullProductionCropInspectionDetail(this.props.user, cropInspection.slug);
        this.setState({
            crops: this.props.productionDetail.crops,
            crop: cropInspection,
            review: cropInspection.review,
            failureReason: cropInspection.failureReason,
            stage: cropInspection.stage,
            notes: cropInspection.notes,
        });

        // AUTOMATICALLY SCROLL TO THE TOP (WITHOUT ANIMATIONS!)
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    getStageOptions() {
        const stageOptions = [];
        if (this.state.crop) {
            const stageList = this.state.crop.productionCropStages;
            if (stageList !== undefined && stageList !== null) {

                for (let i = 0; i < stageList.length; i++) {
                    let stageItem = stageList[i];
                    stageOptions.push({
                        selectName: "stage",
                        value: stageItem.id,
                        label: stageItem.value
                    });
                }

            }
        }
        return stageOptions;
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
            this.props.history.push( '/production/'+ slug + '/create-inspection/start');
        } else {
            this.setState({
                crops: this.props.productionDetail.crops,
                crop: this.props.productionDetail.crops[nextPageIndex]
            }, () => {
                const aURL = '/production/'+ slug + '/create-inspection/crop/'+nextPageIndex.toString();
                this.props.history.push(aURL);
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        this.props.putProductionCropInspectionDetail(
            this.props.user,
            this.state,
            this.state.crop.slug,
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
        const { index } = this.props.match.params;
        const cropInspection = this.props.productionInspectionDetail.crops[index];
        console.log(">", this.props.productionInspectionDetail);

        this.setState({
            errors: this.props.productionInspectionDetail.errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSelectChange(name, value) {
        console.log(name,"|", value);
        this.setState({
            [name]: value
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
        const { crops, crop, review, failureReason, stage, notes, errors } = this.state;

        return (
            <ProductionInspectionCreateCropComponent
                stageOptions={this.getStageOptions()}
                productionDetail={this.props.productionDetail}
                crops={crops}
                crop={crop}
                review={review}
                failureReason={failureReason}
                stage={stage}
                notes={notes}
                errors={errors}
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
        productionInspectionDetail: store.productionInspectionDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProductionCropInspectionDetail: (user, slug) => {
            dispatch(
                pullProductionCropInspectionDetail(user, slug)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putProductionCropInspectionDetail: (user, state, slug, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                putProductionCropInspectionDetail(user, state, slug, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionCreateCropContainer);
