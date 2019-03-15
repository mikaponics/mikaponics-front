/**
 *  The constant used for hydrating/re-hydrating the redux state.
 */
export const APP_STATE = 'APP_STATE';

/**
 *  The API web-services endpoints.
 */
export const MIKAPONICS_LOGIN_API_URL = 'http://127.0.0.1:8000/api/login';
export const MIKAPONICS_REGISTER_API_URL = 'http://127.0.0.1:8000/api/register';

/**
 *  The available choices for the ``subscription_status`` field in the user API.
 */
export const NOT_INTERESTED_SUBSCRIPTION_STATUS = 'not_interested';
export const TRAILING_SUBSCRIPTION_STATUS = 'tracking';
export const ACTIVE_SUBSCRIPTION_STATUS = 'active';
export const PAST_DUE_SUBSCRIPTION_STATUS = 'past_due';
export const CANCELED_SUBSCRIPTION_STATUS = 'canceled';
export const UNPAID_SUBSCRIPTION_STATUS = 'unpaid';

/**
 *  The available choices for the ``report_email_frequency`` field in
 *  the user API.
 */
export const NEVER_REPORT_EMAIL_FREQUENCY = 1
export const WEEKLY_REPORT_EMAIL_FREQUENCY = 2
export const MONTHLY_REPORT_EMAIL_FREQUENCY = 3
