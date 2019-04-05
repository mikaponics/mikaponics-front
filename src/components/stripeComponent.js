import React from 'react';

/**
 *  The following code was heavily modified from ``https://stackoverflow.com/a/44013476``.
 */

export default class StripeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stripeLoading: true,
            name: this.props.name,
            description: this.props.description,
            billingEmail: this.props.billingEmail,
            amountInCents: this.props.amountInCents,
            currency: this.props.currency,
            stripeKey: this.props.stripeKey,
            buttonClassName: this.props.buttonClassName,
        };

        // onStripeUpdate must be bound or else clicking on button will produce error.
        this.onStripeUpdate = this.onStripeUpdate.bind(this);
        // binding loadStripe as a best practice, not doing so does not seem to cause error.
        this.loadStripe = this.loadStripe.bind(this);
    }

    loadStripe(onload) {
        if(! window.StripeCheckout) {
            const script = document.createElement('script');
            script.onload = function () {
                console.info("Stripe script loaded");
                onload();
            };
            script.src = 'https://checkout.stripe.com/checkout.js';
            document.head.appendChild(script);
        } else {
            onload();
        }
    }

    componentDidMount() {

        this.loadStripe(() => {
            this.stripeHandler = window.StripeCheckout.configure({
                key: this.props.stripeKey,
                image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                locale: 'auto',
                token: (token) => {
                    this.setState({ loading: true });

                    // DEVELOPERS NOTE: HERE WE ARE USING OUR CALLBACK FUNCTION
                    //                  TO THE PARENT COMPONENT TO RUN OUR API
                    //                  SUBMISSION CODE.
                    this.props.onToken(token);
                }
            });

            this.setState({
                stripeLoading: false,
                // loading needs to be explicitly set false so component will render in 'loaded' state.
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        if(this.stripeHandler) {
            this.stripeHandler.close();
        }
    }

    onStripeUpdate(e) {
        this.stripeHandler.open({
            name: this.props.name,
            description: this.props.description,
            panelLabel: 'Pay Now',
            allowRememberMe: false,
            email: this.props.billingEmail,
            amount: this.props.amountInCents,
            currency: this.props.currency,
        });
        e.preventDefault();
    }

    render() {
        const { stripeLoading, loading, buttonClassName } = this.state;
        return (
            <div>
                {(loading || stripeLoading)
                    ? <p>loading..</p>
                    : <button className={buttonClassName} onClick={this.onStripeUpdate}>Checkout</button>
                }
            </div>
        );
    }
}
