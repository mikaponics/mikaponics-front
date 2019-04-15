import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'

import './hamburger-menu.css';


class AnonymousMenu extends Component {
    render() {
        const { onHamburgerMenuClick, isOpenMenu } = this.props;
        return (
            <Menu pageWrapId={ "main" } outerContainerId={ "outer-container" } right noOverlay customBurgerIcon={ false } isOpen={ isOpenMenu }>
                <Link className="menu-item" to="/">
                    <i className="fas fa-tachometer-alt"></i>&nbsp;Home
                </Link>

                <Link className="menu-item" to="/login">
                    <i className="fas fa-sign-in-alt"></i>&nbsp;Login
                </Link>

                <Link className="menu-item" to="/register">
                    <i className="fas fa-user"></i>&nbsp;Register
                </Link>
            </Menu>
        );
    }
}

class AuthenticatedMenu extends Component {
    render() {
        const { onHamburgerMenuClick, isOpenMenu, onLogoutClick, user } = this.props;
        return (
            <Menu pageWrapId={ "main" } outerContainerId={ "outer-container" } right noOverlay customBurgerIcon={ false } isOpen={ isOpenMenu }>

                <Link className="menu-item" to="/dashboard">
                    <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                </Link>

                <Link className="menu-item" to="/devices">
                    <i className="fas fa-cubes"></i>&nbsp;Devices
                </Link>

                <Link className="menu-item" to="/alerts">
                    <i className="fas fa-bell"></i>&nbsp;Alerts
                </Link>

                <Link className="menu-item" to="/invoices">
                    <i className="fas fa-book"></i>&nbsp;Invoices
                </Link>

                <Link className="menu-item" to="/profile">
                    <i className="fas fa-user-circle"></i>&nbsp;Profile
                </Link>

                <a id="logout" onClick={ onLogoutClick } className="menu-item--small" href="">
                    <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
                </a>
            </Menu>
        );
    }
}


class TopMenuComponent extends Component {
    render() {
        const { onHamburgerMenuClick, isOpenMenu, onLogoutClick, user } = this.props;

        // THE FOLLOWING CODE WILL EITHER RENDER THE MENU BASED ON WHETHER
        // THE USER IS LOGGED IN OR NOT.
        let menuElement;
        if (user !== null && user !== undefined) {
            const keysArr = Object.keys(user);
            const count = keysArr.length;
            if (count > 0) {
                menuElement = (
                    <AuthenticatedMenu
                        isOpenMenu={isOpenMenu}
                        onHamburgerMenuClick={onHamburgerMenuClick}
                        onLogoutClick={onLogoutClick}
                        user={user}
                    />
                );
            }
        }

        if (menuElement === undefined || menuElement === null) {
            menuElement = (
                <AnonymousMenu
                    isOpenMenu={isOpenMenu}
                    onHamburgerMenuClick={onHamburgerMenuClick}
                />
            );
        }

        // RENDER OUR JSX CODE.
        return (
            <div>
                <header className="top-navbar navbar navbar-dark fixed-top bg-dark justify-content-between">
                    <Link className="navbar-brand" to="/">
                        <img class="img-fluid" src="/img/compressed-logo.png" alt="Mikaponics" width="200px" />
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={onHamburgerMenuClick}>
                        <i className="fa fa-bars"></i>
                    </button>
                </header>
                {menuElement}
            </div>
        );
    }
}

export default TopMenuComponent;
