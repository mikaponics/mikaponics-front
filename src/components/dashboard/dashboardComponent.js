import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
import 'moment-timezone';
import { Link } from "react-router-dom";


class DashboardProductionComponent extends Component {
    render() {
        const { name, evaluationScore, evaluationHasError, absoluteUrl, lastModifiedPrettyAt } = this.props.production;
        const { timezone } = this.props.user;
        let scoreText = null;
        if (evaluationHasError) {
            scoreText = "Error - Please investigate";
        } else {
            scoreText = evaluationScore
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
                            <strong>Score:</strong>&nbsp;{scoreText}
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


class DashboardComponent extends Component {
    render() {
        const { productions, devices, activeAlertItemsCount, activeTaskItemsCount } = this.props.dashboard;
        const { user } = this.props;

        const isProductionsEmpty = isEmpty(productions) === true;
        const isNotProductionsEmpty = isEmpty(productions) === false;
        const productionsCount = productions.length;
        const devicesCount = devices.length;

        return (
            <div className="Dashboard">
                <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>

                <section className="row text-center placeholders">
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                            <Link to="/productions" className="d-block link-ndecor" title="Production">
                                <h1 className="circle-title">{productionsCount}</h1>
                            </Link>
                        </div>
                        <h4>Production</h4>
                        <div className="text-muted">View your production list</div>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                            <Link to="/devices" className="d-block link-ndecor" title="Devices">
                                <h1 className="circle-title">{devicesCount}</h1>
                            </Link>
                        </div>
                        <h4>Devices</h4>
                        <span className="text-muted">View your devices</span>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                            <Link to="/alerts" className="d-block link-ndecor" title="Alerts">
                                <h1 className="circle-title">{activeAlertItemsCount}</h1>
                            </Link>
                        </div>
                        <h4>Alerts</h4>
                        <span className="text-muted">View your alertss</span>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                            <Link to="/tasks" className="d-block link-ndecor" title="Tasks">
                                <h1 className="circle-title">{activeTaskItemsCount}</h1>
                            </Link>
                        </div>
                        <h4>Tasks</h4>
                        <span className="text-muted">View your tasks</span>
                    </div>
                </section>

                <div className="row">
                    <div className="col-12">
                        <h2><i className="fas fa-industry"></i>&nbsp;Productions</h2>
                        <hr />
                    </div>
                </div>
                {isNotProductionsEmpty &&
                    <div className="card-group row">
                        {productions.map(
                            (production, i) => <DashboardProductionComponent production={production} user={user} key={i} />)
                        }
                    </div>
                }
                {isProductionsEmpty &&
                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-bullhorn"></i>&nbsp;Attention
                        </h1>
                        <p className="lead">You currently do not have any crop productions running at the moment.</p>
                        <hr className="my-4" />
                        <p>If you would like to start running a crop production, please start by clicking below.</p>
                        <p className="lead">
                            <Link to="/add-production-step-1" className="btn btn-success btn-lg">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </Link>
                        </p>
                    </div>
                }
            </div>
        );
    }
}

export default DashboardComponent;
