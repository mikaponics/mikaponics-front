import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Scroll from 'react-scroll';

import ProductionInspectionCreateStep2CropComponent from "../../../../components/production/inspection/create/productionInspectionCreateStep2CropComponent";
import { pullCropLifeCycleStageList, getStageOptions } from "../../../../actions/cropLifeCycleStageListActions";
import { getProblemReactSelectOptions, pullProblemDataSheetList } from "../../../../actions/problemDataSheetListActions";
import { validateStep2Input } from "../../../../validations/productionInspectionCreateValidator";
import { localStorageGetArrayItem, localStorageSetObjectOrArrayItem } from "../../../../helpers/localStorageUtility";
import { PEST_TYPE_OF, DISEASE_TYPE_OF, ABIOTIC_TYPE_OF } from "../../../../constants/api";


class ProductionInspectionCreateStep2CropContainer extends Component {

    /**
     *  Initializer and component life-cycle functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // DEVELOPERS NOTE:
        // (1) FETCH THE INDEX NUMBER FROM THE URL AND LOOK THAT NUMBER UP IN
        //     CROPS ARRAY. THIS WILL RETRIEVE THE CROP WE WILL BE PROCESSING
        //     IN THIS COMPONENT!
        // (2) EXTRACT THE CROP INSPECTION `SLUG` AND CALL THE API TO GET THE
        //     DETAILS FOR THE CROP INSPECTION OBJECT.
        // (3) POPULATE OUR COMPONENT STATE WITH THE DATA RECEIVED FROM API.
        const { slug, index } = this.props.match.params;
        const cropInspections = localStorageGetArrayItem("temp-production-inspection-create-cropInspections");
        const cropInspection = cropInspections[index];

        this.state = {
            // DEVELOPERS NOTE:
            // THE ERRORS DICTIONARY CONTAINS KEY-VALUES OF THE THE FIELDS AND
            // THEIR RESPECTED ERRORS TO DISPLAY TO THE USER.
            errors: {},

            slug: slug,
            index: index,
            cropInspections: cropInspections,
            cropInspection: cropInspection,
            review: cropInspection.review,
            failureReason: cropInspection.failureReason,
            stage: cropInspection.stage,
            averageLength: cropInspection.averageLength,
            averageWidth: cropInspection.averageWidth,
            averageHeight: cropInspection.averageHeight,
            averageMeasureUnit: cropInspection.averageMeasureUnit,
            notes: cropInspection.notes,
            pestProblems: cropInspection.pestProblems,
            pestProblemOptions: [], // Populated in `componentDidMount` func.
            pestProblemsOther: cropInspection.pestProblemsOther,
            diseaseProblems: cropInspection.diseaseProblems,
            diseaseProblemOptions: [], // Populated in `componentDidMount` func.
            diseaseProblemsOther: cropInspection.diseaseProblemsOther,
            abioticProblems: cropInspection.abioticProblems,
            abioticProblemOptions: [], // Populated in `componentDidMount` func.
            abioticProblemsOther: cropInspection.abioticProblemsOther,
        }
        this.getPestProblemOptionResultsFromAPI = this.getPestProblemOptionResultsFromAPI.bind(this);
        this.getDiseaseProblemOptionResultsFromAPI = this.getDiseaseProblemOptionResultsFromAPI.bind(this);
        this.getAbioticProblemOptionResultsFromAPI = this.getAbioticProblemOptionResultsFromAPI.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.updateCropWithOnKeyValueLabelChange = this.updateCropWithOnKeyValueLabelChange.bind(this);
    }

    componentDidMount() {
        this.props.pullCropLifeCycleStageList(this.props.user, 1, this.state.cropInspection.typeOf); // Get latest data from API.

        // DEVELOPERS NOTE:
        // THE NEXT FEW LINES WILL MAKE API CALLS TO GET FILTERED RESULTS SO
        // OUR OPTIONS WILL BE POPULATED.
        var m = new Map();
        m.set('typeOf', PEST_TYPE_OF);
        this.props.pullProblemDataSheetList(1, m, this.getPestProblemOptionResultsFromAPI);

        m.set('typeOf', DISEASE_TYPE_OF);
        this.props.pullProblemDataSheetList(1, m, this.getDiseaseProblemOptionResultsFromAPI);

        m.set('typeOf', ABIOTIC_TYPE_OF);
        this.props.pullProblemDataSheetList(1, m, this.getAbioticProblemOptionResultsFromAPI);

        // AUTOMATICALLY SCROLL TO THE TOP (WITHOUT ANIMATIONS!)
        window.scrollTo(0, 0);  // Start the page at the top of the page.
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

        // DEVELOPERS NOTE:
        // (1) DECREMENT INDEX (IN URL)
        // (2) GET THE `CROP INSPECTION` AT OUR NEXT INDEX.
        // (3) UPDATE STATE
        // (4) REDIRECT TO NEW PAGE.
        const nextPageIndex = parseInt(this.state.index) - 1;
        const cropInspection = this.state.cropInspections[nextPageIndex];

        if (nextPageIndex < 0) {
            this.props.history.push('/production/'+ this.state.slug + '/create-inspection/start');
        } else {
            this.setState(
                {
                    errors: {},
                    isLoading: false,
                    index: nextPageIndex,
                    cropInspections: this.state.cropInspections,
                    cropInspection: cropInspection,
                    review: cropInspection.review,
                    failureReason: cropInspection.failureReason,
                    stage: cropInspection.stage,
                    averageLength: cropInspection.averageLength,
                    averageWidth: cropInspection.averageWidth,
                    averageHeight: cropInspection.averageHeight,
                    notes: cropInspection.notes,
                    pestProblems: cropInspection.pestProblems,
                    pestProblemsOther: cropInspection.pestProblemsOther,
                    diseaseProblems: cropInspection.diseaseProblems,
                    diseaseProblemsOther: cropInspection.diseaseProblemsOther,
                    abioticProblems: cropInspection.abioticProblems,
                    abioticProblemsOther: cropInspection.abioticProblemsOther,
                },
                () => {
                    this.props.history.push('/production/'+ this.state.slug + '/create-inspection/crop/'+this.state.index);
                }
            );
        }
    }

    onNextClick(e) {
        e.preventDefault();

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        const { errors, isValid } = validateStep2Input(this.state);
        if (isValid) {
            // DEVELOPERS NOTE:
            // (1) DECREMENT INDEX (IN URL)
            // (2) GET THE `CROP INSPECTION` AT OUR NEXT INDEX.
            // (3) UPDATE STATE
            // (4) REDIRECT TO NEW PAGE.
            const nextPageIndex = parseInt(this.state.index) + 1;
            const cropInspection = this.state.cropInspections[nextPageIndex];

            if (nextPageIndex < this.state.cropInspections.length) {
                this.setState(
                    {
                        errors: {},
                        isLoading: false,
                        index: nextPageIndex,
                        cropInspections: this.state.cropInspections,
                        cropInspection: cropInspection,
                        review: cropInspection.review,
                        failureReason: cropInspection.failureReason,
                        stage: cropInspection.stage,
                        averageLength: cropInspection.averageLength,
                        averageWidth: cropInspection.averageWidth,
                        averageHeight: cropInspection.averageHeight,
                        notes: cropInspection.notes,
                        pestProblems: cropInspection.pestProblems,
                        pestProblemsOther: cropInspection.pestProblemsOther,
                        diseaseProblems: cropInspection.diseaseProblems,
                        diseaseProblemsOther: cropInspection.diseaseProblemsOther,
                        abioticProblems: cropInspection.abioticProblems,
                        abioticProblemsOther: cropInspection.abioticProblemsOther,
                    },
                    () => {
                        this.props.history.push('/production/'+ this.state.slug + '/create-inspection/crop/'+this.state.index);
                    }
                );
            } else {
                this.props.history.push('/production/'+ this.state.slug + '/create-inspection/finish');
            }
        } else {
            this.setState({ errors: errors });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    onSelectChange(name, value, label) {
        // STEP 1: Update individual value.
        this.setState(
            { [name]: value },
            ()=>{
                // Step 2: After state has been updated, we the crop inspection & crop inspections array.
                this.updateCropWithOnKeyValueLabelChange(name, value, label);
            }
        );
    }

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];
        const key = args[1].name;

        // STEP 1: Update individual value.
        this.setState(
            { [key]: selectedOptions,},
            () => {
                // Step 2: After state has been updated, we the crop inspection & crop inspections array.
                this.updateCropWithOnKeyValueLabelChange(key, selectedOptions, null);
            }
        );
    }

    onTextChange(e) {
        e.preventDefault();
        const key = [e.target.name].toString();
        const value = e.target.value;

        // STEP 1: Update individual value.
        this.setState(
            { [e.target.name]: value },
            ()=>{
                // Step 2: After state has been updated, we the crop inspection & crop inspections array.
                this.updateCropWithOnKeyValueLabelChange(key, value, null);
            }
        );
    }

    /**
     *  Utility functions
     *------------------------------------------------------------
     */

