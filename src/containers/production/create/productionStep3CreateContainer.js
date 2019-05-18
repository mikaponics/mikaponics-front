import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Scroll from 'react-scroll';

import { CROP_FISHSTOCK_TYPE } from '../../../constants/api';
import { validateStep3Input } from '../../../validations/productionCreateValidator';
import ProductionStep3CreateComponent from "../../../components/production/create/productionStep3CreateComponent";
import { pullCropLifeCycleStageList } from "../../../actions/cropLifeCycleStageListActions";
import { pullCropDataSheetList } from "../../../actions/cropDataSheetListActions";
import { pullCropSubstrateList } from "../../../actions/cropSubstrateListActions";


class ProductionStep3CreateContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Extract our fish array (which is used to populate the table) from
        // the users's local storage.
        const stringFishArr = localStorage.getItem("temp-fish");
        let fishArr = JSON.parse(stringFishArr);
        if (fishArr  === undefined || fishArr === null) {
            fishArr = [];
        }

        this.state = {
            // DEVELOPERS NOTE: This variable is used as the main way to add
            // GUI modification to the fields. Simply adding a key and the
            // message will result in an error message displaying for that
            // field. Please make sure the `name` in the HTML field equals
            // the `name` dictonary key in this dictionary.
            errors: {},

            referrer: '',

            // Variable used to indicate if the modal should appear.
            showModal: false,

            // DEVELOPERS NOTE: The following state objects are used to store
            // the data from the modal.
            fish: null,
            fishOther: null,
            showFishOther: false,
            quantity: null,

            // ALL OUR OBJECTS ARE STORED HERE.
            fishArray: fishArr,

            // DEVELOPERS NOTE: The following state objects are used to store
            // the data from the modal.
            stage: null,
            substrate: null,
            substrateOther: null,
            showSubstrateOther: false,
            quantity: null,
        }
        this.getStageOptions = this.getStageOptions.bind(this);
        this.getCropOptions = this.getCropOptions.bind(this);
        this.getSubstrateOptions = this.getSubstrateOptions.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onStageSelectChange = this.onStageSelectChange.bind(this);
        this.onFishSelectChange = this.onFishSelectChange.bind(this);
        this.onSubstrateSelectChange = this.onSubstrateSelectChange.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
        this.onSaveModalClick = this.onSaveModalClick.bind(this);
        this.onCloseModalClick = this.onCloseModalClick.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    /**
     *  Utility function will take the plant list objects we have from the
     *  API endpoint and generate options data for the `react-select` component
     *  we are using.
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

    /**
     *  Utility function will take the fish list objects we have from the
     *  API endpoint and generate options data for the `react-select` component
     *  we are using.
     */
    getCropOptions() {
        const fishOptions = [];
        const cropList = this.props.cropList;
        if (cropList !== undefined && cropList !== null) {
            const results = cropList.results;
            if (results !== undefined && results !== null) {
                for (let i = 0; i < results.length; i++) {
                    let fish = results[i];
                    fishOptions.push({
                        selectName: "fish",
                        value: fish.slug,
                        label: fish.name
                    });
                }
            }
        }
        return fishOptions;
    }

    /**
     *  Utility function will take the substrate list objects we have from the
     *  API endpoint and generate options data for the `react-select` component
     *  we are using.
     */
    getSubstrateOptions() {
        const substrateOptions = [];
        const substrateList = this.props.substrateList;
        if (substrateList !== undefined && substrateList !== null) {
            const results = substrateList.results;
            if (results !== undefined && results !== null) {
                for (let i = 0; i < results.length; i++) {
                    let substrate = results[i];
                    substrateOptions.push({
                        selectName: "substrate",
                        value: substrate.slug,
                        label: substrate.name
                    });
                }
            }
        }
        return substrateOptions;
    }

    componentDidMount() {
        this.props.pullCropLifeCycleStageList(this.props.user, 1, CROP_FISHSTOCK_TYPE); // Get latest data from API.
        this.props.pullCropDataSheetList(this.props.user, 1, CROP_FISHSTOCK_TYPE); // Get latest data from API.
        this.props.pullCropSubstrateList(this.props.user, 1, CROP_FISHSTOCK_TYPE); // Get latest data from API.
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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onFishSelectChange(option) {
        this.setState({
            fish: option.value,
            fishOption: option,
            showFishOther: (option.value == "other")
        })
    }

    onStageSelectChange(option) {
        this.setState({
            stage: option.value,
            stageOption: option,
        })
    }

    onSubstrateSelectChange(option) {
        this.setState({
            substrate: option.value,
            substrateOption: option,
            showSubstrateOther: (option.value == "other")
        })
    }

    onRemoveButtonClick(slug) {
        const fishArray = this.state.fishArray;
        for (let i = 0; i < fishArray.length; i++) {
            let row = fishArray[i];
            if (row.fishSlug === slug) {
                //
                // Special thanks: https://flaviocopes.com/how-to-remove-item-from-array/
                //
                const filteredItems = fishArray.slice(
                    0, i
                ).concat(
                    fishArray.slice(
                        i + 1, fishArray.length
                    )
                )

                // Update our state with our NEW ARRAY which no longer has
                // the item we deleted.
                this.setState({
                    fishArray: filteredItems
                });

                // Save our table data.
                localStorage.setItem("temp-fish", JSON.stringify(filteredItems))

                // Terminate our for-loop.
                return;
            }
        }
    }

    onAddButtonClick() {
        this.setState({
            showModal: true
        })
    }

    /**
     *  Event handler used to validate the modal `Save` button and either
     *  return error to fields or save to our state and exit modal.
     */
    onSaveModalClick() {
        const { errors, isValid } = validateStep3Input(this.state);
        if (isValid) {
            // Append our array.
            let a = this.state.fishArray.slice(); //creates the clone of the state
            a.push({
                fishSlug: this.state.fishOption.value,
                fish: this.state.fishOption.label,
                fishOther: this.state.fishOther,
                quantity: this.state.quantity,
                stage: this.state.stageOption.label,
                stageSlug: this.state.stageOption.value,
                substrateSlug: this.state.substrateOption.value,
                substrate: this.state.substrateOption.label,
                substrateOther: this.state.substrateOther,
            });

            // Close the modal, reset any errors and clear field values.
            this.setState({
                showModal: false,
                errors: {},
                fish: null,
                quantity: null,
                substrate: null,
                substrateOther: null,
                fishArray: a
            });

            // Save our table data.
            localStorage.setItem("temp-fish", JSON.stringify(a))
        } else {
            this.setState({
                errors: errors
            })

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    onCloseModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: false
        })
    }


    onBackClick(e) {
        e.preventDefault();
        this.setState({
            referrer: '/add-production-step-2'
        })
    }

    onNextClick(e) {
        e.preventDefault();
        this.setState({
            referrer: '/add-production-step-4'
        })
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const {
            name,
            description,
            device,
            fish,
            fishOther,
            showFishOther,
            quantity,
            stage,
            substrate,
            substrateOther,
            showSubstrateOther,
            fishArray,
            errors,
            showModal,
             referrer
        } = this.state;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionStep3CreateComponent
                stageOptions={this.getStageOptions()}
                stage={stage}
                fishOptions={this.getCropOptions()}
                fish={fish}
                fishOther={fishOther}
                showFishOther={showFishOther}
                quantity={quantity}
                fishArray={fishArray}

                substrateOptions={this.getSubstrateOptions()}
                substrate={substrate}
                substrateOther={substrateOther}
                showSubstrateOther={showSubstrateOther}
                onSubstrateSelectChange={this.onSubstrateSelectChange}

                onTextChange={this.onTextChange}
                onStageSelectChange={this.onStageSelectChange}
                onFishSelectChange={this.onFishSelectChange}
                onAddButtonClick={this.onAddButtonClick}
                onRemoveButtonClick={this.onRemoveButtonClick}
                onSaveModalClick={this.onSaveModalClick}
                onCloseModalClick={this.onCloseModalClick}
                errors={errors}
                showModal={showModal}
                onBackClick={this.onBackClick}
                onNextClick={this.onNextClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        cropLifeCycleStageList: store.cropLifeCycleStageListState,
        cropList: store.cropDataSheetListState,
        substrateList: store.cropSubstrateListState,
        user: store.userState,
        deviceList: store.deviceListState,
        cropLifeCycleStageList: store.cropLifeCycleStageListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullCropLifeCycleStageList: (user, page, typeOf) => {
            dispatch(
                pullCropLifeCycleStageList(user, page, typeOf)
            )
        },
        pullCropDataSheetList: (user, page, typeOf) => {
            dispatch(
                pullCropDataSheetList(user, page, typeOf)
            )
        },
        pullCropSubstrateList: (user, page, typeOf) => {
            dispatch(
                pullCropSubstrateList(user, page, typeOf)
            )
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionStep3CreateContainer);
