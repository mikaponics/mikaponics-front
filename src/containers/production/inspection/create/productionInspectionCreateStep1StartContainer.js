import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import ProductionInspectionCreateStartComponent from "../../../../components/production/inspection/create/productionInspectionCreateStep1StartComponent";
import { validateStep1Input } from "../../../../validations/productionInspectionCreateValidator";
import { localStorageGetArrayItem } from "../../../../helpers/localStorageUtility";


class ProductionInspectionCreateStep1StartContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // The array of individual crop inspections which we need to load into
        // this container to load into the components because our navigation
        // needs it.
        const cropInspections = localStorageGetArrayItem("temp-production-inspection-create-cropInspections");

        this.state = {
            referrer: '',
            slug: slug,
            cropInspections: cropInspections,
            didPass: localStorage.getItem("temp-production-inspection-create-didPass"),
            didPassLabel: localStorage.getItem("temp-production-inspection-create-didPassLabel"),
            didPassOption: {},
            didPassOptions: [{
                id: 'didPass-true-choice',
                name: 'didPass',
                value: true,
                label: 'Yes',
            },{
                id: 'didPass-false-choice',
                name: 'didPass',
                value: false,
                label: 'No',
            }],
            notes: localStorage.getItem("temp-production-inspection-create-notes"),
            failureReason: localStorage.getItem("temp-production-inspection-create-failureReason"),
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    componentDidMount() {
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
        this.props.history.push(this.props.productionDetail.absoluteUrl+"/inspection");
    }

    onSubmit(e) {
        e.preventDefault();

        // --- didPass ---
        for (let i = 0; i < this.state.didPassOptions.length; i++) {
            let option = this.state.didPassOptions[i];
            let isSelected = false;
            if (this.state.didPass !== undefined && this.state.didPass !== null) {
                isSelected = this.state.didPass.toString() === option.value.toString();
                if (isSelected) {
                    localStorage.setItem('temp-production-inspection-create-didPassLabel', option.label);
                }
            }
        }

        // console.log(this.state); // For debugging purposes only.

        const { errors, isValid } = validateStep1Input(this.state);
        if (isValid) {
            this.setState({ errors: {}, isLoading: false });
            const aURL = '/production/'+ this.state.slug + '/create-inspection/crop/0';
            this.props.history.push(aURL);
        } else {
            this.setState({ errors: errors, isLoading: false });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    onTextChange(e) {
        // Save to state.
        this.setState({
            [e.target.name]: e.target.value
        });

        // Save to storage.
        const storageValueKey = "temp-production-inspection-create-"+[e.target.name];
        localStorage.setItem(storageValueKey, e.target.value)
    }

    onRadioChange(e) {
        // Get the values.
        const key = [e.target.name].toString();
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295

        // Generate our new keys.
        const storageValueKey = "temp-production-inspection-create-"+key;
        const storageLabelKey = "temp-production-inspection-create-"+key+"-label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const { referrer, errors, didPass, didPassOptions, failureReason, notes, cropInspections } = this.state;
        const { name, slug, plants, fish, crops } = this.props.productionDetail;

        if (slug === undefined || slug === "undefined") { // Defensive Code: Prevent undefined values.
            alert("Error - Cannot have `undefined` in URL slug, redirecting back to `/productions`.")
            return <Redirect to="/productions" />
        }

        return (
            <ProductionInspectionCreateStartComponent
                cropInspections={cropInspections}
                productionDetail={this.props.productionDetail}
                name={name}
                slug={slug}
                errors={errors}
                didPassOptions={didPassOptions}
                didPass={didPass}
                failureReason={failureReason}
                notes={notes}
                plants={plants}
                fish={fish}
                crops={crops}
                onSubmit={this.onSubmit}
                onBackClick={this.onBackClick}
                onRadioChange={this.onRadioChange}
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
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionCreateStep1StartContainer);
