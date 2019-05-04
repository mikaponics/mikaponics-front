import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductionListComponent from "../../components/production/productionListComponent";
import { pullProductionList } from "../../actions/productionActions";


class ProductionListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.props.pullProductionList(this.props.user, 1);
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
        this.props.pullProductionList(this.props.user, 1);
    }

    componentWillUnmount() {
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
            <ProductionListComponent
                productionList={this.props.productionList}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productionList: store.productionListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProductionList: (user, page) => {
            dispatch(
                pullProductionList(user, page)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionListContainer);
