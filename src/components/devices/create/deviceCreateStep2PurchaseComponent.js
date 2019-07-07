import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";


export default class DeviceCreateStep2PurchaseComponent extends Component {
    render() {
        const { productList, user, cart, addToCart, minusFromCart, errors, onNextClick } = this.props;

        let totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            let cartItem = cart[i];
            totalPrice = cartItem.totalPrice;
        }
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

                <BootstrapErrorsProcessingAlert errors={errors} />

                <div className="row">
                    <div className="col-sm-12">

                        <h2><i className="fas fa-hand-pointer"></i>&nbsp;Pick Device(s)</h2>

                        {productList && productList.results &&
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
                            {cart &&
                                <Table cart={cart} totalPrice={totalPrice} user={user} minusFromCart={minusFromCart} />
                            }
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">

                        <div className="form-group">
                            <Link to="/devices/create/step-1" className="btn btn-lg float-left pl-4 pr-4 btn-secondary">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                            <button className="btn btn-lg float-right pl-4 pr-4 btn-primary" onClick={onNextClick}>
                                Proceed to Billing / Shipping&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>
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

class Table extends Component {
    render() {
        const { cart, user, minusFromCart, totalPrice } = this.props;
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Device</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {cart.map(
                        (product, i) => <TableRow product={product} user={user} key={i} minusFromCart={minusFromCart} />)
                    }
                    <tr>
                        <td><strong>TOTAL</strong></td>
                        <td></td>
                        <td></td>
                        <td><strong>${totalPrice}</strong></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}


class TableRow extends Component {
    render() {
        const { minusFromCart, product } = this.props;
        const { name, quantity, unitPrice, totalPrice, slug } = this.props.product;
        return (
            <tr key={slug}>
                <td>{name}</td>
                <td>${unitPrice}</td>
                <td>{quantity}</td>
                <td>${totalPrice}</td>
                <td>
                    <button className="btn btn-danger btn-sm" onClick={ (event)=> minusFromCart(event, product) }>
                        <i className="fas fa-minus"></i>&nbsp;Remove
                    </button>
                </td>
            </tr>
        );
    }
}
