import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';
import {
    PRODUCTION_CROP_STATE_AT_FINISH_OPTION_CHOICES,
    PRODUCTION_CROPS_HARVEST_REVIEW_AT_FINISH_OPTION_CHOICES,
    PRODUCTION_CROPS_DIED,
    PRODUCTION_CROPS_WERE_TERMINATED,
    PRODUCTION_CROPS_TERRIBLE_HARVEST_REVIEW,
    PRODUCTION_CROPS_BAD_HARVEST_REVIEW
} from '../../../constants/api';
import ProductionTerminateWizard from './productionTerminateWizard';


class ProductionTerminateStartComponent extends Component {
    render() {
        const { crops, name, slug, plants, fish, errors, finishedAt, onBackClick, onSubmit, onSelectChange } = this.props;
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
                            <Link to={`/production/${slug}`}><i className="fas fa-leaf"></i>&nbsp;{name}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-shopping-basket"></i>&nbsp;Harvest - Terminate
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-shopping-basket"></i>&nbsp;Harvest or Terminate - LAst</h1>

                <ProductionTerminateWizard
                   pageIndex={0}
                   crops={crops}
                   isFirst={false}
                   isLast={true}
                />

                <div className="col-md-5 mx-auto mt-2">
                    <form className="needs-validation" noValidate>




                        <div className="form-group">
                            <button type="text" className="btn btn-lg float-left pl-4 pr-4 btn-secondary" onClick={onBackClick}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
                            <button type="text" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onSubmit}>
                                <i className="fas fa-check"></i>&nbsp;Submit
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        );
    }
}


export default ProductionTerminateStartComponent;
