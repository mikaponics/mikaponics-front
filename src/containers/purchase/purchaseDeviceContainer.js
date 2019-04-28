import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import PurchaseDeviceComponent from "../../components/purchase/purchaseDeviceComponent";
import { pullPurchaseDevice, postPurchaseDevice } from "../../actions/purchaseDeviceActions";


class PurchaseDeviceContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 0,
            billingGivenName: this.props.user.billingGivenName,
            errors: {},
            isLoading: false
        }

        // Attach the custom functions we will be using.
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }

    componentDidMount() {
        this.props.pullPurchaseDevice(this.props.user)
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    onNextClick(e) {
        e.preventDefault();
        this.setState({
            referrer: '/purchase/checkout'
        });
    }

    onCancelClick(e) {
        e.preventDefault();
        this.setState({
            referrer: '/dashboard'
        });
    }

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onSelectChange(option) {
        this.setState({
            [option.selectName]: option.value
        })
    }

    render() {
        const {
            quantity, errors, isLoading, referrer
        } = this.state;

        // If a `referrer` was set then that means we can redirect
        // to a different page in our application.
        if (referrer) {
            return <Redirect to={referrer} />;
        }

        // Generate our list of options to choose from for the "quantity".
        const quantityOptions = [];
        for (let i = 1; i <= 20; i++) {
            quantityOptions.push({
                selectName: "quantity",
                value: i,
                label: i
            });
        }

        return (
            <PurchaseDeviceComponent
                errors={errors}
                onSelectChange={this.onSelectChange}
                onTextChange={this.onTextChange}
                onCancelClick={this.onCancelClick}
                onNextClick={this.onNextClick}
                isLoading={isLoading}

                quantity={quantity}
                quantityOptions={quantityOptions}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        purchaseDevice: store.purchaseDeviceState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullPurchaseDevice: (user) => {
            dispatch(pullPurchaseDevice(user))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PurchaseDeviceContainer);
