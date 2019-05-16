import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW,
    PRODUCTION_CROPS_INSPECTION_BAD_REVIEW,
} from '../../../constants/api';


class ProductionCropInspectionTableComponent extends Component {
    render() {
        const {
            productionCropName,
            prettyReview,
            review,
            failureReason,
            prettyStage,
            notes
        } = this.props.crop;
        const reviewWasFailure = (review === PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW) || (review === PRODUCTION_CROPS_INSPECTION_BAD_REVIEW);
        return (
            <table className="table table-bordered custom-cell-w">
                <tbody>
                    <tr className="bg-dark">
                        <th scope="row" colSpan="2" className="text-light">{productionCropName}</th>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Review</th>
                        <td>{prettyReview}</td>
                    </tr>
                    {reviewWasFailure &&
                        <tr>
                            <th scope="row" className="bg-light">Failure reason</th>
                            <td>{failureReason}</td>
                        </tr>
                    }
                    <tr>
                        <th scope="row" className="bg-light">Stage</th>
                        <td>{prettyStage}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="bg-light">Additional note(s)</th>
                        <td>{notes}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}


class ProductionInspectionDetailomponent extends Component {
    render() {
        const {
            productionDetail,
            productionInspectionDetail,
            onBackClick,
        } = this.props;
        const {
            didPass,
            failureReason,
            crops,
            notes,
        } = productionInspectionDetail;
        const didPassText = didPass === true ? "Yes" : "No";
        const didNotPass = didPass === false;
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
                        <li className="breadcrumb-item">
                            <Link to={`/production/${productionDetail.slug}`}><i className="fas fa-leaf"></i>&nbsp;{productionDetail.name}</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/production/${productionDetail.slug}/inspection`}>
                                <i className="fas fa-eye"></i>&nbsp;Inspection
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-file"></i>&nbsp;Inspection Details
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-file"></i>&nbsp;Inspection Details</h1>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Overall</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Did this inspection pass?</th>
                                    <td>{didPassText}</td>
                                </tr>
                                {didNotPass &&
                                    <tr>
                                        <th scope="row" className="bg-light">Failure Reason</th>
                                        <td>{failureReason}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Additional Note(s)</th>
                                    <td>{notes}</td>
                                </tr>
                            </tbody>
                        </table>
                        {crops.map(
                            (crop, i) => <ProductionCropInspectionTableComponent crop={crop} key={i} />)
                        }
                    </div>
                </div>

                <div className="form-group col-md-12 mb-3 mx-auto text-center">
                    <button className="btn btn-primary btn-lg btn-fxw mt-4" type="button" onClick={onBackClick}>
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </button>
                </div>

            </div>
        );
    }
}

export default ProductionInspectionDetailomponent;
