import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'

import './hamburger-menu.css';


/**
 *  The menu used when no user has logged in and the site is public facing.
 */
class AnonymousMenu extends Component {
    render() {
        const { onHamburgerMenuClick, isOpenMenu, closeSideMenuAction } = this.props;
        return (
            <Menu pageWrapId={ "main" } outerContainerId={ "outer-container" } right isOpen={ isOpenMenu }>
                <Link className="menu-item" to="/" onClick={closeSideMenuAction}>
                    <i className="fas fa-tachometer-alt"></i>&nbsp;Home
                </Link>

                <Link className="menu-item" to="/login" onClick={closeSideMenuAction}>
                    <i className="fas fa-sign-in-alt"></i>&nbsp;Login
                </Link>

                <Link className="menu-item" to="/register" onClick={closeSideMenuAction}>
                    <i className="fas fa-user"></i>&nbsp;Register
                </Link>
            </Menu>
        );
    }
}


/*
 *  The menu used when an authenticated user has logged in and is being "onboarded".
 */
class AuthenticatedFullMenu extends Component {
    render() {
        const { onHamburgerMenuClick, isOpenMenu, onLogoutClick, closeSideMenuAction, user } = this.props;
        return (
            <Menu pageWrapId={ "main" } outerContainerId={ "outer-container" } right isOpen={ isOpenMenu }>

                <Link className="menu-item" to="/dashboard" onClick={closeSideMenuAction}>
                    <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                </Link>

                <Link className="menu-item" to="/devices" onClick={closeSideMenuAction}>
                    <i className="fas fa-cubes"></i>&nbsp;Devices
                </Link>

                <Link className="menu-item" to="/alerts" onClick={closeSideMenuAction}>
                    <i className="fas fa-bell"></i>&nbsp;Alerts
                </Link>

                <Link className="menu-item" to="/invoices" onClick={closeSideMenuAction}>
                    <i className="fas fa-book"></i>&nbsp;Invoices
                </Link>

                <Link className="menu-item" to="/profile" onClick={closeSideMenuAction}>
                    <i className="fas fa-user-circle"></i>&nbsp;Profile
                </Link>

                <a id="logout" onClick={ onLogoutClick } className="menu-item--small" href="">
                    <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
                </a>
            </Menu>
        );
    }
}


/**
 *  The menu used when the user has been authenticated and the user account has
 *  successfully been onboarded thus giving the user unrestricted access to their
 *  account.
 */
class AuthenticatedOnboardingMenu extends Component {
    render() {
        const { onHamburgerMenuClick, isOpenMenu, onLogoutClick, closeSideMenuAction, user } = this.props;
        return (
            <Menu pageWrapId={ "main" } outerContainerId={ "outer-container" } right isOpen={ isOpenMenu }>

                <Link className="menu-item" to="/onboard">
                    <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
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
        const { onHamburgerMenuClick, isOpenMenu, onLogoutClick, user, closeSideMenuAction } = this.props;

        // THE FOLLOWING CODE WILL EITHER RENDER THE MENU BASED ON WHETHER
        // THE USER IS LOGGED IN OR NOT.
        let menuElement;
        if (user !== null && user !== undefined) {
            const keysArr = Object.keys(user);
            const count = keysArr.length;
            if (count > 0) {
                const { wasOnboarded } = user;

                if ( wasOnboarded) {
                    menuElement = (
                        <AuthenticatedFullMenu
                            isOpenMenu={isOpenMenu}
                            onHamburgerMenuClick={onHamburgerMenuClick}
                            onLogoutClick={onLogoutClick}
                            closeSideMenuAction={closeSideMenuAction}
                            user={user}
                        />
                    );
                } else {
                    menuElement = (
                        <AuthenticatedOnboardingMenu
                            isOpenMenu={isOpenMenu}
                            onHamburgerMenuClick={onHamburgerMenuClick}
                            onLogoutClick={onLogoutClick}
                            closeSideMenuAction={closeSideMenuAction}
                            user={user}
                        />
                    );
                }

            }
        }

        if (menuElement === undefined || menuElement === null) {
            menuElement = (
                <AnonymousMenu
                    isOpenMenu={isOpenMenu}
                    onHamburgerMenuClick={onHamburgerMenuClick}
                    closeSideMenuAction={closeSideMenuAction}
                />
            );
        }

        // RENDER OUR JSX CODE.
        return (
            <div>
                <header className="top-navbar navbar navbar-dark fixed-top bg-dark justify-content-between">
                    <Link className="navbar-brand" to="/">
                        <img className="img-fluid" src="/img/compressed-logo.png" alt="Mikaponics" width="200px" />
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
