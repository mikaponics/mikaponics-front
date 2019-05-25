import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Scroll from 'react-scroll';

import { CROP_PLANT_TYPE } from '../../../constants/api';
import { validateStep2Input } from '../../../validations/productionCreateValidator';
import ProductionStep4CreateComponent from "../../../components/production/create/productionStep4CreateComponent";


class ProductionStep4CreateContainer extends Component {

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
        }
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
    }

    onBackClick(e) {
        e.preventDefault();
        this.props.history.push('/add-production-step-3');
    }

    onNextClick(e) {
        e.preventDefault();
        this.props.history.push('/add-production-step-5');
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        return (
            <ProductionStep4CreateComponent
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
