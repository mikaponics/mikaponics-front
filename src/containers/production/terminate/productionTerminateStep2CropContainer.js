import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Scroll from 'react-scroll';

import { validateStep2Input } from "../../../validations/productionTerminateValidator";
import {
    localStorageGetArrayItem,
    localStorageSetObjectOrArrayItem
} from "../../../helpers/localStorageUtility";
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
            stateAtFinish: crop.stateAtFinish,
            stateFailureReasonAtFinish: crop.stateFailureReasonAtFinish,
            harvestAtFinish: crop.harvestAtFinish,
            harvestFailureReasonAtFinish: crop.harvestFailureReasonAtFinish,
            harvestNotesAtFinish: crop.harvestNotesAtFinish,
            notesAtFinish: crop.notesAtFinish,
        }
        this.onNextClick = this.onNextClick.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.updateCropWithOnSelectionChange = this.updateCropWithOnSelectionChange.bind(this);
        this.updateCropWithOnTextChange = this.updateCropWithOnTextChange.bind(this);
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
                    stateAtFinish: crop.stateAtFinish,
                    stateFailureReasonAtFinish: crop.stateFailureReasonAtFinish,
                    harvestAtFinish: crop.harvestAtFinish,
                    harvestFailureReasonAtFinish: crop.harvestFailureReasonAtFinish,
                    harvestNotesAtFinish: crop.harvestNotesAtFinish,
                    notesAtFinish: crop.notesAtFinish,
                },
                () => {
                    this.props.history.push('/production/'+ this.state.productionSlug + '/terminate-crop/'+this.state.index);
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
            const crop = this.state.crops[nextPageIndex];

            if (nextPageIndex < this.state.crops.length) {
                this.setState(
                    {
                        errors: {},
                        isLoading: false,
                        index: nextPageIndex,
                        crops: this.state.crops,
                        crop: crop,
                        stateAtFinish: crop.stateAtFinish,
                        stateFailureReasonAtFinish: crop.stateFailureReasonAtFinish,
                        harvestAtFinish: crop.harvestAtFinish,
                        harvestFailureReasonAtFinish: crop.harvestFailureReasonAtFinish,
                        harvestNotesAtFinish: crop.harvestNotesAtFinish,
                        notesAtFinish: crop.notesAtFinish,
                    },
                    () => {
                        this.props.history.push('/production/'+ this.state.productionSlug + '/terminate-crop/'+this.state.index);
                    }
                );
            } else {
                this.props.history.push('/production/'+ this.state.productionSlug + '/terminate-crop/finish');
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
                this.updateCropWithOnSelectionChange(name, value, label);
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
                this.updateCropWithOnTextChange(key, value);
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
    updateCropWithOnSelectionChange(key, value, label) {
        // console.log("updateCropWithOnSelectionChange", key, value, label); // For debugging purposes only.

        // Shallow copy of the array to create a NEW ARRAY.
        let a = this.state.crops.slice(); //creates the clone of the state

        // Find our current crop inspection and update it.
        let foundCrop = null;
        for (let i = 0; i < a.length; i++) {
            let cropItem = a[i];
            if (cropItem.slug === this.state.crop.productionSlug) {
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
            if (cropItem.slug === this.state.crop.productionSlug) {
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
        const { productionName, productionSlug, crops, crop, errors } = this.state;
        return (
            <ProductionTerminateStep2CropComponent
                productionName={productionName}
                productionSlug={productionSlug}
                crops={crops}
                crop={crop}
                errors={errors}
                onNextClick={this.onNextClick}
                onBackClick={this.onBackClick}
                onSelectChange={this.onSelectChange}
                onTextChange={this.onTextChange}
                onBackClick={this.onBackClick}
                onNextClick={this.onNextClick}
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
