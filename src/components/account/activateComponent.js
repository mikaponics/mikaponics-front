import React from 'react';
import { Link } from "react-router-dom";


class ActivateComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <main id="main">

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/"><i className="fas fa-home"></i>&nbsp;Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                 <i className="fas fa-user"></i>&nbsp;Account Activated
                            </li>
                        </ol>
                    </nav>

                    <div className="jumbotron">
                        <h1 className="display-4">Activated</h1>
                        <p className="lead">Your account has begin <strong>activated</strong>, you may now begin using your account. Click the button below to get started.</p>

                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" to="/onboard">
                                <i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard
                            </Link>
                        </p>
                    </div>
                </main>
            </div>
        );
    }
}

export default ActivateComponent
