import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeviceCreateStep2PurchaseComponent from "../../../components/devices/create/deviceCreateStep2PurchaseComponent";


class DeviceCreateStep2PurchaseContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    } // end FUNC.

    addToCart(e, id, quantity) {
        alert(id, quantity);
    }

    removeFromCart(e, id, quantity) {
        alert(id, quantity);
    }

    render() {
        return (
            <DeviceCreateStep2PurchaseComponent
                user={this.props.user}
                cart={this.state.cart}
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCreateStep2PurchaseContainer);
