import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Scroll from 'react-scroll';

import {
    PRODUCTION_INSPECTION_FREQUENCY_CHOICES,
    RED_ALERT_DELAY_IN_SECONDS_CHOICES
} from "../../../constants/api";
import { validateStep4Input } from '../../../validations/productionCreateValidator';
import ProductionStep4CreateComponent from "../../../components/production/create/productionStep4CreateComponent";


class ProductionStep4CreateContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        // localStorage.removeItem('temp-inspectionFrequency')
        this.state = {
            // DEVELOPERS NOTE: This variable is used as the main way to add
            // GUI modification to the fields. Simply adding a key and the
            // message will result in an error message displaying for that
            // field. Please make sure the `name` in the HTML field equals
            // the `name` dictonary key in this dictionary.
            errors: {},

            inspectionFrequency: parseInt(localStorage.getItem('temp-inspectionFrequency')),
            redBelowValue: parseInt(localStorage.getItem('temp-redBelowValue')),
            redAlertDelayInSeconds: parseInt(localStorage.getItem('temp-redAlertDelayInSeconds')),
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        localStorage.setItem('temp-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        this.setState({
            [option.selectName]: option.value
        })
        localStorage.setItem('temp-'+[option.selectName], option.value);
    }

    onBackClick(e) {
        e.preventDefault();
        this.props.history.push('/add-production-step-3');
    }

    onNextClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateStep4Input(this.state);
        if (isValid) {
            this.props.history.push('/add-production-step-5');
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

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const { errors, inspectionFrequency, redBelowValue, redAlertDelayInSeconds } = this.state;
        return (
            <ProductionStep4CreateComponent
                inspectionFrequency={inspectionFrequency}
                inspectionFrequencyOptions={PRODUCTION_INSPECTION_FREQUENCY_CHOICES}
                redBelowValue={redBelowValue}
                redAlertDelayInSeconds={redAlertDelayInSeconds}
                redAlertDelayInSecondsOptions={RED_ALERT_DELAY_IN_SECONDS_CHOICES}
                errors={errors}
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
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // pullCropLifeCycleStageList: (user, page, typeOf) => {
        //     dispatch(
        //         pullCropLifeCycleStageList(user, page, typeOf)
        //     )
        // },
        // pullCropDataSheetList: (user, page, typeOf) => {
        //     dispatch(
        //         pullCropDataSheetList(user, page, typeOf)
        //     )
        // },
        // pullCropSubstrateList: (user, page, typeOf) => {
        //     dispatch(
        //         pullCropSubstrateList(user, page, typeOf)
        //     )
        // }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionStep4CreateContainer);
