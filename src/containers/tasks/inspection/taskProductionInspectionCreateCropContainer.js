import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Scroll from 'react-scroll';

import TaskProductionInspectionCreateCropComponent from "../../../components/tasks/inspection/taskProductionInspectionCreateCropComponent";
import {
    pullProductionCropInspectionDetail,
    putProductionCropInspectionDetail
} from "../../../actions/productionCropInspectionActions";
import { pullCropLifeCycleStageList } from "../../../actions/cropLifeCycleStageListActions";
import { pullProductionInspectionDetail } from "../../../actions/productionInspectionActions";


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
            notes: null,

            // DEVELOPERS NOTE:
            // THE STAGE VARIABLE WILL HOLD THE `SLUG` AND NOT THE PRIMARY KEY.
            // WE WILL ALSO STORE THE STAGE OPTION.
            stage: null,
            stageOption: null,
        }
        this.getStageOptions = this.getStageOptions.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessfulPutCallback = this.onSuccessfulPutCallback.bind(this);
        this.onFailedPutCallback = this.onFailedPutCallback.bind(this);
        this.onSuccessfulGetCallback = this.onSuccessfulGetCallback.bind(this);
        this.onFailedGetCallback = this.onFailedGetCallback.bind(this);
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

        // DEVELOPERS NOTE: WE NEED TO GET THE SLUG VALUE FOR THE SELECTED `STAGE`.
        let stageSlug = null;
        if (isEmpty(cropInspection)===false) {
            stageSlug = isEmpty(cropInspection.stage) === false ? cropInspection.stage.slug : null;
            console.log("componentDidMount | stageSlug:",stageSlug)
        }

        this.props.pullCropLifeCycleStageList(this.props.user, 1, cropInspection.productionCropTypeOf); // Get latest data from API.
        this.props.pullProductionCropInspectionDetail(this.props.user, cropInspection.slug);
        this.setState({
            crops: this.props.productionDetail.crops,
            crop: cropInspection,
            review: cropInspection.review,
            failureReason: cropInspection.failureReason,
            stage: stageSlug,
            notes: cropInspection.notes,
        });

        // AUTOMATICALLY SCROLL TO THE TOP (WITHOUT ANIMATIONS!)
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    /**
     * Utility function takes the API data and converts it to HTML dropdown
     * options which will be consumed by the `react-select` library elements.
     */
    getStageOptions() {
        const stageOptions = [];
        const stageList = this.props.cropLifeCycleStageList;
        const isNotProductionsEmpty = isEmpty(stageList) === false;
        if (isNotProductionsEmpty) {
            const results = stageList.results;
            const isResultsNotEmpty = isEmpty(results) === false;
            if (isResultsNotEmpty) {
                for (let i = 0; i < results.length; i++) {
                    let stage = results[i];
                    stageOptions.push({
                        selectName: "stage",
                        value: stage.slug,
                        label: stage.name
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
            const cropInspection = this.props.productionInspectionDetail.crops[nextPageIndex];

            // DEVELOPERS NOTE: WE NEED TO GET THE SLUG VALUE FOR THE SELECTED `STAGE`.
            let stageSlug = null;
            if (isEmpty(cropInspection)===false) {
                stageSlug = isEmpty(cropInspection.stage) === false ? cropInspection.stage.slug : null;
                console.log("onBackClick | stageSlug:",stageSlug)
            }

            this.props.pullCropLifeCycleStageList(this.props.user, 1, cropInspection.productionCropTypeOf); // Get latest data from API.
            this.setState({
                errors: Object(),
                crop: cropInspection,
                review: cropInspection.review,
                failureReason: cropInspection.failureReason,
                stage: stageSlug,
                notes: cropInspection.notes,
            }, () => {
                const aURL = '/task/production-inspection/'+ slug + '/crop/'+nextPageIndex.toString();
                this.props.history.push(aURL);
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        // TODO: CLIENT SIDE VALIDATION.

        const data = {
            review: this.state.review,
            failureReason: this.state.failureReason,
            stage: this.state.stage,
            notes: this.state.notes
        };
        console.log("onSubmit | data:", data);
        this.props.putProductionCropInspectionDetail(
            this.props.user,
            data,
            this.state.crop.slug,
            this.onSuccessfulPutCallback,
            this.onFailedPutCallback
        );
    }

    onSuccessfulGetCallback(obj) {
        const { slug, index } = this.props.match.params;
        const nextPageIndex = parseInt(index) + 1;
        const cropInspection = this.props.productionInspectionDetail.crops[nextPageIndex];

        // DEVELOPERS NOTE: WE NEED TO GET THE SLUG VALUE FOR THE SELECTED `STAGE`.
        let stageSlug = null;
        if (isEmpty(cropInspection)===false) {
            stageSlug = isEmpty(cropInspection.stage) === false ? cropInspection.stage.slug : null;
            console.log("onSuccessfulGetCallback | stageSlug:",stageSlug)
        }

        console.log("onSuccessfulGetCallback | notes:",cropInspection.notes)

        // DEVELOPERS NOTE: CALL OUR API TO GET LIST FILTERED BY CROP TYPE (I.E. PLANT OR FISH).
        this.props.pullCropLifeCycleStageList(this.props.user, 1, cropInspection.productionCropTypeOf); // Get latest data from API.

        // UPDATE OUR STATE AND LOAD UP THE NEXT PAGE.
        this.setState({
            errors: Object(),
            crop: cropInspection,
            review: cropInspection.review,
            failureReason: cropInspection.failureReason,
            stage: stageSlug,
            notes: cropInspection.notes,
        }, () => {
            const aURL = '/task/production-inspection/'+ slug + '/crop/'+nextPageIndex.toString();
            this.props.history.push(aURL);
        });
    }

    onFailedGetCallback(errors) {
        const { index } = this.props.match.params;
        const cropInspection = this.props.productionInspectionDetail.crops[index];

        this.setState({
            errors: this.props.productionInspectionDetail.errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSuccessfulPutCallback() {
        // DEVELOPERS NOTE:
        // (1) WE ARE GOING TO LOAD UP THE **NEXT** CROP OBJECT IN THE
        //     CROPS ARRAY.
        // (2) WE WILL CLEAR THE STATE  AND LOAD UP THE STATE WITH OUR NEW
        //     CROP THAT WE ARE LOADING IN.
        // (3) ONCE OUR CROP IS LOADED INTO THE STATE WE WILL REDIRECT
        //     TO THIS PAGE AGAIN BUT UNDER A DIFFERENT INDEX.
        const { slug, index } = this.props.match.params;
        const nextPageIndex = parseInt(index) + 1;
        if (nextPageIndex < this.state.crops.length) {
            this.props.pullProductionInspectionDetail(
                this.props.user,
                this.props.productionInspectionDetail.slug,
                this.onSuccessfulGetCallback,
                this.onFailedGetCallback,
            );
        } else {
            this.props.history.push( '/task/production-inspection/'+ slug + '/finish');
        }

        // NON-ANIMATED SCROLL TO THE TOP.
        window.scrollTo(0, 0);
    }

    onFailedPutCallback(errors) {
        const { index } = this.props.match.params;
        const cropInspection = this.props.productionInspectionDetail.crops[index];

        this.setState({
            errors: errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSelectChange(name, value) {
        this.setState({
            [name]: value
        });
        console.log("onSelectChang | (name,value):", name,value)
    }

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
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
            <TaskProductionInspectionCreateCropComponent
                productionInspectionDetail={this.props.productionInspectionDetail}
                stageOptions={this.getStageOptions()}
                stage={stage}
                productionDetail={this.props.productionDetail}
                crops={crops}
                crop={crop}
                review={review}
                failureReason={failureReason}
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
        productionCropInspectionDetail: store.productionCropInspectionDetailState,
        cropLifeCycleStageList: store.cropLifeCycleStageListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullCropLifeCycleStageList: (user, page, slug) => {
            dispatch(
                pullCropLifeCycleStageList(user, page, slug)
            )
        },
        pullProductionCropInspectionDetail: (user, slug, onSuccessfulPutCallback, onFailedPutCallback) => {
            dispatch(
                pullProductionCropInspectionDetail(user, slug, onSuccessfulPutCallback, onFailedPutCallback)
            )
        },
        putProductionCropInspectionDetail: (user, state, slug, onSuccessfulPutCallback, onFailedPutCallback) => {
            dispatch(
                putProductionCropInspectionDetail(user, state, slug, onSuccessfulPutCallback, onFailedPutCallback)
            )
        },
        pullProductionInspectionDetail: (user, slug, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                pullProductionInspectionDetail(user, slug, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionCreateCropContainer);
