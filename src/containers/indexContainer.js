import React, { Component } from 'react';
import { Link } from "react-router-dom";



class IndexContainer extends Component {
    render() {
        return (
            <div>
            <div className="row">
                <div className="col-md-12">

                    <div class="jumbotron">
                        <h1 class="display-4">Mikaponics</h1>
                        <p class="lead">A telemetry and alarm service for your aquaponics and hydroponics.</p>
                        <hr class="my-4" />
                        <p>If you already have an account, login through here.</p>

                        <Link to="/login" role="button" className="btn btn-primary btn-lg">Login</Link><br />

                        <hr class="my-4" />
                        <p>Don't have an account? Here is where you can create your account.</p>
                        <Link to="/register" role="button" className="btn btn-primary btn-lg">Register</Link>

                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            What is this?
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Open-source telemetry</h5>
                            <p class="card-text">We believe sharing our code-base is important for you data and your business. You are welcome to view the code and create similar projects based off our code.</p>
                            <a href="https://github.com/mikaponics" class="btn btn-primary">Visit Github.com</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            Links and Resources
                        </div>
                        <div class="card-body">
                            <p class="card-text">
                            <ul>
                                <li>Your privacy is important to us, please visit the <a href="#">privacy policy</a> while using our services.</li>
                                <li>The the <a href="#">terms and services</a> page describes what we expect from you.</li>
                            </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        );
    }
}

export default IndexContainer;
