import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import ProductionStep5CreateComponent from "../../../components/production/create/productionStep5CreateComponent";
import { postProductionDetail } from "../../../actions/productionActions";
import { pullDevice } from "../../../actions/deviceActions";
import { validateStep4Input } from '../../../validations/productionCreateValidator';
import { setFlashMessage } from "../../../actions/flashMessageActions";


class ProductionStep4CreateContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Extract our crops array (which is used to populate the table) from
        // the users's local storage.
        const stringCropsArr = localStorage.getItem("temp-plants");
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

        // Has night.
        const hasDayAndNightCycle = localStorage.getItem('temp-hasDayAndNightCycle');

        // night start.
        const dayStartsAtString = localStorage.getItem('temp-dayStartsAt');
        const dayStartsAtMoment  = (dayStartsAtString !== null && dayStartsAtString !== undefined) ? moment(dayStartsAtString) : null;
        const dayStartsAt = dayStartsAtMoment && hasDayAndNightCycle ? dayStartsAtMoment.format("HH:mm") : null;

        // night end.
        const dayFinishesAtString = localStorage.getItem('temp-dayFinishesAt');
        const dayFinishesAtMoment = (dayFinishesAtString !== null && dayFinishesAtString !== undefined) ? moment(dayFinishesAtString) : null;
        const nightEnd = dayFinishesAtMoment && hasDayAndNightCycle ? dayFinishesAtMoment.format("HH:mm") : null;

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
            isCommercial: localStorage.getItem('temp-isCommercial') === 'true',
            deviceSlug: localStorage.getItem('temp-device'),
            plantsArray: cropsArr,
            fishArray: fishArr,
            environment: parseInt(localStorage.getItem('temp-environment')),
            typeOf: parseInt(localStorage.getItem('temp-typeOf')),
            growSystem: parseInt(localStorage.getItem('temp-growSystem')),
            growSystemOther: localStorage.getItem('temp-growSystemOther'),
            startedAt: localStorage.getItem('temp-startedAt'),
            hasDayAndNightCycle: hasDayAndNightCycle ? hasDayAndNightCycle : false,
            dayStartsAt: hasDayAndNightCycle ? dayStartsAt : null,
            dayFinishesAt: hasDayAndNightCycle ? nightEnd : null
        }
        this.onBackClick = this.onBackClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
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
        e.preventDefault();
        this.props.history.push('/add-production-step-4');
    }

    onNextClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateStep4Input(this.state);
        if (isValid) {
            // Once our state has been validated `client-side` then we will
            // make an API request with the server to create our new production.
            this.props.postProductionDetail(
                this.props.user,
                this.state,
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );
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

    onSuccessfulSubmissionCallback() {
        // Clear submission form.
        localStorage.removeItem('temp-name');
        localStorage.removeItem('temp-description');
        localStorage.removeItem('temp-isCommercial');
        localStorage.removeItem('temp-device');
        localStorage.removeItem('temp-environment');
        localStorage.removeItem('temp-typeOf');
        localStorage.removeItem('temp-growSystem');
        localStorage.removeItem('temp-growSystemOther');
        localStorage.removeItem('temp-startedAt');
        localStorage.removeItem('temp-hasDayAndNightCycle');
        localStorage.removeItem('temp-dayStartsAt');
        localStorage.removeItem('temp-dayFinishesAt');
        localStorage.removeItem("temp-plants");
        localStorage.removeItem("temp-fish");

        // Add success message.
        this.props.setFlashMessage("success", "Production has been successfully created.");

        // Redirect to the productions list.
        this.setState({
            referrer: '/productions'
        });
    }

    onFailedSubmissionCallback() {
        this.setState({
            errors: this.props.productionDetail.errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const { name, description, isCommercial, plantsArray, fishArray, errors, showModal, referrer } = this.state;
        const { device } = this.props;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionStep5CreateComponent
                name={name}
                description={description}
                isCommercial={isCommercial}
                device={device}
                plantsArray={plantsArray}
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
        productionDetail: store.productionDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullDevice: (user, slug) => {
            dispatch(
                pullDevice(user, slug)
            )
        },
        postProductionDetail: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                postProductionDetail(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionStep4CreateContainer);
