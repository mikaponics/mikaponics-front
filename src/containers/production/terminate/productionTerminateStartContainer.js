import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Scroll from 'react-scroll';

import ProductionTerminateStartComponent from "../../../components/production/terminate/productionTerminateStartComponent";
import { pullProductionDetail } from "../../../actions/productionActions";


class ProductionTerminateStartContainer extends Component {

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
            slug: slug,
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
            referrer: this.props.productionDetail.absoluteURL
        });
    }

    onSubmit(e) {
        e.preventDefault();
        localStorage.setItem('terminateCropPageIndex', 0);
        this.setState({
            referrer: '/production/'+ this.state.slug + '/terminate-crop'
        });
    }

    /**
     *  Main render function - entry
     *------------------------------------------------------------
     */

    render() {
        const { referrer, errors, finishedAt, crops } = this.state;
        const { name, slug, plants, fish } = this.props.productionDetail;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        console.log("render | PageIndex", 0);
        console.log("render | ArrayLength", this.props.productionDetail.crops.length);
        return (
            <ProductionTerminateStartComponent
                name={name}
                slug={slug}
                errors={errors}
                finishedAt={finishedAt}
                plants={plants}
                fish={fish}
                crops={crops}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionTerminateStartContainer);
