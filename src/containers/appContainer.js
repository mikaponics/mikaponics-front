import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";

import IndexContainer from './indexContainer';
import LoginContainer from "./loginContainer";
import RegisterContainer from "./registerContainer";
import DashboardContainer from "./dashboardContainer";
import OnboardWelcomeContainer from "./onboarding/onboardWelcomeContainer";
import OnboardPurchaseContainer from "./onboarding/onboardPurchaseContainer";
import OnboardCheckoutContainer from "./onboarding/onboardCheckoutContainer";
import OnboardSuccessContainer from "./onboarding/onboardSuccessContainer";
import DeviceContainer from "./devices/deviceContainer";
import DeviceProfileContainer from "./devices/deviceProfileContainer";
import InstrumentContainer from "./instruments/instrumentContainer";
import InstrumentAlertContainer from "./instruments/instrumentAlertContainer";
import InstrumentAlertConfigContainer from "./instruments/instrumentAlertConfigContainer";
import InstrumentDataContainer from "./instruments/instrumentDataContainer";
import InstrumentDataDownloadContainer from "./instruments/instrumentDataDownloadContainer";
import InstrumentReportContainer from "./instruments/instrumentReportContainer";
import AlertListContainer from "./alerts/alertListContainer";
import InvoiceListContainer from "./invoices/invoiceListContainer";
import ProfileContainer from "./profile/profileContainer";


import NavigationBar from '../components/navigationBar.js';
class AppContainer extends React.Component {
  render() {
    return (
        <div className="container">
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>
                        <Route path="/" exact component={IndexContainer} />
                        <Route path="/login" exact component={LoginContainer} />
                        <Route path="/register" exact component={RegisterContainer} />
                        <Route path="/dashboard" exact component={DashboardContainer} />
                        <Route path="/onboard" exact component={OnboardWelcomeContainer} />
                        <Route path="/onboard/purchase" exact component={OnboardPurchaseContainer} />
                        <Route path="/onboard/checkout" exact component={OnboardCheckoutContainer} />
                        <Route path="/onboard/success" exact component={OnboardSuccessContainer} />
                        <Route path="/device/:slug" exact component={DeviceContainer} />
                        <Route path="/device/:slug/profile" exact component={DeviceProfileContainer} />
                        <Route path="/instrument/:slug" exact component={InstrumentContainer} />
                        <Route path="/instrument/:slug/alerts" exact component={InstrumentAlertContainer} />
                        <Route path="/instrument/:slug/alerts/config" exact component={InstrumentAlertConfigContainer} />
                        <Route path="/instrument/:slug/data" exact component={InstrumentDataContainer} />
                        <Route path="/instrument/:slug/data/download" exact component={InstrumentDataDownloadContainer} />
                        <Route path="/instrument/:slug/report" exact component={InstrumentReportContainer} />
                        <Route path="/alerts" exact component={AlertListContainer} />
                        <Route path="/invoices" exact component={InvoiceListContainer} />
                        <Route path="/profile" exact component={ProfileContainer} />
                    </Switch>
                </div>
           </Router>
       </div>
    );
  }
}

export default withRouter(AppContainer);
