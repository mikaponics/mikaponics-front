import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class DeviceCreateStep2PurchaseComponent extends Component {
    render() {
        const { productList, user, cart, addToCart, minusFromCart } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/devices"><i className="fas fa-cubes"></i>&nbsp;Devices</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-plus"></i>&nbsp;Add (Purchase)</li>
                    </ol>
                </nav>
                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Device
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <span className="num">1.</span><span className="">Cart</span>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Billing / Shipping</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Checkout</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">

                        <h2><i className="fas fa-hand-pointer"></i>&nbsp;Pick Device(s)</h2>

                        {productList &&
                            <div className="card-group row">
                                {productList.results.map(
                                    (product, i) => <DeviceItem product={product} user={user} key={i} addToCart={addToCart} minusFromCart={minusFromCart} />)
                                }
                            </div>
                        }

                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <h2><i className="fas fa-shopping-cart"></i>&nbsp;Shopping Cart</h2>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Device</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Soil</td>
                                        <td>$200</td>
                                        <td>1</td>
                                        <td>$200</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm">
                                                <i className="fas fa-minus"></i>&nbsp;Remove
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>TOTAL</strong></td>
                                        <td></td>
                                        <td></td>
                                        <td><strong>$200</strong></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">

                        <div className="form-group">
                            <Link to="/devices/create/step-1" className="btn btn-lg float-left pl-4 pr-4 btn-secondary">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                            <Link to="/devices/create/step-3-purchase" className="btn btn-lg float-right pl-4 pr-4 btn-primary">
                                Proceed to Billing / Shipping&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}


class DeviceItem extends Component {
    render() {
        const { product, addToCart } = this.props;
        const isComingSoon = product.state === 2;
        const isPublished = product.state === 3;
        return (
            <div className="col-sm-3" key={product.slug}>
                <div className="card box-shadow text-center mx-auto">
                    <div className="card-custom-top-2">
                        <i className={`fas fa-${product.icon} fa-3x`}></i>
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{product.name}</h3>
                        <p className="card-text">{product.shortDescription}</p>
                        {isComingSoon &&
                            <button className="btn btn-success btn-lg" disabled={true}>
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </button>
                        }
                        {isPublished &&
                            <button className="btn btn-success btn-lg" onClick={ (event) => addToCart(event, product) }>
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
