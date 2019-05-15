import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../flashMessageComponent";


class ProductionInspectionComponent extends Component {
    render() {
        const { productionDetail, flashMessage } = this.props;
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
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-eye"></i>&nbsp;Inspection
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1>
                    <i className="fas fa-eye"></i>&nbsp;Inspection
                </h1>

                <section className="row text-center placeholders">
                    <div className="col-sm-3 placeholder">
                        <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                            <Link to={`/production/${productionDetail.slug}/create-inspection/start`} className="d-block link-ndecor" title="Clients">
                                <h1 className="circle-title">
                                    <i className="fas fa-plus"></i>
                                </h1>
                            </Link>
                        </div>
                        <h4>Add Inspection</h4>
                        <div className="text-muted">Add your production inspection</div>
                    </div>

                </section>
            </div>
        );
    }
}


export default ProductionInspectionComponent;
