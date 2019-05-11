import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import ProductionTerminateFinishComponent from "../../../components/production/terminate/productionTerminateFinishComponent";
import { pullProductionDetail } from "../../../actions/productionActions";
import { putProductionTermination } from "../../../actions/productionActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";


class ProductionTerminateFinishContainer extends Component {

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
            referrer: null,
            pageSlug: slug,
            errors: Object(),
            plants: [],
            fish: [],
            crops: []
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        // this.onSelectChange = this.onSelectChange.bind(this);
        // this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        // this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.setState({
            finishedAt: this.props.productionDetail.finishedAt,
            plants: this.props.productionDetail.plants,
            fish: this.props.productionDetail.fish,
            crops: this.props.productionDetail.crops
        });
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
        this.setState({
            referrer: '/production/'+ this.state.pageSlug + '/terminate-crop'
        });
    }

    onSubmit(e) {
        e.preventDefault();

        // Once our state has been validated `client-side` then we will
        // make an API request with the server to create our new production.
        this.props.putProductionTermination(
            this.props.user,
            this.state,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    onSuccessfulSubmissionCallback() {
        // this.props.setFlashMessage("success", "This production has been successfully terminated.");
        // this.setState({
        //     referrer: this.props.productionDetail.absoluteURL
        // });
    }

    onFailedSubmissionCallback() {
        // this.setState({
        //     errors: this.props.productionDetail.errors
        // })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSelectChange(typeOf, slug, name, value) {
        // // STEP 1:
        // // CHECK TO SEE IF WE NEED TO UPDATE THE `PLANTS` STATE OR THE `FISH`
        // // STATE.
        // let cropsArray = [];
        // if (typeOf === 'plants') {
        //     cropsArray = this.state.plants;
        // }
        // if (typeOf === 'fish') {
        //     cropsArray = this.state.fish;
        // }
        //
        // // STEP 2:
        // // ITERATE THROUGH ALL THE PLANTS AND FIND THE `SLUG`.
        // for (let i = 0; i < cropsArray.length; i++) {
        //     let crop = cropsArray[i];
        //     if (crop.slug === slug) {
        //
        //         // STEP 3: UPDATE OUR PLANT
        //         crop[name] = value;
        //
        //         console.log(typeOf, slug, name, value);
        //
        //         // STEP 3: DELETE
        //         //
        //         // Special thanks: https://flaviocopes.com/how-to-remove-item-from-array/
        //         //
        //         const newCropsArray = cropsArray.slice(
        //             0, i
        //         ).concat(
        //             cropsArray.slice(
        //                 i + 1, cropsArray.length
        //             )
        //         )
        //
        //         // STEP 4:
        //         // UPDATE OUR STATE WITH THE ARRAY.
        //         this.setState({
        //             crops: newCropsArray
        //         });
        //     }
        // } // end FOR
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const { crops, referrer, errors, finishedAt } = this.state;
        const { name, slug, plants, fish } = this.props.productionDetail;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionTerminateFinishComponent
                crops={crops}
                name={name}
                slug={slug}
                errors={errors}
                finishedAt={finishedAt}
                plants={plants}
                fish={fish}
                onSubmit={this.onSubmit}
                onBackClick={this.onBackClick}
                onSelectChange={this.onSelectChange}
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
    return {
        pullProductionDetail: (user, slug) => {
            dispatch(
                pullProductionDetail(user, slug)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putProductionTermination: (user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(
                putProductionTermination(user, state, onSuccessfulSubmissionCallback, onFailedSubmissionCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTerminateFinishContainer);
