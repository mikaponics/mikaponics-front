import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';


class ProductionCropCardItem extends Component {
    render() {
        const { crop } = this.props;
        return (
            <div className="col-sm-4" key={crop.slug}>
                <div className="card box-shadow text-center mx-auto">
                    <div className="card-custom-top-2">
                        <i className="fas fa-user fa-3x"></i>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{crop.crop}</h3>
                        <p className="card-text">Quantity: {crop.quantity}</p>
                        <Link to={crop.absoluteURL} className="btn btn-success btn-lg">
                            Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}


class ProductionCropCards extends Component {
    render() {
        const { crops } = this.props.object;
        let elements = [];

        for (let i = 0; i < crops.length; i++) {
            elements.push(
                <ProductionCropCardItem crop={crops[i]} key={crops[i].slug} />
            );
        }
        return (
            <div className="card-group row">
                {elements}
            </div>
        );
    }
}


class ProductionSummaryTable extends Component {
    render() {
        const { absoluteURL, crops, slug } = this.props.object;
        return (

            <div className="row">
                <div className="col-md-12">

                    <table className="table table-bordered custom-cell-w">
                        <tbody>
                            <tr className="bg-dark">
                                <th scope="row" colSpan="2" className="text-light">test</th>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Last measured value</th>
                                <td>test</td>
                            </tr>
                            <tr>
                                <th scope="row" className="bg-light">Last measured time</th>
                                <td>
                                    test
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


class ProductionDetailComponent extends Component {
    render() {
        const { productionDetail } = this.props;

        let elements = [];
        if (productionDetail !== undefined && productionDetail !== null) {
            elements.push(
                <ProductionCropCards object={productionDetail} key="prod-crop-cards" />
            )
            elements.push(
                <ProductionSummaryTable object={productionDetail} key="prod-crop-table" />
            );
        }

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
                            <i className="fas fa-leaf"></i>&nbsp;{productionDetail.prettyTypeOf}
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-leaf"></i>&nbsp;{productionDetail.prettyTypeOf}</h1>
                {elements}
            </div>
        );
    }
}

export default ProductionDetailComponent;
