import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import TaskProductionInspectionCreateFinishComponent from "../../../components/tasks/inspection/taskProductionInspectionCreateFinishComponent";
import {
    putProductionInspectionDetail
} from "../../../actions/productionInspectionActions";
import { PRODUCTION_INSPECTION_SUBMITTED_STATE } from '../../../constants/api';
import { setFlashMessage } from "../../../actions/flashMessageActions";


class TaskProductionInspectionCreateFinishContainer extends Component {

    /**
     *  Initializer, component life-cycle and utility functions.
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        this.state = {
            referrer: '',
            slug: slug,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
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

        const { slug, crops } = this.props.productionInspectionDetail;
        const len = crops.length - 1;
        const aURL = '/task/production-inspection/'+ slug + '/crop/'+len.toString();
        this.props.history.push(aURL);
    }

    onSubmit(e) {
        e.preventDefault();

        const data = {
            state: PRODUCTION_INSPECTION_SUBMITTED_STATE,
            didPass: this.props.productionInspectionDetail.didPass,
            failureReason: this.props.productionInspectionDetail.failureReason,
            notes: this.props.productionInspectionDetail.notes
        };
        console.log("onSubmit | data:", data); // For debugging purposes only.

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        this.props.putProductionInspectionDetail(
            this.props.user,
            data,
            this.props.productionInspectionDetail.slug,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        })
    }

    onSuccessfulSubmissionCallback() {
        this.setState({
            errors: {},
        });
        this.props.setFlashMessage("success", "Inspection has been successfully created.");
        this.props.history.push(this.props.productionDetail.absoluteUrl+"/inspection");
    }

    onFailedSubmissionCallback() {
        this.setState({
            errors: this.props.productionInspectionDetail.errors
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
        return (
            <TaskProductionInspectionCreateFinishComponent
                productionDetail={this.props.productionDetail}
                productionInspectionDetail={this.props.productionInspectionDetail}
                onBackClick={this.onBackClick}
                onSubmit={this.onSubmit}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productionDetail: store.productionDetailState,
        productionInspectionDetail: store.productionInspectionDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putProductionInspectionDetail: (user, state, slug, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                putProductionInspectionDetail(user, state, slug, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskProductionInspectionCreateFinishContainer);
