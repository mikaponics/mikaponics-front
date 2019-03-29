import React, { Component } from 'react';
import { Link } from "react-router-dom";


class ProfileTable extends Component {
    render() {
        const { profile } = this.props;
        return (
            <div>
                <h3>Basic</h3>
            </div>
        )
    }
}


class ProfileEditComponent extends Component {
    render() {
        const { profile, onChange, onClick } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                           <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Profile</li>
                    </ol>
                </nav>
                <h1>Profile</h1>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <ProfileTable profile={profile} />
                        <button onClick={onClick}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileEditComponent;