    /**
     *  Utility function which will take the chosen parameters
     *  and update the persistent storage for the `cropInspections` array.
     */
    updateCropWithOnKeyValueLabelChange(key, value, label) {
        console.log("updateCropWithOnKeyValueLabelChange", key, value, label); // For debugging purposes only.

        // Shallow copy of the array to create a NEW ARRAY.
        let a = this.state.cropInspections.slice(); //creates the clone of the state

        // Find our current crop inspection and update it.
        let foundCropInspection = null;
        for (let i = 0; i < a.length; i++) {
            let searchItem = a[i];
            if (searchItem.slug === this.state.cropInspection.slug) {
                // DEVELOPERS NOTE:
                // (1) Since we have a POINTER to the object, which we retrieved
                //     from the dictionary, we can update the value like this and
                //     it will reflect in the dictionary automatically.
                // (2) We are saving the `value` which the API uses.
                // (3) We are saving the `label` which we will use for GUI
                //     purposes in the last page.
                searchItem[key] = value;
                searchItem[key+"Label"] = label;
                foundCropInspection = searchItem;
                break;
            }
        }

        // Finally update the state to have a new copy of our cart which we
        // modified here. Also update the persistent storage with our data.
        this.setState(
            {
                cropInspection: foundCropInspection,
                cropInspections: a
            },
            () => {
                // Save to the persistent storage a COMPLETE COPY of the crops in the
                // production detail which we will use in the `create` pages to override
                // with our own values pertaining to crop inspections.
                localStorageSetObjectOrArrayItem("temp-production-inspection-create-cropInspections", a);
            }
        );
    }

