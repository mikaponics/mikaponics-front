import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import { CROP_PLANT_TYPE } from '../../constants/api';
import { validateStep2Input } from '../../validations/productionCreateValidator';
import ProductionStep2CreateComponent from "../../components/production/productionStep2CreateComponent";
import { pullCropList } from "../../actions/cropListActions";


class ProductionStep2CreateContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Extract our crops array (which is used to populate the table) from
        // the users's local storage.
        const stringCropsArr = localStorage.getItem("temp-crops");
        let cropsArr = JSON.parse(stringCropsArr);
        if (cropsArr  === undefined || cropsArr === null) {
            cropsArr = [];
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
            crop: null,
            cropOther: null,
            showOther: false,
            quantity: null,
            cropsArray: cropsArr,
        }
        this.getCropOptions = this.getCropOptions.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onCropSelectChange = this.onCropSelectChange.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
        this.onSaveModalClick = this.onSaveModalClick.bind(this);
        this.onCloseModalClick = this.onCloseModalClick.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    /**
     *  Utility function will take the crop list objects we have from the
     *  API endpoint and generate options data for the `react-select` component
     *  we are using.
     */
    getCropOptions() {
        const cropOptions = [];
        const cropList = this.props.cropList;
        if (cropList !== undefined && cropList !== null) {
            const results = cropList.results;
            if (results !== undefined && results !== null) {
                for (let i = 0; i < results.length; i++) {
                    let crop = results[i];
                    cropOptions.push({
                        selectName: "crop",
                        value: crop.slug,
                        label: crop.name
                    });
                }
            }
        }
        return cropOptions;
    }

    componentDidMount() {
        this.props.pullCropList(this.props.user, 1, CROP_PLANT_TYPE); // Get latest data from API.
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

    onCropSelectChange(option) {
        this.setState({
            crop: option.value,
            cropOption: option,
            showOther: (option.value == "other")
        })
    }

    onRemoveButtonClick(slug) {
        const cropsArray = this.state.cropsArray;
        for (let i = 0; i < cropsArray.length; i++) {
            let row = cropsArray[i];
            if (row.slug === slug) {
                //
                // Special thanks: https://flaviocopes.com/how-to-remove-item-from-array/
                //
                const filteredItems = cropsArray.slice(
                    0, i
                ).concat(
                    cropsArray.slice(
                        i + 1, cropsArray.length
                    )
                )

                // Update our state with our NEW ARRAY which no longer has
                // the item we deleted.
                this.setState({
                    cropsArray: filteredItems
                });

                // Save our table data.
                localStorage.setItem("temp-crops", JSON.stringify(filteredItems))

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
            let a = this.state.cropsArray.slice(); //creates the clone of the state
            a.push({
                slug: this.state.cropOption.value,
                name: this.state.cropOption.label,
                name_other: this.state.cropOther,
                quantity: this.state.quantity,
            });

            // Close the modal, reset any errors and clear field values.
            this.setState({
                showModal: false,
                errors: {},
                crop: null,
                quantity: null,
                cropsArray: a
            });

            // Save our table data.
            localStorage.setItem("temp-crops", JSON.stringify(a))
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
            crop,
            cropOther,
            showOther,
            quantity,
            cropsArray,
            errors,
            showModal,
             referrer
        } = this.state;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionStep2CreateComponent
                cropOptions={this.getCropOptions()}
                crop={crop}
                cropOther={cropOther}
                showOther={showOther}
                quantity={quantity}
                cropsArray={cropsArray}
                onTextChange={this.onTextChange}
                onCropSelectChange={this.onCropSelectChange}
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
        cropList: store.cropListState,
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
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionStep2CreateContainer);
