import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";

import IndexContainer from './indexContainer';
import LoginContainer from "./loginContainer";
import RegisterContainer from "./registerContainer";
import DashboardContainer from "./dashboardContainer";
import OnboardLaunchpadContainer from "./onboarding/onboardLaunchpadContainer";

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
                        <Route path="/onboard" exact component={OnboardLaunchpadContainer} />
                    </Switch>
                </div>
           </Router>
       </div>
    );
  }
}

export default withRouter(AppContainer);
