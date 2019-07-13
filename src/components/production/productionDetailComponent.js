import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { FlashMessageComponent } from "../flashMessageComponent";
import { PRODUCTION_TERMINATED_STATE } from "../../constants/api";


class ProductionCropPassedEvaluationRowsComponent extends Component {
    render() {
        const { evaluationPass } = this.props;
        console.log(this.props);
        if (isEmpty(evaluationPass)) { return null; } // Defensive code.
        const { prettyInstrumentTypeOf } = evaluationPass;
        const hStyle = { color: 'green' };
        return (
            <tr>
                <th scope="row" className="bg-light">{prettyInstrumentTypeOf}</th>
                <td style={hStyle}>Pass</td>
            </tr>
        );
    }
}


class ProductionCropFailedEvaluationRowsComponent extends Component {
    render() {
        const { evaluationFailure } = this.props;
        if (isEmpty(evaluationFailure)) { return null; } // Defensive code.
        const { prettyInstrumentTypeOf, message } = evaluationFailure;
        const hStyle = { color: 'red' };
        return (
            <tr>
                <th scope="row" className="bg-light">{prettyInstrumentTypeOf}</th>
                <td style={hStyle}>Failed - {message}</td>
            </tr>
        );
    }
}


class ProductionCropEvaluationTableComponent extends Component {
    render() {
        const {
            prettyName, evaluationLetter, evaluatedAt, evaluationFailures, evaluationPasses, evaluationError
        } = this.props.crop;
        const hasEvaluationError = evaluationError !== undefined && evaluationError !== null;
        const hasNotEvaluationError = evaluationError === undefined || evaluationError === null;
        return (
            <div>
                {hasEvaluationError &&
                    <div className="jumbotron">
                        <h1 className="display-4">
                            <i className="fas fa-bug"></i>&nbsp;Error
                        </h1>
                        <p className="lead"><strong>{prettyName}</strong> crop appears to have an <strong>error</strong>. {evaluationError}</p>
                    </div>
                }
                {hasNotEvaluationError &&
                    <table className="table table-bordered custom-cell-w">
                        <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">{prettyName}</th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Quality Grade</th>
                                <td>
                                    {evaluationLetter &&
                                        evaluationLetter
                                    }
                                </td>
                            </tr>
                            {evaluationPasses && evaluationPasses.map(
                                (evaluationPass, i) => <ProductionCropPassedEvaluationRowsComponent evaluationPass={evaluationPass} key={i} />)
                            }
                            {evaluationFailures && evaluationFailures.map(
                                (evaluationFailure, i) => <ProductionCropFailedEvaluationRowsComponent evaluationFailure={evaluationFailure} key={i} />)
                            }
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

class ProductionTableComponent extends Component {
    render() {
        const { name, crops, absoluteUrl, evaluationLetter, evaluatedAt, timezone } = this.props.production;
        const { user } = this.props;
        const isCropsNotEmpty = isEmpty(crops) === false;
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2><i className="fas fa-server"></i>&nbsp;Evaluation</h2>
                    {isCropsNotEmpty &&
                        <div>
                            <table className="table table-bordered custom-cell-w">
                                <tbody>
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">Overall</th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Quality Grade</th>
                                        <td>{evaluationLetter}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Last Updated</th>
                                        <td>
                                            <Moment tz={user.timezone} format="YYYY/MM/DD hh:mm:ss a">
                                                {evaluatedAt}
                                            </Moment>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {crops.map(
                                (crop, i) => <ProductionCropEvaluationTableComponent crop={crop} key={i} />)
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}


class ProductionDetailComponent extends Component {
    render() {
        const { user, productionDetail, flashMessage, onHarvestClick } = this.props;
        const isLocked = productionDetail.state === PRODUCTION_TERMINATED_STATE;
        const isNotLocked = productionDetail.state !== PRODUCTION_TERMINATED_STATE;
        const isNotProductionCropsEmpty = isEmpty(productionDetail.crops) === false;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/productions"><i className="fas fa-industry"></i>&nbsp;Crop Production</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-leaf"></i>&nbsp;{productionDetail.name}
                        </li>
                    </ol>
                </nav>
                <h1>
                    <i className="fas fa-leaf"></i>&nbsp;{productionDetail.name}
                </h1>

                <FlashMessageComponent object={flashMessage} />

                <section className="row text-center placeholders">
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                            <Link to={`/production/${productionDetail.slug}/profile`} className={classnames('d-block link-ndecor', { 'disabled': isLocked })} title="Information">
                                <span className="r-circle"><i className="fas fa-info fa-3x"></i></span>
                            </Link>
                        </div>
                        <h4>Profile</h4>
                        <div className="text-muted">View your production profile</div>
                    </div>
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                            <Link to={`/production/${productionDetail.slug}/inspection`} className={classnames('d-block link-ndecor', { 'disabled': isLocked })} title="Inspection">
                                <span className="r-circle"><i className="fas fa-eye fa-3x"></i></span>
                            </Link>
                        </div>
                        <h4>Inspections</h4>
                        <span className="text-muted">View your inspections</span>
                    </div>
                    {isNotLocked &&
                        <div className="col-sm-3 placeholder">
                            <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                                <a className={classnames('d-block link-ndecor', { 'disabled': isLocked })} title="Harvest" onClick={onHarvestClick}>
                                    <span className="r-circle"><i className="fas fa-shopping-basket fa-3x"></i></span>
                                </a>
                            </div>
                            <h4>Harvest</h4>
                            <span className="text-muted">Terminate your production</span>
                        </div>
                    }

                    { /*
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                            <Link to="#" className="d-block link-ndecor" title="Tasks">
                                <h1 className="circle-title">12</h1>
                            </Link>
                        </div>
                        <h4>Tasks</h4>
                        <span className="text-muted">View your tasks</span>
                    </div>
                    */}
                </section>

                <ProductionTableComponent
                    production={productionDetail}
                    user={user}
                />

            </div>
        );
    }
}

export default ProductionDetailComponent;