    /**
     *  Utlity function takes the API results data and saves it to our state.
     */
    getPestProblemOptionResultsFromAPI(response) {
        const pestProblemOptions = getProblemReactSelectOptions(response, "pestProblems");
        this.setState({ pestProblemOptions: pestProblemOptions });
    }

    /**
     *  Utlity function takes the API results data and saves it to our state.
     */
    getDiseaseProblemOptionResultsFromAPI(response) {
        const diseaseProblemOptions = getProblemReactSelectOptions(response, "diseaseProblems");
        this.setState({ diseaseProblemOptions: diseaseProblemOptions });
    }

    /**
     *  Utlity function takes the API results data and saves it to our state.
     */
    getAbioticProblemOptionResultsFromAPI(response) {
        const abioticProblemOptions = getProblemReactSelectOptions(response, "abioticProblems");
        this.setState({ abioticProblemOptions: abioticProblemOptions });
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const { index } = this.props.match.params;
        const {
            cropInspections, cropInspection, review, failureReason,
            averageLength, averageWidth, averageHeight, averageMeasureUnit,
            stage,
            notes,
            pestProblems, pestProblemsOther, pestProblemOptions,
            diseaseProblems, diseaseProblemsOther, diseaseProblemOptions,
            abioticProblems, abioticProblemsOther, abioticProblemOptions,
             errors } = this.state;
        return (
            <ProductionInspectionCreateStep2CropComponent
                stageOptions={getStageOptions(this.props.cropLifeCycleStageList)}
                stage={stage}
                averageLength={averageLength}
                averageWidth={averageWidth}
                averageHeight={averageHeight}
                averageMeasureUnit={averageMeasureUnit}
                productionDetail={this.props.productionDetail}
                cropInspections={cropInspections}
                cropInspection={cropInspection}
                review={review}
                failureReason={failureReason}
                notes={notes}
                pestProblems={pestProblems}
                pestProblemOptions={pestProblemOptions}
                pestProblemsOther={pestProblemsOther}
                diseaseProblems={diseaseProblems}
                diseaseProblemOptions={diseaseProblemOptions}
                diseaseProblemsOther={diseaseProblemsOther}
                abioticProblems={abioticProblems}
                abioticProblemOptions={abioticProblemOptions}
                abioticProblemsOther={abioticProblemsOther}

                errors={errors}
                onNextClick={this.onNextClick}
                onBackClick={this.onBackClick}
                onSelectChange={this.onSelectChange}
                onMultiChange={this.onMultiChange}
                onTextChange={this.onTextChange}
            />
        );
    }
}


const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productionDetail: store.productionDetailState,
        cropLifeCycleStageList: store.cropLifeCycleStageListState,
        problemDataSheetList: store.problemDataSheetListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullCropLifeCycleStageList: (user, page, slug) => {
            dispatch(
                pullCropLifeCycleStageList(user, page, slug)
            )
        },
        pullProblemDataSheetList: (page, filtersMap, successCallback, failedCallback) => {
            dispatch(
                pullProblemDataSheetList(page, filtersMap, successCallback, failedCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionCreateStep2CropContainer);
