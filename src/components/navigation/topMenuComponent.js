import React, { Component } from 'react';
import { Link } from "react-router-dom";


class TopMenuComponent extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <header className="top-navbar navbar navbar-dark fixed-top bg-dark justify-content-between">
                    <Link className="navbar-brand" to="/">Mikaponics</Link>
                </header>
            </div>
        );
    }
}

export default TopMenuComponent;
