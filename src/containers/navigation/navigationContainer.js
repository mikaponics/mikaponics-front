import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';

import { setFlashMessage } from "../../actions/flashMessageActions";


const anonymousMenuData = [
    {
        id: "anon-login",
        icon: "sign-in-alt",
        title: "Login",
        url: "/login"
    },{
        id: "anon-register",
        icon: "user",
        title: "Register",
        url: "/register"
    }
]

const authenticatedMenuData = [
    {
        id: "full-dashboard",
        icon: "tachometer-alt",
        title: "Dashboard",
        url: "/dashboard"
    },{
        id: "full-crops",
        icon: "industry",
        title: "Production",
        url: "/productions"
    },{
        id: "full-devices",
        icon: "cubes",
        title: "Devices",
        url: "/devices"
    },{
        id: "full-alerts",
        icon: "bell",
        title: "Alerts",
        url: "/alerts"
    },{
        id: "full-tasks",
        icon: "tasks",
        title: "Tasks",
        url: "/tasks"
    },{
        id: "full-account",
        title: "Account",
        icon: "id-card",
        url: "",
        children:[
            {
                id: "full-profile",
                icon: "user-circle",
                title: "Profile",
                url: "/profile"
            },{
                id: "full-invoices",
                icon: "receipt",
                title: "Invoices",
                url: "/invoices"
            },{
                id: "full-subscription",
                icon: "gem",
                title: "Subscription",
                url: "/subscription"
            },{
                id: "full-applications",
                icon: "server",
                title: "Applications",
                url: "/applications"
            },{
                id: "full-referral",
                icon: "heart",
                title: "Referrals",
                url: "/referrals"
            }
        ]
    },{
        id: "full-logout",
        icon: "sign-out-alt",
        title: "Logout",
        url: "/logout"
    }
]


class ItemNode extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen:false
        }
    }

    toggle = () => {
        // console.log("isOpen:", this.state.isOpen);
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { id, icon, title, url, children } = this.props.menuData;
        const sideMenuToggle = this.props.sideMenuToggle;
        if(children)
        {
            return (
                <li className="nav-item dropdown-btn" key={id}>
                    <Link className={`nav-link ${ this.state.isOpen ? "rotate-90" : ""}`} to="#" onClick={ this.toggle }>
                        <i className={`fa fa-${icon}`}></i>&nbsp;{ title }&nbsp;<i className="fa fa-caret-right" ></i>
                    </Link>
                    <ul style={{ display: this.state.isOpen ? "block" : "none"}}>
                        { children.map((item, index) => (
                            <ItemNode menuData={ item } key={ index } sideMenuToggle = { sideMenuToggle }></ItemNode>))
                        }
                    </ul>
                </li>)
        }
        else
        {
            return (
                <li className="nav-item" key={id}>
                    <NavLink className="nav-link" to={ url } onClick = { sideMenuToggle }>
                        <i className={`fa fa-${icon}`}></i>&nbsp;{ title }
                    </NavLink>
                </li>
            );
        }
    }
}
class NavigationContainer extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            active: false
        }

        this.sideMenuToggle = this.sideMenuToggle.bind(this);
    }

    sideMenuToggle() {
        this.setState({
            active: !this.state.active
        })
    }

  render() {
    const { user } = this.props;
    let menuTitle;
    let menuData;

    // console.log("NavigationContainer | user:", user); // For debugging purposes only.

    if (user !== null && user !== undefined) {
        if (user.wasEmailActivated) {
            const keysArr = Object.keys(user);
            const count = keysArr.length;
            if (count > 0) {
                // Generate a friendly message in the menu for authenitcatd users.
                menuTitle = "Hi, "+user.firstName;
                menuData = authenticatedMenuData;
            }

            // If the user is not `subscribed` to our service then we need to
            // restrict access to the following menu items.
            if (user.subscriptionStatus !== "active") {
                if (menuData !== undefined && menuData !== null) { // Defensive code.
                    delete menuData[3]; // Alerts
                }
            }
        }
    }

    // If no menu was set then we will create our anonymous menu by default.
    if (menuData === null || menuData === undefined) {
        menuTitle = "Menu"
        menuData = anonymousMenuData;
    }

    return (
        <div>
            <header className="top-navbar navbar navbar-dark fixed-top bg-dark justify-content-between">
                <Link className="navbar-brand" to="/">
                    <img className="img-fluid" src="/img/compressed-logo.png" alt="Mikaponics" width="200px" />
                </Link>
                <ul className="navbar-nav flex-row">
                    <li className="nav-item">
                    <button className={`navbar-toggler ${ this.state.active ? "active" : ""}` } type="button" id="sidebarCollapse"
                        onClick = { this.sideMenuToggle }>
                        <i className="fa fa-bars"></i>
                    </button>
                    </li>
                </ul>

            </header>
            <nav id="sidebar" className={ `${ this.state.active ? "active" : ""}` }>
                <div className="sideMenuTouchGlass"
                       onClick={ this.sideMenuToggle }
                         style={{ display: this.state.active ? "block" : "none"}}></div>
                <Scrollbars>
                    <p className="text-center text-light mt-3 mb-2">{menuTitle}</p>
                    <hr className="nav-divider" />
                    <ul className="nav flex-column">
                        { menuData.map((item, index)=>(
                            <ItemNode menuData={item} key={index} sideMenuToggle={this.sideMenuToggle}></ItemNode>
                        )) }
                    </ul>
                </Scrollbars>
            </nav>
        </div>
    )
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationContainer);
