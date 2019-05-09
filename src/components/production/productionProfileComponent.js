import React, { Component } from 'react';
import { Link } from "react-router-dom";


class ProductionProfileComponent extends Component {
    render() {
        const { productionDetail } = this.props;
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
                            <i className="fas fa-shopping-basket"></i>&nbsp;Harvest - Terminate
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-info"></i>&nbsp;Profile</h1>
            </div>
        );
    }
}


export default ProductionProfileComponent;
