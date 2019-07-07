import React, { Component } from 'react';
import { Link } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
import shortid from "shortid";


class ProductionProfileComponent extends Component {
    render() {
        const { productionDetail } = this.props;
        const {
            name,
            description,
            isCommercial,
            device,
            plants,
            fish,
        } = productionDetail;
        const isCommericalText = isCommercial ? "Yes" : "No";
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
                            <i className="fas fa-info"></i>&nbsp;Profile
                        </li>
                    </ol>
                </nav>
                <h1><i className="fas fa-info"></i>&nbsp;Profile</h1>
                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">


                        <h2><i className="fas fa-table"></i>&nbsp;Details</h2>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">General details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is commercial?</th>
                                    <td>{isCommericalText}</td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Device details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{device.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{device.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Link</th>
                                    <td>
                                        <Link to={device.absoluteUrl} target="_blank" rel="noopener noreferrer">
                                            View&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Plant Details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Growing</th>
                                    <td>
                                        <CropUnorderedList cropsArray={plants} />
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">Fish Details</th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Growing</th>
                                    <td>
                                        <CropUnorderedList cropsArray={fish} />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <p><strong>Note: The this information is read-only.</strong></p>

                    </div>
                </div>

                <div className="form-group col-md-12 mb-3 mx-auto text-center">
                    <Link className="btn btn-primary btn-lg btn-fxw mt-4" type="button" to={`/production/${productionDetail.slug}`}>
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>

            </div>
        );
    }
}



class CropUnorderedList extends Component {
    render() {
        const { cropsArray } = this.props;
        if (isEmpty(cropsArray) === false) {
            let elements = [];
            for (let i = 0; i < cropsArray.length; i++) {
                let key = shortid.generate();
                let cropObj = cropsArray[i];

                // Check to see if this crop has a variety.
                let hasVariety = false;
                hasVariety = cropObj.variety !== undefined || cropObj.variety !== null || cropObj.variety !== "";

                // Generate our JSX element.
                elements.push(
                    <div key={key}>
                        {cropObj.prettyName &&
                            <li>
                                {hasVariety
                                    ? <div>{cropObj.prettyName}&nbsp;({cropObj.variety})&nbsp;x&nbsp;{cropObj.quantity}</div>
                                    : <div>{cropObj.prettyName}&nbsp;x&nbsp;{cropObj.quantity}</div>
                                }
                            </li>
                        }

                    </div>
                );
            }
            return (
                <ul>
                    {elements}
                </ul>
            );
        }
        return <p>-</p>;
    }
}


export default ProductionProfileComponent;
