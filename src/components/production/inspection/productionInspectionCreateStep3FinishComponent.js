import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW,
    PRODUCTION_CROPS_INSPECTION_BAD_REVIEW,
} from '../../../constants/api';
import ProductionInspectionCreateStepNavigationComponent from './productionInspectionCreateStepNavigationComponent';


class ProductionCropInspectionTableComponent extends Component {
    render() {
        const {
            productionCropName,
            prettyReview,
            review,
            failureReason,
            stage,
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
                        <td>{stage.name}</td>
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


class ProductionInspectionCreateStep3FinishComponent extends Component {
    render() {
        const {
            productionDetail,
            productionInspectionDetail,
            onBackClick,
            onSubmit
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
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Add</h1>

                <ProductionInspectionCreateStepNavigationComponent
                   productionInspectionDetail={productionInspectionDetail}
                   productionCropInspectionDetail={null}
                   isFirst={false}
                   isLast={true}
                />

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <p><strong>Please confirm these details before checking out your order.</strong></p>
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

                <div className="col-md-6 mx-auto mt-2">
                    <form className="needs-validation" noValidate>
                        <div className="form-group">
                            <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onBackClick}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
                            <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onSubmit}>
                                <i className="fas fa-check-circle"></i>&nbsp;Submit
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default ProductionInspectionCreateStep3FinishComponent;
