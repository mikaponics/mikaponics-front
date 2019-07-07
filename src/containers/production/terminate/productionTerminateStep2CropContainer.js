import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Scroll from 'react-scroll';

import { validateStep2Input } from "../../../validations/productionTerminateValidator";
import {
    localStorageGetArrayItem,
    localStorageSetObjectOrArrayItem
} from "../../../helpers/localStorageUtility";
import {
    PRODUCTION_HARVEST_FAILURE_REASON_OPTION_CHOICES,
    PRODUCTION_HARVEST_YIELD_OPTION_CHOICES,
    PRODUCTION_HARVEST_QUALITY_OPTION_CHOICES
} from "../../../constants/api";
import ProductionTerminateStep2CropComponent from "../../../components/production/terminate/productionTerminateStep2CropComponent";


class ProductionTerminateStep2CropContainer extends Component {

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
        const crops = localStorageGetArrayItem("temp-production-terminate-crops");
        const crop = crops[index];

        this.state = {
            // DEVELOPERS NOTE:
            // THE ERRORS DICTIONARY CONTAINS KEY-VALUES OF THE THE FIELDS AND
            // THEIR RESPECTED ERRORS TO DISPLAY TO THE USER.
            errors: {},

            productionSlug: slug,
            productionName: this.props.productionDetail.name,
            index: index,
            crops: crops,
            crop: crop,

            // DEVELOPER NOTE: BELOW IS WHERE YOU ADD MORE FIELDS TO COLLECT
            wasHarvested: crop.wasHarvested,
            wasHarvestedOptions: [{
                id: 'wasSuccess-true-choice',
                name: 'wasHarvested',
                value: true,
                label: 'Yes',
            },{
                id: 'wasSuccess-false-choice',
                name: 'wasHarvested',
                value: false,
                label: 'No',
            }],
            harvestFailureReasonOptions: PRODUCTION_HARVEST_FAILURE_REASON_OPTION_CHOICES,
            harvestFailureReason: crop.harvestFailureReason,
            harvestFailureReasonOther: crop.harvestFailureReasonOther,
            harvestYieldOptions: PRODUCTION_HARVEST_YIELD_OPTION_CHOICES,
            harvestYield: crop.harvestYield,
            harvestQualityOptions: PRODUCTION_HARVEST_QUALITY_OPTION_CHOICES,
            harvestQuality: crop.harvestQuality,
            harvestNotes: crop.harvestNotes,
            harvestWeight: crop.harvestWeight,
            harvestWeightUnit: crop.harvestWeightUnit,
            averageLength: crop.averageLength,
            averageWidth: crop.averageWidth,
            averageHeight: crop.averageHeight,
        }
        this.onNextClick = this.onNextClick.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.updateCropWithOnKeyValueLabelChange = this.updateCropWithOnKeyValueLabelChange.bind(this);
    }

    componentDidMount() {
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
        const crop = this.state.crops[nextPageIndex];

        if (nextPageIndex < 0) {
            this.props.history.push('/production/'+ this.state.productionSlug + '/terminate-start');
        } else {
            this.setState(
                {
                    errors: {},
                    isLoading: false,
                    index: nextPageIndex,
                    crops: this.state.crops,
                    crop: crop,

                    // DEVELOPER NOTE: BELOW IS WHERE YOU ADD MORE FIELDS TO COLLECT
                    wasHarvested: crop.wasHarvested,
                    harvestFailureReason: crop.harvestFailureReason,
                    harvestFailureReasonOther: crop.harvestFailureReasonOther,
                    harvestYield: crop.harvestYield,
                    harvestQuality: crop.harvestQuality,
                    harvestNotes: crop.harvestNotes,
                    harvestWeight: crop.harvestWeight,
                    harvestWeightUnit: crop.harvestWeightUnit,
                    averageLength: crop.averageLength,
                    averageWidth: crop.averageWidth,
                    averageHeight: crop.averageHeight,
                },
                () => {
                    this.props.history.push('/production/'+ this.state.productionSlug + '/terminate-crop/'+this.state.index);
                }
            );
        }
    }

    onNextClick(e) {
        e.preventDefault();
        console.log(this.state); // For debugging purposes only.

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
            const crop = this.state.crops[nextPageIndex];

            if (nextPageIndex < this.state.crops.length) {
                this.setState(
                    {
                        errors: {},
                        isLoading: false,
                        index: nextPageIndex,
                        crops: this.state.crops,
                        crop: crop,

                        // DEVELOPER NOTE: BELOW IS WHERE YOU ADD MORE FIELDS TO COLLECT
                        wasHarvested: crop.wasHarvested,
                        harvestFailureReason: crop.harvestFailureReason,
                        harvestFailureReasonOther: crop.harvestFailureReasonOther,
                        harvestYield: crop.harvestYield,
                        harvestQuality: crop.harvestQuality,
                        harvestNotes: crop.harvestNotes,
                        harvestWeight: crop.harvestWeight,
                        harvestWeightUnit: crop.harvestWeightUnit,
                        averageLength: crop.averageLength,
                        averageWidth: crop.averageWidth,
                        averageHeight: crop.averageHeight,
                    },
                    () => {
                        this.props.history.push('/production/'+ this.state.productionSlug + '/terminate-crop/'+this.state.index);
                    }
                );
            } else {
                this.props.history.push('/production/'+ this.state.productionSlug + '/terminate-finish');
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

    onRadioChange(e) {
        // Get the values.
        const key = [e.target.name].toString();
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295

        // Generate our new keys.
        const storageValueKey = "temp-production-terminate-"+key;
        const storageLabelKey = "temp-production-terminate-"+key+"-label";

        // Save the data.
        this.setState(
            { [e.target.name]: value, },
            () => {
                // Step 2: After state has been updated, we the crop inspection & crop inspections array.
                this.updateCropWithOnKeyValueLabelChange(key, value, label);
            }
        );
    }

    /**
     *  Utility functions
     *------------------------------------------------------------
     */

    /**
     *  Utility function which will take the `selectfield` chosen values
     *  and update the persistent storage for the `crops` array.
     */
    updateCropWithOnKeyValueLabelChange(key, value, label) {
        console.log("updateCropWithOnSelectionChange", key, value, label); // For debugging purposes only.

        // Shallow copy of the array to create a NEW ARRAY.
        let a = this.state.crops.slice(); //creates the clone of the state

        // Find our current crop inspection and update it.
        let foundCrop = null;
        for (let i = 0; i < a.length; i++) {
            let cropItem = a[i];
            if (cropItem.slug === this.state.crop.slug) {
                // DEVELOPERS NOTE:
                // (1) Since we have a POINTER to the object, which we retrieved
                //     from the dictionary, we can update the value like this and
                //     it will reflect in the dictionary automatically.
                // (2) We are saving the `value` which the API uses.
                // (3) We are saving the `label` which we will use for GUI
                //     purposes in the last page.
                cropItem[key] = value;
                cropItem[key+"Label"] = label;
                foundCrop = cropItem;
                break;
            }
        }

        // Finally update the state to have a new copy of our cart which we
        // modified here. Also update the persistent storage with our data.
        this.setState(
            {
                crop: foundCrop,
                crops: a
            },
            () => {
                // Save to the persistent storage a COMPLETE COPY of the crops in the
                // production detail which we will use in the `create` pages to override
                // with our own values pertaining to crop inspections.
                localStorageSetObjectOrArrayItem("temp-production-terminate-crops", a);
            }
        );
    }

    /**
     *  Utility function which will take the `selectfield` chosen values
     *  and update the persistent storage for the `crops` array.
     */
    updateCropWithOnSelectionChange(key, value, label) {
        console.log("updateCropWithOnSelectionChange", key, value, label); // For debugging purposes only.

        // Shallow copy of the array to create a NEW ARRAY.
        let a = this.state.crops.slice(); //creates the clone of the state

        // Find our current crop inspection and update it.
        let foundCrop = null;
        for (let i = 0; i < a.length; i++) {
            let cropItem = a[i];
            if (cropItem.slug === this.state.crop.slug) {
                // DEVELOPERS NOTE:
                // (1) Since we have a POINTER to the object, which we retrieved
                //     from the dictionary, we can update the value like this and
                //     it will reflect in the dictionary automatically.
                // (2) We are saving the `value` which the API uses.
                // (3) We are saving the `label` which we will use for GUI
                //     purposes in the last page.
                cropItem[key] = value;
                cropItem[key+"Label"] = label;
                foundCrop = cropItem;
                break;
            }
        }

        // Finally update the state to have a new copy of our cart which we
        // modified here. Also update the persistent storage with our data.
        this.setState(
            {
                crop: foundCrop,
                crops: a
            },
            () => {
                // Save to the persistent storage a COMPLETE COPY of the crops in the
                // production detail which we will use in the `create` pages to override
                // with our own values pertaining to crop inspections.
                localStorageSetObjectOrArrayItem("temp-production-terminate-crops", a);
            }
        );
    }

    /**
     *  Utility function which will take the textfield chosen values
     *  and update the persistent storage for the `crops` array.
     */
    updateCropWithOnTextChange(key, value) {
        console.log("updateCropWithOnTextChange", key, value);

        // Shallow copy of the array to create a NEW ARRAY.
        let a = this.state.crops.slice(); //creates the clone of the state

        // Find our current crop inspection and update it.
        let foundCrop = null;
        for (let i = 0; i < a.length; i++) {
            let cropItem = a[i];
            if (cropItem.slug === this.state.crop.slug) {
                // DEVELOPERS NOTE:
                // Since we have a POINTER to the object, which we retrieved
                // from the dictionary, we can update the value like this and
                // it will reflect in the dictionary automatically.
                cropItem[key] = value;
                foundCrop = cropItem;
                break;
            }
        }

        // Finally update the state to have a new copy of our cart which we
        // modified here. Also update the persistent storage with our data.
        this.setState(
            {
                crop: foundCrop,
                crops: a
            },
            () => {
                // Save to the persistent storage a COMPLETE COPY of the crops in the
                // production detail which we will use in the `create` pages to override
                // with our own values pertaining to crop inspections.
                localStorageSetObjectOrArrayItem("temp-production-terminate-crops", a);
            }
        );
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const {
            productionName, productionSlug, crops, crop, errors, isLoading,

            // DEVELOPER NOTE: BELOW IS WHERE YOU ADD MORE FIELDS TO COLLECT
            wasHarvested, wasHarvestedOptions, harvestFailureReason, harvestFailureReasonOptions, harvestFailureReasonOther,
            harvestYield, harvestYieldOptions, harvestQuality, harvestQualityOptions, harvestNotes, harvestWeight, harvestWeightUnit,
            averageLength, averageWidth, averageHeight
        } = this.state;
        return (
            <ProductionTerminateStep2CropComponent
                productionName={productionName}
                productionSlug={productionSlug}
                crops={crops}
                crop={crop}
                isLoading={isLoading}
                errors={errors}
                onNextClick={this.onNextClick}
                onBackClick={this.onBackClick}
                onSelectChange={this.onSelectChange}
                onTextChange={this.onTextChange}
                onRadioChange={this.onRadioChange}
                onBackClick={this.onBackClick}
                onNextClick={this.onNextClick}

                // DEVELOPER NOTE: BELOW IS WHERE YOU ADD MORE FIELDS TO COLLECT
                wasHarvested={wasHarvested}
                wasHarvestedOptions={wasHarvestedOptions}
                harvestFailureReason={harvestFailureReason}
                harvestFailureReasonOther={harvestFailureReasonOther}
                harvestFailureReasonOptions={harvestFailureReasonOptions}
                harvestYield={harvestYield}
                harvestYieldOptions={harvestYieldOptions}
                harvestQuality={harvestQuality}
                harvestQualityOptions={harvestQualityOptions}
                harvestNotes={harvestNotes}
                harvestWeight={harvestWeight}
                harvestWeightUnit={harvestWeightUnit}
                averageLength={averageLength}
                averageWidth={averageWidth}
                averageHeight={averageHeight}
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
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTerminateStep2CropContainer);
