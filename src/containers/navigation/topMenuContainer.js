import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import { setLogoutSuccess } from "../../actions/loginAction";
import { setFlashMessage } from "../../actions/flashMessageActions";
import TopMenuComponent from "../../components/navigation/topMenuComponent";


class TopMenuContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenMenu: false,
            referrer: null,
        }
        this.onHamburgerMenuClick = this.onHamburgerMenuClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.closeSideMenuAction = this.closeSideMenuAction.bind(this);
    }

    /**
     *  Function used to toggle the menu open and closed.
     */
    onHamburgerMenuClick() {
        this.setState({
            isOpenMenu: !this.state.isOpenMenu
        })
    }

    closeSideMenuAction() {
        this.setState({
            isOpenMenu: false
        })
    }

    onLogoutClick() {
        // Clear the local storage.
        localStorage.clear();

        // Create a flash message telling the user that they successfully logged out.
        this.props.setFlashMessage("success", "You have successfully logged out.");
        this.props.setLogoutSuccess();

        // Redirect to the login page with success message.
        this.setState({
            referrer: "/login",
            isOpenMenu: false,
        })
    }

    render() {
        const { user } = this.props;
        const { referrer } = this.state;
        if (referrer) {
            return <Redirect to={"/login"} />;
        }
        return (
            <TopMenuComponent
                history={this.props.history}
                location={this.props.location}
                match={this.props.match}
                staticContext={this.props.staticContext}
                isOpenMenu={this.state.isOpenMenu}
                onHamburgerMenuClick={this.onHamburgerMenuClick}
                onLogoutClick={this.onLogoutClick}
                user={user}
                closeSideMenuAction={this.closeSideMenuAction}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        setLogoutSuccess: () => {
            dispatch(setLogoutSuccess())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopMenuContainer);
