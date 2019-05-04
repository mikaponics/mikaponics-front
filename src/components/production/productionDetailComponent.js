import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';


class ProductionListComponent extends Component {
    render() {
        const { productionList } = this.props;

        let elements = [];
        if (productionList !== undefined && productionList !== null) {
            const { results } = productionList;
            if (results !== undefined && results !== null) {
                if (results.length === 0) {
                    elements = <NoProductionJumbotron />;
                } else {




                }
            }
        }

        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-leaf"></i>&nbsp;Crop Production</li>
                    </ol>
                </nav>
                <h1><i className="fas fa-leaf"></i>&nbsp;Crop Production</h1>
                <div className="card-group row">
                    {elements}
                </div>
            </div>
        );
    }
}

export default ProductionListComponent;
