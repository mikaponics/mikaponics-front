import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'

import './hamburger-menu.css';


class AnonymousMenu extends Component {
    render() {
        const { onHamburgerMenuClick, isOpenMenu } = this.props;
        return (
            <Menu pageWrapId={ "main" } outerContainerId={ "outer-container" } right noOverlay customBurgerIcon={ false } isOpen={ isOpenMenu }>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="login" className="menu-item" href="/login">Login</a>
                <a id="register" className="menu-item" href="/register">Register</a>
            </Menu>
        );
    }
}

class AuthenticatedMenu extends Component {
    render() {
        const { onHamburgerMenuClick, isOpenMenu, user } = this.props;
        return (
            <Menu pageWrapId={ "main" } outerContainerId={ "outer-container" } right noOverlay customBurgerIcon={ false } isOpen={ isOpenMenu }>
                <a id="home" className="menu-item" href="/dashboard">Dashboard</a>
                <a id="devices" className="menu-item" href="/devices">Devices</a>
                <a id="alerts" className="menu-item" href="/alerts">Alerts</a>
                <a id="invoices" className="menu-item" href="/invoices">Invoices</a>
                <a id="profile" className="menu-item" href="/profile">Profile</a>
                <a id="logout" className="menu-item" href="/">Logout</a>
            </Menu>
        );
    }
}


class TopMenuComponent extends Component {
    render() {
        const { onHamburgerMenuClick, isOpenMenu, user } = this.props;

        // THE FOLLOWING CODE WILL EITHER RENDER THE MENU BASED ON WHETHER
        // THE USER IS LOGGED IN OR NOT.
        let menuElement;
        if (user !== null && user !== undefined) {
            menuElement = (
                <AuthenticatedMenu
                    isOpenMenu={isOpenMenu}
                    onHamburgerMenuClick={onHamburgerMenuClick}
                    user={user}
                />
            );
        } else {
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
                    <Link className="navbar-brand" to="/">Mikaponics</Link>
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
