import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";

import IndexContainer from './indexContainer';
import LoginContainer from "./account/loginContainer";
import RegisterContainer from "./account/registerContainer";
import RegisterSuccessContainer from "./account/registerSuccessContainer";
import ActivateContainer from "./account/activateContainer";
import DashboardContainer from "./dashboardContainer";
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


import NavigationBar from '../components/navigationBar.js';
class AppContainer extends React.Component {
  render() {
    return (
        <div className="container">
            <Router>
                <div>
                { /*
                    <NavigationBar />
                */}
                    <Switch>
                        <Route path="/" exact component={IndexContainer} />
                        <Route path="/login" exact component={LoginContainer} />
                        <Route path="/register" exact component={RegisterContainer} />
                        <Route path="/register-success" exact component={RegisterSuccessContainer} />
                        <Route path="/activate/:code" exact component={ActivateContainer} />
                        <Route path="/dashboard" exact component={DashboardContainer} />
                        <Route path="/onboard" exact component={OnboardWelcomeContainer} />
                        <Route path="/onboard/purchase" exact component={OnboardPurchaseContainer} />
                        <Route path="/onboard/checkout" exact component={OnboardCheckoutContainer} />
                        <Route path="/onboard/success" exact component={OnboardSuccessContainer} />
                        <Route path="/devices" exact component={DeviceListContainer} />
                        <Route path="/device/:slug" exact component={DeviceContainer} />
                        <Route path="/device/:slug/profile" exact component={DeviceProfileContainer} />
                        <Route path="/instrument/:slug" exact component={InstrumentContainer} />
                        <Route path="/instrument/:slug/alerts" exact component={InstrumentAlertContainer} />
                        <Route path="/instrument-alert/:slug" exact component={InstrumentAlertDetailContainer} />
                        <Route path="/instrument/:slug/alerts/config" exact component={InstrumentAlertConfigContainer} />
                        <Route path="/instrument/:slug/data" exact component={InstrumentDataContainer} />
                        <Route path="/instrument/:slug/data/download" exact component={InstrumentDataDownloadContainer} />
                        <Route path="/instrument/:slug/analyses" exact component={InstrumentAnalysisListContainer} />
                        <Route path="/instrument/:slug/create-analysis" exact component={InstrumentAnalysisCreateContainer} />
                        <Route path="/instrument/analysis/:slug" exact component={InstrumentAnalysisDetailContainer} />
                        <Route path="/alerts" exact component={AlertListContainer} />
                        <Route path="/invoices" exact component={InvoiceListContainer} />
                        <Route path="/invoice/:slug" exact component={InvoiceDetailContainer} />
                        <Route path="/profile" exact component={ProfileContainer} />
                        <Route path="/profile/edit" exact component={ProfileEditContainer} />
                    </Switch>
                </div>
           </Router>
       </div>
    );
  }
}

export default withRouter(AppContainer);
