import React from 'react';
import { Link } from "react-router-dom";


class ActivateComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <main id="main">
                    <div className="jumbotron">
                        <h1 className="display-4">Activated</h1>
                        <p className="lead">Your account has begin activated, you may now loggin.</p>

                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" to="/onboard">Dashboard</Link>
                        </p>
                    </div>
                </main>
            </div>
        );
    }
}

export default ActivateComponent
