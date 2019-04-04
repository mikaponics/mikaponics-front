import React from 'react';
import { Link } from "react-router-dom";


class RegisterSuccessComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <main id="main">
                    <div className="jumbotron">
                        <h1 className="display-4">Registed</h1>
                        <p className="lead">Thank you for registration, an activation email has been sent to your inbox. Please follow the instructions provided to activate your account.</p>
                        <hr className="my-4" />
                        <p>Once you have been activated, you will be able to log into the system.</p>
                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" to="/">Finish</Link>
                        </p>
                    </div>
                </main>
            </div>
        );
    }
}

export default RegisterSuccessComponent
