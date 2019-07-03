import React, { Component } from 'react';
import { connect } from 'react-redux';

import { pullProductList } from "../../../actions/productListActions";
import DeviceCreateStep2PurchaseComponent from "../../../components/devices/create/deviceCreateStep2PurchaseComponent";
import { localStorageSetObjectOrArrayItem, localStorageGetArrayItem } from "../../../helpers/localStorageUtility";


class DeviceCreateStep2PurchaseContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: localStorageGetArrayItem("add-device-cart")
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

        // Shallow copy of the array to create a NEW ARRAY.
        let a = this.state.cart.slice(); //creates the clone of the state

        // Find the product from the cart if we have previously selected it
        // and then delete that selected product from the cart. Do not forget
        // to keep the pointer to that selected product!
        let foundProduct = null;
        for (let i = 0; i < a.length; i++) {
            let cartItem = a[i];
            if (cartItem.slug === product.slug) {
                foundProduct = cartItem;
                //
                // Special thanks: https://flaviocopes.com/how-to-remove-item-from-array/
                //
                const filteredItems = a.slice(
                    0, i
                ).concat(
                    a.slice(
                        i + 1, a.length
                    )
                )
                a = filteredItems; // UPDATE OUR NEW ARRAY.
                break;
            }
        }

        // CASE 1 OF 2:
        // If we never found the selected product in the cart then we get
        // to insert it here.
        if (foundProduct === null) {
            a.push({
                'slug': product.slug,
                'price': product.price,
                'name': product.name,
                'quantity': 1,
                'totalPrice': product.price,
            });

        // CASE 2 OF 2:
        // The selected product already existed previously so we will need to
        // insert it back again with the `quantity` value incremented by one.
        } else {
            const newQuantity = foundProduct.quantity + 1
            a.push({
                'slug': foundProduct.slug,
                'price': product.price,
                'name': foundProduct.name,
                'quantity': newQuantity,
                'totalPrice': product.price * newQuantity,
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
                localStorageSetObjectOrArrayItem("add-device-cart", a); // Save to persistent storage.
            }
        );
    }

    minusFromCart(e, product) {
        e.preventDefault();
        console.log("SELECTED", product); // For debugging purposes only.

        // Shallow copy of the array to create a NEW ARRAY.
        let a = this.state.cart.slice(); //creates the clone of the state

        // Find the product from the cart if we have previously selected it
        // and then delete that selected product from the cart. Do not forget
        // to keep the pointer to that selected product!
        let foundProduct = null;
        for (let i = 0; i < a.length; i++) {
            let cartItem = a[i];
            if (cartItem.slug === product.slug) {
                foundProduct = cartItem;
                //
                // Special thanks: https://flaviocopes.com/how-to-remove-item-from-array/
                //
                const filteredItems = a.slice(
                    0, i
                ).concat(
                    a.slice(
                        i + 1, a.length
                    )
                )
                a = filteredItems; // UPDATE OUR NEW ARRAY.
                break;
            }
        }

        // We need to decrement the quantity.
        const newQuantity = foundProduct.quantity - 1;

        // If we have still more products then we add the product back into the
        // cart.
        if (newQuantity > 0) {
            a.push({
                'slug': foundProduct.slug,
                'price': product.price,
                'name': foundProduct.name,
                'quantity': newQuantity,
                'totalPrice': product.price * newQuantity,
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
                localStorageSetObjectOrArrayItem("add-device-cart", a); // Save to persistent storage.
            }
        );
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
