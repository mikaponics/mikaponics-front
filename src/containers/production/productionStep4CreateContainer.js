import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import ProductionStep1CreateComponent from "../../components/production/productionStep4CreateComponent";
import { pullDevice } from "../../actions/deviceActions";
import { validateStep4Input } from '../../validations/productionCreateValidator';


class ProductionStep4CreateContainer extends Component {

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

            name: localStorage.getItem('temp-name'),
            description: localStorage.getItem('temp-description'),
            deviceSlug: localStorage.getItem('temp-device'),
            cropsArray: cropsArr,
            fishArray: fishArr
        }
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    componentDidMount() {
        const deviceSlug = localStorage.getItem('temp-device');
        this.props.pullDevice(this.props.user, deviceSlug); // Get latest data from API.
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
        this.setState({
            referrer: '/add-production-step-3'
        })
    }

    onNextClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateStep4Input(this.state);
        if (isValid) {
            this.setState({
                referrer: '/add-production-step-5'
            })
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
        const { name, description, cropsArray, fishArray, errors, showModal, referrer } = this.state;
        const { device } = this.props;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionStep1CreateComponent
                name={name}
                description={description}
                device={device}
                plantsArray={cropsArray}
                fishArray={fishArray}
                errors={errors}
                onBackClick={this.onBackClick}
                onNextClick={this.onNextClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        device: store.deviceState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullDevice: (user, slug) => {
            dispatch(
                pullDevice(user, slug)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionStep4CreateContainer);
