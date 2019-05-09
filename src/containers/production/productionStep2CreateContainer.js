import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import { CROP_PLANT_TYPE } from '../../constants/api';
import { validateStep2Input } from '../../validations/productionCreateValidator';
import ProductionStep2CreateComponent from "../../components/production/productionStep2CreateComponent";
import { pullCropList } from "../../actions/cropListActions";
import { pullCropSubstrateList } from "../../actions/cropSubstrateListActions";


class ProductionStep2CreateContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Extract our plants array (which is used to populate the table) from
        // the users's local storage.
        const stringPlantsArr = localStorage.getItem("temp-plants");
        let plantsArr = JSON.parse(stringPlantsArr);
        if (plantsArr  === undefined || plantsArr === null) {
            plantsArr = [];
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
            plant: null,
            plantOther: null,
            showPlantOther: false,
            quantity: null,

            // ALL OUR OBJECTS ARE STORED HERE.
            plantsArray: plantsArr,

            // DEVELOPERS NOTE: The following state objects are used to store
            // the data from the modal.
            substrate: null,
            substrateOther: null,
            showSubstrateOther: false,
            quantity: null,
        }
        this.getPlantOptions = this.getPlantOptions.bind(this);
        this.getSubstrateOptions = this.getSubstrateOptions.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onPlantSelectChange = this.onPlantSelectChange.bind(this);
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
    getPlantOptions() {
        const plantOptions = [];
        const plantList = this.props.plantList;
        if (plantList !== undefined && plantList !== null) {
            const results = plantList.results;
            if (results !== undefined && results !== null) {
                for (let i = 0; i < results.length; i++) {
                    let plant = results[i];
                    plantOptions.push({
                        selectName: "plant",
                        value: plant.slug,
                        label: plant.name
                    });
                }
            }
        }
        return plantOptions;
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
        this.props.pullCropList(this.props.user, 1, CROP_PLANT_TYPE); // Get latest data from API.
        this.props.pullCropSubstrateList(this.props.user, 1, CROP_PLANT_TYPE); // Get latest data from API.
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

    onPlantSelectChange(option) {
        this.setState({
            plant: option.value,
            plantOption: option,
            showPlantOther: (option.value == "other")
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
        const plantsArray = this.state.plantsArray;
        for (let i = 0; i < plantsArray.length; i++) {
            let row = plantsArray[i];
            if (row.plantSlug === slug) {
                //
                // Special thanks: https://flaviocopes.com/how-to-remove-item-from-array/
                //
                const filteredItems = plantsArray.slice(
                    0, i
                ).concat(
                    plantsArray.slice(
                        i + 1, plantsArray.length
                    )
                )

                // Update our state with our NEW ARRAY which no longer has
                // the item we deleted.
                this.setState({
                    plantsArray: filteredItems
                });

                // Save our table data.
                localStorage.setItem("temp-plants", JSON.stringify(filteredItems))

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
        const { errors, isValid } = validateStep2Input(this.state);
        if (isValid) {
            // Append our array.
            let a = this.state.plantsArray.slice(); //creates the clone of the state
            a.push({
                plantSlug: this.state.plantOption.value,
                plant: this.state.plantOption.label,
                plantOther: this.state.plantOther,
                quantity: this.state.quantity,
                substrateSlug: this.state.substrateOption.value,
                substrate: this.state.substrateOption.label,
                substrateOther: this.state.substrateOther,
            });

            // Close the modal, reset any errors and clear field values.
            this.setState({
                showModal: false,
                errors: {},
                plant: null,
                plantOther: null,
                quantity: null,
                substrate: null,
                substrateOther: null,
                plantsArray: a
            });

            // Save our table data.
            localStorage.setItem("temp-plants", JSON.stringify(a))
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
            referrer: '/add-production-step-1'
        })
    }

    onNextClick(e) {
        e.preventDefault();
        this.setState({
            referrer: '/add-production-step-3'
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
            plant,
            plantOther,
            showPlantOther,
            quantity,
            plantsArray,
            substrate,
            substrateOther,
            showSubstrateOther,
            errors,
            showModal,
             referrer
        } = this.state;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionStep2CreateComponent
                plantOptions={this.getPlantOptions()}
                plant={plant}
                plantOther={plantOther}
                showPlantOther={showPlantOther}
                quantity={quantity}
                plantsArray={plantsArray}

                substrateOptions={this.getSubstrateOptions()}
                substrate={substrate}
                substrateOther={substrateOther}
                showSubstrateOther={showSubstrateOther}

                onTextChange={this.onTextChange}
                onPlantSelectChange={this.onPlantSelectChange}
                onSubstrateSelectChange={this.onSubstrateSelectChange}
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
        plantList: store.cropListState,
        substrateList: store.cropSubstrateListState,
        user: store.userState,
        deviceList: store.deviceListState,
        // productionList: store.productionListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullCropList: (user, page, typeOf) => {
            dispatch(
                pullCropList(user, page, typeOf)
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
)(ProductionStep2CreateContainer);
