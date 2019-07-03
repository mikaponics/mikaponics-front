import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullProductList } from "../../../actions/productListActions";
import DeviceCreateStep2PurchaseComponent from "../../../components/devices/create/deviceCreateStep2PurchaseComponent";


class DeviceCreateStep2PurchaseContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
        this.addToCart = this.addToCart.bind(this);
        this.minusFromCart = this.minusFromCart.bind(this);
    }

    componentDidMount() {
        this.props.pullProductList(this.props.user);
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    addToCart(e, product) {
        e.preventDefault();
        console.log("SELECTED", product); // For debugging purposes only.

        // Find the product from the cart if we have previously selected it
        // and then delete that selected product from the cart. Do not forget
        // to keep the pointer to that selected product!
        let foundProduct = null;
        for (let i = 0; i < this.state.cart.length; i++) {
            let cartItem = this.state.cart[i];
            if (cartItem.slug === product.slug) {
                foundProduct = cartItem;
                //
                // Special thanks: https://flaviocopes.com/how-to-remove-item-from-array/
                //
                const filteredItems = this.state.cart.slice(
                    0, i
                ).concat(
                    this.state.cart.slice(
                        i + 1, this.state.cart.length
                    )
                )

                // Update our state with our NEW ARRAY which no longer has
                // the item we deleted.
                this.setState(
                    {
                        cart: filteredItems,
                    },
                    () => {
                        console.log("REMOVED FROM CART", this.state.cart);
                    }
                );
                break;
            }
        }

        // Shallow copy of the array to create a NEW ARRAY.
        let a = this.state.cart.slice(); //creates the clone of the state

        // CASE 1 OF 2:
        // If we never found the selected product in the cart then we get
        // to insert it here.
        if (foundProduct === null) {
            a.push({
                'slug': product.slug,
                'price': product.price,
                'name': product.name,
                'quantity': 1,
            });

        // CASE 2 OF 2:
        // The selected product already existed previously so we will need to
        // insert it back again with the `quantity` value incremented by one.
        } else {
            const newQuantity = foundProduct.quantity + 1
            a.push({
                'slug': foundProduct.slug,
                'price': foundProduct.price * newQuantity,
                'name': foundProduct.name,
                'quantity': newQuantity,
            });
        }

        // Finally update the state to have a new copy of our cart which we
        // modified here.
        this.setState(
            {
                cart: a,
            },
            () => {
                console.log("UPDATED CART", this.state.cart);
            }
        );
    }

    minusFromCart(e, product) {
        e.preventDefault();
        alert(product);
    }

    render() {
        return (
            <DeviceCreateStep2PurchaseComponent
                productList={this.props.productList}
                user={this.props.user}
                cart={this.state.cart}
                addToCart={this.addToCart}
                minusFromCart={this.minusFromCart}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productList: store.productListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProductList: (user) => {
            dispatch(
                pullProductList(user)
            )
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep2PurchaseContainer);
