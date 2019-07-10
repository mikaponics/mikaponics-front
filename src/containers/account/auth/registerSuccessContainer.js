import React from 'react';
import { connect } from 'react-redux';

import RegisterSuccessComponent from '../../../components/account/auth/registerSuccessComponent';


class RegisterContainer extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    render () {
        return (
            <RegisterSuccessComponent />
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
)(RegisterContainer);
