import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Scroll from 'react-scroll';

import ProductionInspectionCreateStep2CropComponent from "../../../../components/production/inspection/create/productionInspectionCreateStep2CropComponent";
import { pullCropLifeCycleStageList, getStageOptions } from "../../../../actions/cropLifeCycleStageListActions";
import { validateStep2Input } from "../../../../validations/productionInspectionCreateValidator";
import {
    localStorageGetArrayItem,
    localStorageSetObjectOrArrayItem
} from "../../../../helpers/localStorageUtility";


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
        const { index } = this.props.match.params;
        const cropInspections = localStorageGetArrayItem("temp-production-inspection-create-cropInspections");
        const cropInspection = cropInspections[index];

        this.state = {
            // DEVELOPERS NOTE:
            // THE ERRORS DICTIONARY CONTAINS KEY-VALUES OF THE THE FIELDS AND
            // THEIR RESPECTED ERRORS TO DISPLAY TO THE USER.
            errors: {},

            index: index,
            cropInspections: cropInspections,
            cropInspection: cropInspection,
            review: cropInspection.review,
            failureReason: cropInspection.failureReason,
            stage: cropInspection.stage,
            notes: cropInspection.notes,
        }
        this.onNextClick = this.onNextClick.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.updateCropInspectionWithOnSelectionChange = this.updateCropInspectionWithOnSelectionChange.bind(this);
        this.updateCropInspectionWithOnTextChange = this.updateCropInspectionWithOnTextChange.bind(this);
    }

    componentDidMount() {
        this.props.pullCropLifeCycleStageList(this.props.user, 1, this.state.cropInspection.typeOf); // Get latest data from API.

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
                    notes: cropInspection.notes,
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
                        notes: cropInspection.notes,
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
                this.updateCropInspectionWithOnSelectionChange(name, value, label);
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
                this.updateCropInspectionWithOnTextChange(key, value);
            }
        );
    }

    /**
     *  Utility functions
     *------------------------------------------------------------
     */

    /**
     *  Utility function which will take the `selectfield` chosen values
     *  and update the persistent storage for the `cropInspections` array.
     */
    updateCropInspectionWithOnSelectionChange(key, value, label) {
        // console.log("updateCropInspectionWithOnSelectionChange", key, value, label); // For debugging purposes only.

        // Shallow copy of the array to create a NEW ARRAY.
        let a = this.state.cropInspections.slice(); //creates the clone of the state

        // Find our current crop inspection and update it.
        let foundCropInspection = null;
        for (let i = 0; i < a.length; i++) {
            let cropInspectionItem = a[i];
            if (cropInspectionItem.slug === this.state.cropInspection.slug) {
                // DEVELOPERS NOTE:
                // (1) Since we have a POINTER to the object, which we retrieved
                //     from the dictionary, we can update the value like this and
                //     it will reflect in the dictionary automatically.
                // (2) We are saving the `value` which the API uses.
                // (3) We are saving the `label` which we will use for GUI
                //     purposes in the last page.
                cropInspectionItem[key] = value;
                cropInspectionItem[key+"Label"] = label;
                foundCropInspection = cropInspectionItem;
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
     *  Utility function which will take the textfield chosen values
     *  and update the persistent storage for the `cropInspections` array.
     */
    updateCropInspectionWithOnTextChange(key, value) {
        console.log("updateCropInspectionWithOnTextChange", key, value);

        // Shallow copy of the array to create a NEW ARRAY.
        let a = this.state.cropInspections.slice(); //creates the clone of the state

        // Find our current crop inspection and update it.
        let foundCropInspection = null;
        for (let i = 0; i < a.length; i++) {
            let cropInspectionItem = a[i];
            if (cropInspectionItem.slug === this.state.cropInspection.slug) {
                // DEVELOPERS NOTE:
                // Since we have a POINTER to the object, which we retrieved
                // from the dictionary, we can update the value like this and
                // it will reflect in the dictionary automatically.
                cropInspectionItem[key] = value;
                foundCropInspection = cropInspectionItem;
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
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const { index } = this.props.match.params;
        const { cropInspections, cropInspection, review, failureReason, stage, notes, errors } = this.state;
        return (
            <ProductionInspectionCreateStep2CropComponent
                stageOptions={getStageOptions(this.props.cropLifeCycleStageList)}
                stage={stage}
                productionDetail={this.props.productionDetail}
                cropInspections={cropInspections}
                cropInspection={cropInspection}
                review={review}
                failureReason={failureReason}
                notes={notes}
                errors={errors}
                onNextClick={this.onNextClick}
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionCreateStep2CropContainer);
