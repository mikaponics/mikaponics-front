import React, { Component } from "react";
import { connect } from 'react-redux';

import NotFound404Component from "../../components/navigation/notFound404Component";


class NotFound404Container extends Component {
    render() {
        return(
            <NotFound404Component
                user={this.props.user}
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
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotFound404Container);
