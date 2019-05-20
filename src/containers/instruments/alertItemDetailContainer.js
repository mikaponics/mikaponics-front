import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlertItemDetailComponent from "../../components/instruments/alertItemDetailComponent";
import { pullAlertItemDetail } from "../../actions/alertItemDetailActions";


class AlertItemDetailContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            alertSlug: slug
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullAlertItemDetail(this.props.user, this.props.match.params.slug);
    } // end FUNC.

    render() {
        return (
            <AlertItemDetailComponent
               alertDetail={this.props.alertDetail}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        alertDetail: store.alertItemDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullAlertItemDetail: (user, alertSlug) => {
            dispatch(
                pullAlertItemDetail(user, alertSlug)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertItemDetailContainer);
