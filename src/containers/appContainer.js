import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

import requiresAuth from '../helpers/requiresAuth';
import NavigationContainer from './navigation/navigationContainer';
import NotFound404Container from './navigation/notFound404Container';
import ServiceNoticeContainer from './navigation/serviceNoticeContainer';
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
import ReferralContainer from "./account/referralContainer";
import DashboardContainer from "./dashboard/dashboardContainer";
import OnboardWelcomeContainer from "./onboarding/onboardWelcomeContainer";
import OnboardPurchaseContainer from "./onboarding/onboardPurchaseContainer";
import OnboardCheckoutContainer from "./onboarding/onboardCheckoutContainer";
import OnboardSubmissionContainer from "./onboarding/onboardSubmissionContainer";
import OnboardSuccessContainer from "./onboarding/onboardSuccessContainer";
import OnboardInvoiceContainer from "./onboarding/onboardInvoiceContainer";
import OnboardInvoiceSendContainer from "./onboarding/onboardInvoiceSendContainer";
import DeviceCreateStep1Container from "./devices/create/deviceCreateStep1Container";
import DeviceCreateStep2PurchaseContainer from "./devices/create/deviceCreateStep2PurchaseContainer";
import DeviceCreateStep3PurchaseContainer from "./devices/create/deviceCreateStep3PurchaseContainer";
import DeviceCreateStep4PurchaseContainer from "./devices/create/deviceCreateStep4PurchaseContainer";
import DeviceCreateStep4PurchaseSubmissionContainer from "./devices/create/deviceCreateStep4PurchaseSubmissionContainer";
import DeviceCreateStep5PurchaseSuccessContainer from "./devices/create/deviceCreateStep5PurchaseSuccessContainer";
import DeviceListContainer from "./devices/deviceListContainer";
import DeviceDetailContainer from "./devices/deviceDetailContainer";
import DeviceProfileContainer from "./devices/deviceProfileContainer";
import InstrumentDetailContainer from "./instruments/instrumentDetailContainer";
import InstrumentAlertItemListContainer from "./instruments/alert/alertItemListContainer";
import InstrumentAlertItemDetailContainer from "./instruments/alert/alertItemDetailContainer";
import InstrumentAlertItemConfigContainer from "./instruments/configuration/alertItemConfigContainer";
import InstrumentDataContainer from "./instruments/data/instrumentDataContainer";
import InstrumentDataDownloadContainer from "./instruments/data/instrumentDataDownloadContainer";
import InstrumentAnalysisListContainer from "./instruments/analyses/instrumentAnalysisListContainer";
import InstrumentAnalysisCreateContainer from  "./instruments/analyses/instrumentAnalysisCreateContainer";
import InstrumentAnalysisDetailContainer from "./instruments/analyses/instrumentAnalysisDetailContainer";
import AlertListContainer from "./alerts/alertListContainer";
import AlertItemDetailContainer from "./alerts/alertItemDetailContainer";
import InvoiceListContainer from "./invoices/invoiceListContainer";
import InvoiceDetailContainer from "./invoices/invoiceDetailContainer";
import InvoiceSendContainer from "./invoices/invoiceSendContainer";
import ProfileContainer from "./account/profile/profileContainer";
import ProfileEditContainer from "./account/profile/profileEditContainer";
import PurchaseDeviceContainer from "./purchase/purchaseDeviceContainer";
import CheckoutDeviceContainer from "./purchase/checkoutDeviceContainer";
import PurchaseDeviceSubmissionContainer from "./purchase/purchaseDeviceSubmissionContainer";
import PurchaseDeviceSuccessContainer from  "./purchase/purchaseDeviceSuccessContainer";
import ProductionListContainer from  "./production/productionListContainer";
import ProductionDetailContainer from  "./production/productionDetailContainer";
import ProductionStep1CreateContainer from  "./production/create/productionStep1CreateContainer";
import ProductionStep2CreateContainer from  "./production/create/productionStep2CreateContainer";
import ProductionStep3CreateContainer from  "./production/create/productionStep3CreateContainer";
import ProductionStep4CreateContainer from  "./production/create/productionStep4CreateContainer";
import ProductionStep5CreateContainer from  "./production/create/productionStep5CreateContainer";
import ProductionTerminateStartContainer from "./production/terminate/productionTerminateStartContainer";
import ProductionTerminateCropContainer from "./production/terminate/productionTerminateCropContainer";
import ProductionTerminateFinishContainer from "./production/terminate/productionTerminateFinishContainer";
import ProductionInspectionListContainer from "./production/inspection/productionInspectionListContainer";
import ProductionInspectionCreateStartContainer from "./production/inspection/productionInspectionCreateStartContainer";
import ProductionInspectionCreateCropContainer from "./production/inspection/productionInspectionCreateCropContainer";
import ProductionInspectionCreateFinishContainer from "./production/inspection/productionInspectionCreateFinishContainer";
import ProductionInspectionDetailContainer from "./production/inspection/productionInspectionDetailContainer";
import ProductionProfileContainer from "./production/profile/productionProfileContainer";
import TaskListContainer from "./tasks/taskListContainer";
import TaskItemDetailContainer from "./tasks/taskItemDetailContainer";
import TaskItemStartContainer from "./tasks/taskItemStartContainer";
import TaskProductionInspectionCreateStartContainer from "./tasks/inspection/taskProductionInspectionCreateStartContainer";
import TaskProductionInspectionCreateCropContainer from "./tasks/inspection/taskProductionInspectionCreateCropContainer";
import TaskProductionInspectionCreateFinishContainer from "./tasks/inspection/taskProductionInspectionCreateFinishContainer";
import SubscriptionDetailContainer from "./account/subscription/subscriptionDetailContainer";
import SubscriptionCheckoutContainer from "./account/subscription/subscriptionCheckoutContainer";
import SubscriptionCheckoutReviewContainer from "./account/subscription/subscriptionCheckoutReviewContainer";
import SubscriptionCheckoutSubmissionContainer from "./account/subscription/subscriptionCheckoutSubmissionContainer";
import SubscriptionCheckoutSuccessContainer from "./account/subscription/subscriptionCheckoutSuccessContainer";
import SubscriptionCheckoutCancellationContainer from "./account/subscription/subscriptionCheckoutCancellationContainer";


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
                        <ServiceNoticeContainer />
                        <ScrollUpButton />
                        <Switch>
                            <Route path="/" exact component={IndexContainer} />
                            <Route path="/login" exact component={LoginContainer} />
                            <Route path="/logout" exact component={LogoutContainer} />
                            <Route path="/register" exact component={RegisterContainer} />
                            <Route path="/register/:referral" exact component={RegisterContainer} />
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
                            <Route path="/onboard/submission" exact component={requiresAuth(OnboardSubmissionContainer)} />
                            <Route path="/onboard/success" exact component={requiresAuth(OnboardSuccessContainer)} />
                            <Route path="/onboard/receipt" exact component={requiresAuth(OnboardInvoiceContainer)} />
                            <Route path="/onboard/receipt/send" exact component={requiresAuth(OnboardInvoiceSendContainer)} />
                            <Route path="/devices" exact component={requiresAuth(DeviceListContainer)} />
                            <Route path="/device/:slug" exact component={requiresAuth(DeviceDetailContainer)} />
                            <Route path="/device/:slug/profile" exact component={requiresAuth(DeviceProfileContainer)} />
                            <Route path="/devices/create/step-1" exact component={requiresAuth(DeviceCreateStep1Container)} />
                            <Route path="/devices/create/step-2-purchase" exact component={requiresAuth(DeviceCreateStep2PurchaseContainer)} />
                            <Route path="/devices/create/step-3-purchase" exact component={requiresAuth(DeviceCreateStep3PurchaseContainer)} />
                            <Route path="/devices/create/step-4-purchase" exact component={requiresAuth(DeviceCreateStep4PurchaseContainer)} />
                            <Route path="/devices/create/step-4-purchase-submission" exact component={requiresAuth(DeviceCreateStep4PurchaseSubmissionContainer)} />
                            <Route path="/devices/create/step-5-purchase-success" exact component={requiresAuth(DeviceCreateStep5PurchaseSuccessContainer)} />
                            <Route path="/instrument/:slug" exact component={requiresAuth(InstrumentDetailContainer)} />
                            <Route path="/instrument/:slug/alerts" exact component={requiresAuth(InstrumentAlertItemListContainer)} />
                            <Route path="/instrument-alert/:slug" exact component={requiresAuth(InstrumentAlertItemDetailContainer)} />
                            <Route path="/instrument/:slug/alerts/config" exact component={requiresAuth(InstrumentAlertItemConfigContainer)} />
                            <Route path="/instrument/:slug/data" exact component={requiresAuth(InstrumentDataContainer)} />
                            <Route path="/instrument/:slug/data/download" exact component={requiresAuth(InstrumentDataDownloadContainer)} />
                            <Route path="/instrument/:slug/analyses" exact component={requiresAuth(InstrumentAnalysisListContainer)} />
                            <Route path="/instrument/:slug/create-analysis" exact component={requiresAuth(InstrumentAnalysisCreateContainer)} />
                            <Route path="/instrument/analysis/:slug" exact component={requiresAuth(InstrumentAnalysisDetailContainer)} />
                            <Route path="/alerts" exact component={requiresAuth(AlertListContainer)} />
                            <Route path="/alert/:slug" exact component={requiresAuth(AlertItemDetailContainer)} />
                            <Route path="/invoices" exact component={requiresAuth(InvoiceListContainer)} />
                            <Route path="/invoice/:slug" exact component={requiresAuth(InvoiceDetailContainer)} />
                            <Route path="/invoice-send-email/:slug" exact component={requiresAuth(InvoiceSendContainer)} />
                            <Route path="/profile" exact component={requiresAuth(ProfileContainer)} />
                            <Route path="/profile/edit" exact component={requiresAuth(ProfileEditContainer)} />
                            <Route path="/referrals" exact component={requiresAuth(ReferralContainer)} />
                            <Route path="/privacy" exact component={PrivacyContainer} />
                            <Route path="/terms" exact component={TermsContainer} />
                            <Route path="/purchase" exact component={requiresAuth(PurchaseDeviceContainer)} />
                            <Route path="/purchase/checkout" exact component={requiresAuth(CheckoutDeviceContainer)} />
                            <Route path="/purchase/submission" exact component={requiresAuth(PurchaseDeviceSubmissionContainer)} />
                            <Route path="/purchase/success" exact component={requiresAuth(PurchaseDeviceSuccessContainer)} />
                            <Route path="/productions" exact component={requiresAuth(ProductionListContainer)} />
                            <Route path="/production/:slug" exact component={requiresAuth(ProductionDetailContainer)} />
                            <Route path="/add-production-step-1" exact component={requiresAuth(ProductionStep1CreateContainer)} />
                            <Route path="/add-production-step-2" exact component={requiresAuth(ProductionStep2CreateContainer)} />
                            <Route path="/add-production-step-3" exact component={requiresAuth(ProductionStep3CreateContainer)} />
                            <Route path="/add-production-step-4" exact component={requiresAuth(ProductionStep4CreateContainer)} />
                            <Route path="/add-production-step-5" exact component={requiresAuth(ProductionStep5CreateContainer)} />
                            <Route path="/production/:slug/terminate-start" exact component={requiresAuth(ProductionTerminateStartContainer)} />
                            <Route path="/production/:slug/terminate-crop/:index" exact component={requiresAuth(ProductionTerminateCropContainer)} />
                            <Route path="/production/:slug/terminate-finish" exact component={requiresAuth(ProductionTerminateFinishContainer)} />
                            <Route path="/production/:slug/inspection" exact component={requiresAuth(ProductionInspectionListContainer)} />
                            <Route path="/production/:slug/create-inspection/start" exact component={requiresAuth(ProductionInspectionCreateStartContainer)} />
                            <Route path="/production/:slug/create-inspection/crop/:index" exact component={requiresAuth(ProductionInspectionCreateCropContainer)} />
                            <Route path="/production/:slug/create-inspection/finish" exact component={requiresAuth(ProductionInspectionCreateFinishContainer)} />
                            <Route path="/production-inspection/:slug" exact component={requiresAuth(ProductionInspectionDetailContainer)} />
                            <Route path="/production/:slug/profile" exact component={requiresAuth(ProductionProfileContainer)} />
                            <Route path="/tasks" exact component={requiresAuth(TaskListContainer)} />
                            <Route path="/task/:slug" exact component={requiresAuth(TaskItemDetailContainer)} />
                            <Route path="/task-start/:slug" exact component={requiresAuth(TaskItemStartContainer)} />
                            <Route path="/task/production-inspection/:slug" exact component={requiresAuth(TaskProductionInspectionCreateStartContainer)} />
                            <Route path="/task/production-inspection/:slug/crop/:index" exact component={requiresAuth(TaskProductionInspectionCreateCropContainer)} />
                            <Route path="/task/production-inspection/:slug/finish" exact component={requiresAuth(TaskProductionInspectionCreateFinishContainer)} />
                            <Route path="/subscription" exact component={requiresAuth(SubscriptionDetailContainer)} />
                            <Route path="/subscription/checkout" exact component={requiresAuth(SubscriptionCheckoutContainer)} />
                            <Route path="/subscription/checkout/review" exact component={requiresAuth(SubscriptionCheckoutReviewContainer)} />
                            <Route path="/subscription/checkout/submission" exact component={requiresAuth(SubscriptionCheckoutSubmissionContainer)} />
                            <Route path="/subscription/checkout/success" exact component={requiresAuth(SubscriptionCheckoutSuccessContainer)} />
                            <Route path="/subscription/cancellation" exact component={requiresAuth(SubscriptionCheckoutCancellationContainer)} />
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
