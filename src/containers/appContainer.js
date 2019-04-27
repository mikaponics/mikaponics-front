import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";

import requiresAuth from '../helpers/requiresAuth';
import NavigationContainer from './navigation/navigationContainer';
import NotFound404Container from './navigation/notFound404Container';
import PrivacyContainer from './general/privacyContainer';
import TermsContainer from './general/termsContainer';
import IndexContainer from './general/indexContainer';
import LoginContainer from "./account/loginContainer";
import LogoutContainer from "./account/logoutContainer";
import RegisterContainer from "./account/registerContainer";
import RegisterSuccessContainer from "./account/registerSuccessContainer";
import ActivateContainer from "./account/activateContainer";
import SendResetPasswordContainer from "./account/sendResetPasswordContainer";
import SendResetPasswordSuccessContainer from "./account/sendResetPasswordSuccessContainer";
import ResetPasswordContainer from "./account/resetPasswordContainer";
import ResetPasswordSuccessContainer from "./account/resetPasswordSuccessContainer";
import DashboardContainer from "./dashboard/dashboardContainer";
import OnboardWelcomeContainer from "./onboarding/onboardWelcomeContainer";
import OnboardPurchaseContainer from "./onboarding/onboardPurchaseContainer";
import OnboardCheckoutContainer from "./onboarding/onboardCheckoutContainer";
import OnboardSuccessContainer from "./onboarding/onboardSuccessContainer";
import DeviceListContainer from "./devices/deviceListContainer";
import DeviceContainer from "./devices/deviceContainer";
import DeviceProfileContainer from "./devices/deviceProfileContainer";
import InstrumentContainer from "./instruments/instrumentContainer";
import InstrumentAlertContainer from "./instruments/instrumentAlertContainer";
import InstrumentAlertDetailContainer from "./instruments/instrumentAlertDetailContainer";
import InstrumentAlertConfigContainer from "./instruments/instrumentAlertConfigContainer";
import InstrumentDataContainer from "./instruments/instrumentDataContainer";
import InstrumentDataDownloadContainer from "./instruments/instrumentDataDownloadContainer";
import InstrumentAnalysisListContainer from "./instruments/instrumentAnalysisListContainer";
import InstrumentAnalysisCreateContainer from  "./instruments/instrumentAnalysisCreateContainer";
import InstrumentAnalysisDetailContainer from "./instruments/instrumentAnalysisDetailContainer";
import AlertListContainer from "./alerts/alertListContainer";
import InvoiceListContainer from "./invoices/invoiceListContainer";
import InvoiceDetailContainer from "./invoices/invoiceDetailContainer";
import ProfileContainer from "./profile/profileContainer";
import ProfileEditContainer from "./profile/profileEditContainer";
import PurchaseDeviceContainer from "./purchase/purchaseDeviceContainer";
import CheckoutDeviceContainer from "./purchase/checkoutDeviceContainer";
import CheckoutDeviceReceiptContainer from "./purchase/checkoutDeviceReceiptContainer";



class AppContainer extends React.Component {
  render() {
    return (
        <Router>
            <div className="container-fluid" id="outer-container">

                <NavigationContainer
                    history={this.props.history}
                    location={this.props.location}
                    match={this.props.match}
                    staticContext={this.props.staticContext}
                />

                <div className="d-flex align-items-stretch">
                    <main id="main" role="main">
                        <Switch>
                            <Route path="/" exact component={IndexContainer} />
                            <Route path="/login" exact component={LoginContainer} />
                            <Route path="/logout" exact component={LogoutContainer} />
                            <Route path="/register" exact component={RegisterContainer} />
                            <Route path="/register-success" exact component={RegisterSuccessContainer} />
                            <Route path="/activate/:code" exact component={ActivateContainer} />
                            <Route path="/send-password-reset" exact component={SendResetPasswordContainer} />
                            <Route path="/send-password-reset-success" exact component={SendResetPasswordSuccessContainer} />
                            <Route path="/reset-password/:code" exact component={ResetPasswordContainer} />
                            <Route path="/reset-password-success" exact component={ResetPasswordSuccessContainer} />
                            <Route path="/dashboard" exact component={requiresAuth(DashboardContainer)} />
                            <Route path="/onboard" exact component={requiresAuth(OnboardWelcomeContainer)} />
                            <Route path="/onboard/purchase" exact component={requiresAuth(OnboardPurchaseContainer)} />
                            <Route path="/onboard/checkout" exact component={requiresAuth(OnboardCheckoutContainer)} />
                            <Route path="/onboard/success" exact component={requiresAuth(OnboardSuccessContainer)} />
                            <Route path="/devices" exact component={requiresAuth(DeviceListContainer)} />
                            <Route path="/device/:slug" exact component={requiresAuth(DeviceContainer)} />
                            <Route path="/device/:slug/profile" exact component={requiresAuth(DeviceProfileContainer)} />
                            <Route path="/instrument/:slug" exact component={requiresAuth(InstrumentContainer)} />
                            <Route path="/instrument/:slug/alerts" exact component={requiresAuth(InstrumentAlertContainer)} />
                            <Route path="/instrument-alert/:slug" exact component={requiresAuth(InstrumentAlertDetailContainer)} />
                            <Route path="/instrument/:slug/alerts/config" exact component={requiresAuth(InstrumentAlertConfigContainer)} />
                            <Route path="/instrument/:slug/data" exact component={requiresAuth(InstrumentDataContainer)} />
                            <Route path="/instrument/:slug/data/download" exact component={requiresAuth(InstrumentDataDownloadContainer)} />
                            <Route path="/instrument/:slug/analyses" exact component={requiresAuth(InstrumentAnalysisListContainer)} />
                            <Route path="/instrument/:slug/create-analysis" exact component={requiresAuth(InstrumentAnalysisCreateContainer)} />
                            <Route path="/instrument/analysis/:slug" exact component={requiresAuth(InstrumentAnalysisDetailContainer)} />
                            <Route path="/alerts" exact component={requiresAuth(AlertListContainer)} />
                            <Route path="/invoices" exact component={requiresAuth(InvoiceListContainer)} />
                            <Route path="/invoice/:slug" exact component={requiresAuth(InvoiceDetailContainer)} />
                            <Route path="/profile" exact component={requiresAuth(ProfileContainer)} />
                            <Route path="/profile/edit" exact component={requiresAuth(ProfileEditContainer)} />
                            <Route path="/privacy" exact component={PrivacyContainer} />
                            <Route path="/terms" exact component={TermsContainer} />
                            <Route path="/purchase" exact component={PurchaseDeviceContainer} />
                            <Route path="/purchase/checkout" exact component={CheckoutDeviceContainer} />
                            <Route path="/purchase/receipt" exact component={CheckoutDeviceReceiptContainer} />
                            <Route component={NotFound404Container} />
                        </Switch>
                    </main>
                </div>
            </div>
        </Router>
    );
  }
}

export default withRouter(AppContainer);
