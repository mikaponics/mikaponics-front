import React, { Component } from 'react';
import { Link } from "react-router-dom";


class ProfileComponent extends Component {
    render() {
        // const { instrument } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Profile</li>
                    </ol>
                </nav>
                <h1>Profile</h1>
                <hr />
                <p>TODO: IMPLEMENT</p>
            </div>
        );
    }
}

export default ProfileComponent;
