import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProductionStep3CreateComponent from "../../components/production/productionStep3CreateComponent";
import { pullCropList } from "../../actions/cropListActions";
import { pullDeviceList } from "../../actions/deviceListActions";


class ProductionStep3CreateContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            // DEVELOPERS NOTE: This variable is used as the main way to add
            // GUI modification to the fields. Simply adding a key and the
            // message will result in an error message displaying for that
            // field. Please make sure the `name` in the HTML field equals
            // the `name` dictonary key in this dictionary.
            errors: {},

            referrer: '',
            showModal: false,
            name: null,
            description: null,
            device: null,

            // DEVELOPERS NOTE: The following state objects are used to store
            // the data from the modal.
            crop: null,
            cropOther: null,
            cropQuantity: null,
            cropsTableData: [],

            /**
            --- PRODUCTION ---
            environment
            is_commercial
            type_of
            grow_system
            grow_system_other
            started_at

            --- PRODUCTION CROP ---
            crop_other
            quantity
            substrate
            substrate_other

            */
        }
        this.getDeviceOptions = this.getDeviceOptions.bind(this);
        this.getCropOptions = this.getCropOptions.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onCropSelectChange = this.onCropSelectChange.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
        this.onSaveModalClick = this.onSaveModalClick.bind(this);
        this.onCloseModalClick = this.onCloseModalClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    /**
     *  Utility function will take the device list objects we have from the
     *  API endpoint and generate options data for the `react-select` component
     *  we are using.
     */
    getDeviceOptions() {
        const deviceOptions = [];
        const deviceList = this.props.deviceList;
        if (deviceList !== undefined && deviceList !== null) {
            const results = deviceList.results;
            if (results !== undefined && results !== null) {
                for (let i = 0; i < results.length; i++) {
                    let device = results[i];
                    // console.log(device); // For debugging purposes.
                    deviceOptions.push({
                        selectName: "device",
                        value: device.slug,
                        label: device.name
                    });
                }
            }
        }
        return deviceOptions;
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
                    // console.log(crop); // For debugging purposes.
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
        this.props.pullDeviceList(this.props.user); // Get latest data from API.
        this.props.pullCropList(this.props.user);
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

    onSelectChange(option) {
        this.setState({
            [option.selectName]: option.value
        })
    }

    onCropSelectChange(option) {
        this.setState({
            crop: option.value,
            cropOption: option,
        })
    }

    onRemoveButtonClick(slug) {
        let a = this.state.cropsTableData.slice(); //creates the clone of the state
        for (let i = 0; i < a.length; i++) {
            let row = a[i];
            console.log(">>>",row);
            if (row.slug === slug) {
                console.log(">>>>>>",row, " <> ", slug);
                delete row[i]; // delete element at our index.
                this.setState({
                    cropsTableData: a
                });
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
        let errors = {};
        let hasError = false;
        if (this.state.crop === undefined || this.state.crop === null) {
            errors['crop'] = "Please pick a crop";
            hasError = true;
        }
        if (this.state.cropQuantity === undefined || this.state.cropQuantity === null) {
            errors['cropQuantity'] = "Please pick a quantity";
            hasError = true;
        }

        // CHECK TO SEE IF WE HAVE ANY ERRORS DETECTED IN THIS MODAL FORM SUBMISSION.
        // IF THERE IS ANY ERRORS THEN WE RETURN THE ERRORS.
        if (hasError) {
            this.setState({
                errors: errors
            })

        // ELSE WE CHANGE THE STATE TO REFLECT WHAT THE USER SAVED.
        } else {
            // Append our array.
            let a = this.state.cropsTableData.slice(); //creates the clone of the state
            a.push({
                slug: this.state.cropOption.value,
                name: this.state.cropOption.label,
                quantity: this.state.cropQuantity,
            });

            // Close the modal, reset any errors and clear field values.
            this.setState({
                showModal: false,
                errors: {},
                crop: null,
                cropQuantity: null,
                cropsTableData: a
            });
        }
    }

    onCloseModalClick() {
        this.setState({
            showModal: false
        })
    }

    onSubmit(e) {
        alert("SUBMITTING...");
    }

    onBackClick(e) {
        this.setState({
            referrer: '/add-production-step-2'
        })
    }

    onNextClick(e) {
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
            referrer, name, description, device, crop, cropOther, cropQuantity,
            cropsTableData, errors, showModal, onBackClick, onNextClick
        } = this.state;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionStep3CreateComponent
                name={name}
                description={description}
                deviceOptions={this.getDeviceOptions()}
                device={device}
                cropOptions={this.getCropOptions()}
                crop={crop}
                cropOther={cropOther}
                cropQuantity={cropQuantity}
                cropsTableData={cropsTableData}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onCropSelectChange={this.onCropSelectChange}
                onAddButtonClick={this.onAddButtonClick}
                onRemoveButtonClick={this.onRemoveButtonClick}
                onSaveModalClick={this.onSaveModalClick}
                onCloseModalClick={this.onCloseModalClick}
                onSubmit={this.onSubmit}
                errors={errors}
                showModal={showModal}
                onNextClick={this.onNextClick}
                onBackClick={this.onBackClick}
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
        pullCropList: (user, page) => {
            dispatch(
                pullCropList(user, page)
            )
        },
        pullDeviceList: (user, page) => {
            dispatch(
                pullDeviceList(user, page)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionStep3CreateContainer);
