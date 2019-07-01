import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SubscriptionCheckoutReviewComponent from "../../../components/account/subscription/subscriptionCheckoutReviewComponent";
import { pullProfile } from "../../../actions/profileAction";
const STRIPE_PUBLISHABLE = "pk_test_fw1OJnoeXL2Zp8zMTvxD3s5M";
// const PAYMENT_SERVER_URL = "http://127.0.0.1:8080";
const CURRENCY = 'CAD';
// const DESCRIPTION = "this is a test.";

class SubscriptionCheckoutReviewContainer extends Component {
    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;
        this.state = {
            referrer: null,
            slug: slug
        }

        this.onBackClick = this.onBackClick.bind(this);
    }

    componentDidMount() {
        this.props.pullProfile(this.props.user)
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // When the `react` page finishes loading up, take our `user` data
        // and assign it the state data.
        this.setState({
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,

            billingGivenName: this.props.user.billingGivenName,
            billingLastName: this.props.user.billingLastName,
            billingCountry: this.props.user.billingCountry,
            billingRegion: this.props.user.billingRegion,
            billingLocality: this.props.user.billingLocality,
            billingPostalCode: this.props.user.billingPostalCode,
            billingTelephone: this.props.user.billingTelephone,
            billingEmail: this.props.user.billingEmail,
            billingStreetAddress: this.props.user.billingStreetAddress,

            isShippingDifferentThenBilling: this.props.user.isShippingDifferentThenBilling,
            shippingGivenName: this.props.user.shippingGivenName,
            shippingLastName: this.props.user.shippingLastName,
            shippingCountry: this.props.user.shippingCountry,
            shippingRegion: this.props.user.shippingRegion,
            shippingLocality: this.props.user.shippingLocality,
            shippingPostalCode: this.props.user.shippingPostalCode,
            shippingTelephone: this.props.user.shippingTelephone,
            shippingEmail: this.props.user.shippingEmail,
            shippingStreetAddress: this.props.user.shippingStreetAddress,

            errors: {}
        });
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    onBackClick() {
        this.props.history.push("/subscription/checkout");
    }

    render() {
        const {
            errors, isLoading,
            invoiceItems,
            totalBeforeTax,
            tax,
            totalAfterTax,
            shipping,
            credit,
            grandTotal,
            grandTotalInCents,

            billingGivenName, billingLastName,
            billingCountry, billingRegion, billingLocality,
            billingPostalCode, billingStreetAddress,
            billingEmail, billingTelephone,

            isShippingDifferentThenBilling, shippingGivenName,
            shippingLastName, shippingCountry, shippingRegion,
            shippingLocality, shippingStreetAddress,
            shippingPostalCode,shippingEmail, shippingTelephone,
        } = this.state;
        const { user } = this.props;
        return (
            <SubscriptionCheckoutReviewComponent
                invoiceItems={invoiceItems}
                totalBeforeTax={totalBeforeTax}
                tax={tax}
                totalAfterTax={totalAfterTax}
                shipping={shipping}
                credit={credit}
                grandTotal={grandTotal}
                errors={errors}
                onBackClick={this.onBackClick}

                name="Mikaponics Service Subscription"
                description=""
                onToken={(token) => this.onToken(token)}
                amountInCents={grandTotalInCents}
                currency={CURRENCY}
                stripeKey={STRIPE_PUBLISHABLE}

                billingGivenName={billingGivenName}
                billingLastName={billingLastName}
                billingCountry={billingCountry}
                billingRegion={billingRegion}
                billingLocality={billingLocality}
                billingStreetAddress={billingStreetAddress}
                billingPostalCode={billingPostalCode}
                billingEmail={billingEmail}
                billingTelephone={billingTelephone}

                isShippingDifferentThenBilling={isShippingDifferentThenBilling}
                shippingGivenName={shippingGivenName}
                shippingLastName={shippingLastName}
                shippingCountry={shippingCountry}
                shippingRegion={shippingRegion}
                shippingLocality={shippingLocality}
                shippingStreetAddress={shippingStreetAddress}
                shippingPostalCode={shippingPostalCode}
                shippingEmail={shippingEmail}
                shippingTelephone={shippingTelephone}
            />
        );
    }
}


const mapStateToProps = function(store) {
    return {
        user: store.userState,
        productionDetail: store.productionDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (user) => {
            dispatch(
                pullProfile(user)
            )
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionCheckoutReviewContainer);
