import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductionDetailComponent from "../../components/production/productionDetailComponent";
import { pullProductionDetail } from "../../actions/productionActions";
import { clearFlashMessage } from "../../actions/flashMessageActions";


class ProductionListContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            slug: slug
        }

        // Attach our functions.
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.props.pullProductionDetail(this.props.user, this.state.slug);
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // This function will call the API backend every second to get the
        // device data.
        this.timerID = setInterval(
            () => this.tick(),
            10000 // 1000 milliseconds = 1 second
        );
    } // end FUNC.

    /**
     * Function used by the event timer to call the latest data from the API
     *  backend to get the latest device data.
     */
    tick() {
        this.props.pullProductionDetail(this.props.user, this.state.slug);
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(); // Clear the messages.
        clearInterval(this.timerID); // Clear our timer.

        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        return (
            <ProductionDetailComponent
                productionDetail={this.props.productionDetail}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productionDetail: store.productionDetailState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProductionDetail: (user, slug) => {
            dispatch(
                pullProductionDetail(user, slug)
            )
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionListContainer);
