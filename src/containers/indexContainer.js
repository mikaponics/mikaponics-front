import React, { Component } from 'react';
import { Link } from "react-router-dom";



class IndexContainer extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                <h1>Welcome</h1>
                <Link to="/login">Login</Link><br />
                <Link to="/register">Register</Link>
            </div>
            </div>

        );
    }
}

export default IndexContainer;
