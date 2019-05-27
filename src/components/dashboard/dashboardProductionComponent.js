import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from "react-router-dom";


export default class DashboardProductionComponent extends Component {
    render() {
        const { name, evaluationLetter, evaluationHasError, absoluteUrl, lastModifiedPrettyAt } = this.props.production;
        const { timezone } = this.props.user;
        let scoreText = null;
        if (evaluationHasError) {
            scoreText = "Error - Please investigate";
        } else {
            scoreText = evaluationLetter
        }
        return (
            <div className="col-sm-4" key={name}>
                <div className="card text-center">
                    <p className="mt-4 pt-3 mb-2"><i className="fas fa-leaf fa-4x text-muted"></i></p>
                    <div className="card-body">
                        <h3 className="card-title">{name}</h3>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <strong>Grade:</strong>&nbsp;{scoreText}
                        </li>
                        <li className="list-group-item">
                            <strong>Last Updated</strong>:&nbsp;
                            <Moment tz={timezone} format="YYYY/MM/DD hh:mm:ss a">
                                {lastModifiedPrettyAt}
                            </Moment>
                        </li>
                        { /*
                        <li className="list-group-item">
                            <div className="col-sm-12 text-center">
                                <img className="img-fluid" src="/img/placeholder.png" alt="Logo" width="180px" />

                            </div>
                        </li>
                        */ }
                    </ul>
                    <div className="card-body">

                        <form id="reset-form" autoComplete="off" className="form" method="post">

                            <Link to={absoluteUrl} className="btn btn-lg btn-primary btn-block">
                                View&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
