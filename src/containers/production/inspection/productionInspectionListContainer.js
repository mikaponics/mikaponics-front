import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ProductionInspectionListComponent from "../../../components/production/inspection/productionInspectionListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class ProductionInspectionContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            referrer: null,
            slug: slug
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(); // Clear the messages.
        
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    render() {
        const { referrer } = this.state;
        if (referrer) {
            return <Redirect to={referrer} />
        }
        return (
            <ProductionInspectionListComponent
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
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductionInspectionContainer);
