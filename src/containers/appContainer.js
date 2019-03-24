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
import DeviceContainer from "./deviceContainer";
import DeviceProfileContainer from "./deviceProfileContainer"


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
                    </Switch>
                </div>
           </Router>
       </div>
    );
  }
}

export default withRouter(AppContainer);
