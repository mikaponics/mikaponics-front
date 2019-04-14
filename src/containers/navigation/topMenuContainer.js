import React, { Component } from 'react'
import { connect } from 'react-redux';

import TopMenuComponent from "../../components/navigation/topMenuComponent";


class TopMenuContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenMenu: false
        }
        this.onHamburgerMenuClick = this.onHamburgerMenuClick.bind(this);
    }

    /**
     *  Function used to toggle the menu open and closed.
     */
    onHamburgerMenuClick() {
        this.setState({
            isOpenMenu: !this.state.isOpenMenu
        })
    }
    
    render() {
        const { user } = this.props;
        return (
            <TopMenuComponent
                history={this.props.history}
                location={this.props.location}
                match={this.props.match}
                staticContext={this.props.staticContext}
                isOpenMenu={this.state.isOpenMenu}
                onHamburgerMenuClick={this.onHamburgerMenuClick}
                user={user}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopMenuContainer);
