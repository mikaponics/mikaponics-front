import React from 'react';
import { connect } from 'react-redux';

import ActivateComponent from '../../components/account/activateComponent';


class ActivateContainer extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render () {
        const accessCode = this.props.match.params['code'];
        return (
            <ActivateComponent />
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivateContainer);
