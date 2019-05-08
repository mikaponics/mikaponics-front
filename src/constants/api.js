/**
 *  The constant used for hydrating/re-hydrating the redux state.
 */
export const APP_STATE = 'APP_STATE';

/**
 *  The API web-services endpoints.
 */
export const MIKAPONICS_LOGIN_API_URL = process.env.REACT_APP_API_HOST+'/api/login';
export const MIKAPONICS_LOGOUT_API_URL = process.env.REACT_APP_API_HOST+'/api/logout';
export const MIKAPONICS_REGISTER_API_URL = process.env.REACT_APP_API_HOST+'/api/register';
export const MIKAPONICS_ACTIVATE_API_URL = process.env.REACT_APP_API_HOST+'/api/activate';
export const MIKAPONICS_SEND_PASSWORD_RESET_API_URL = process.env.REACT_APP_API_HOST+'/api/send-password-reset';
export const MIKAPONICS_PASSWORD_RESET_API_URL = process.env.REACT_APP_API_HOST+'/api/reset-password';
export const MIKAPONICS_ONBOARDING_API_URL = process.env.REACT_APP_API_HOST+'/api/onboarding';
export const MIKAPONICS_PURCHASE_DEVICE_API_URL = process.env.REACT_APP_API_HOST+'/api/purchase-device';
export const MIKAPONICS_GET_PROFILE_API_URL = process.env.REACT_APP_API_HOST+'/api/profile';
export const MIKAPONICS_DASHBOARD_API_URL = process.env.REACT_APP_API_HOST+'/api/dashboard';
export const MIKAPONICS_DEVICE_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/devices';
export const MIKAPONICS_GET_DEVICE_API_URL = process.env.REACT_APP_API_HOST+'/api/device';
export const MIKAPONICS_GET_INSTRUMENT_API_URL = process.env.REACT_APP_API_HOST+'/api/instrument';
export const MIKAPONICS_GET_TIME_SERIES_DATA_API_URL = process.env.REACT_APP_API_HOST+'/api/data';
export const MIKAPONICS_GET_TIME_SERIES_DATA_CSV_DOWNLOAD_API_URL = process.env.REACT_APP_API_HOST+'/api/data/csv';
export const MIKAPONICS_INSTRUMENT_ALERT_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/instrument-alerts';
export const MIKAPONICS_INSTRUMENT_ALERT_DETAIL_API_URL = process.env.REACT_APP_API_HOST+'/api/instrument-alert/';
export const MIKAPONICS_INVOICE_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/invoices';
export const MIKAPONICS_INVOICE_DETAIL_API_URL = process.env.REACT_APP_API_HOST+'/api/invoice/';
export const MIKAPONICS_INSTRUMENT_ANALYSIS_LIST_CREATE_API_URL = process.env.REACT_APP_API_HOST+'/api/instrument/analyses';
export const MIKAPONICS_INSTRUMENT_ANALYSIS_RETRIEVE_UPDATE_DELETE_API_URL = process.env.REACT_APP_API_HOST+'/api/instrument/analysis';
export const MIKAPONICS_INVOICE_SEND_EMAIL_API_URL = process.env.REACT_APP_API_HOST+'/api/invoice-send-email/';
export const MIKAPONICS_PRODUCTION_LIST_CREATE_API_URL = process.env.REACT_APP_API_HOST+'/api/productions';
export const MIKAPONICS_PRODUCTION_RETRIEVE_UPDATE_API_URL = process.env.REACT_APP_API_HOST+'/api/production/';
export const MIKAPONICS_CROP_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/crops';
export const MIKAPONICS_CROP_SUBSTRATE_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/crop-substrates';

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
export const NEVER_REPORT_EMAIL_FREQUENCY = 1;
export const WEEKLY_REPORT_EMAIL_FREQUENCY = 2;
export const MONTHLY_REPORT_EMAIL_FREQUENCY = 3;

/**
 *  The type of crop choices we have for the 'type_of' field in the crop API.
 */
export const CROP_PLANT_TYPE = 1;
export const CROP_FISHSTOCK_TYPE = 2;
export const CROP_ANIMALSTOCK_TYPE = 3;

/**
 *  The type of choices we have for the `Production` API endpoint for the
 *  `type_of` field.
 */
export const PRODUCTION_AQUAPONICS_TYPE = 1
export const PRODUCTION_HYDROPONICS_TYPE = 2
export const PRODUCTION_AQUACULTURE_TYPE = 3
export const PRODUCTION_TYPE_OPTION_CHOICES = [
    {
        selectName: "typeOf",
        value: PRODUCTION_AQUAPONICS_TYPE,
        label: "Aquaponics"
    },{
        selectName: "typeOf",
        value: PRODUCTION_HYDROPONICS_TYPE,
        label: "Hydroponics"
    },{
        selectName: "typeOf",
        value: PRODUCTION_AQUACULTURE_TYPE,
        label: "Aquaculture"
    }
];

/**
 *  The environment type choices for production.
 */
export const PRODUCTION_INDOOR_ENVIRONMENT = 1;
export const PRODUCTION_OUTDOOR_ENVIRONMENT = 2;
export const PRODUCTION_ENVIRONMENT_OPTION_CHOICES = [
    {
        selectName: "environment",
        value: PRODUCTION_INDOOR_ENVIRONMENT,
        label: "Indoor"
    },{
        selectName: "environment",
        value: PRODUCTION_OUTDOOR_ENVIRONMENT,
        label: "Outdoor"
    }
];


/**
 *  The `growSystem` type choices for production API endpoint.
 */
export const PRODUCTION_OTHER_SYSTEM = 1;
export const PRODUCTION_WICK_SYSTEM = 2;
export const PRODUCTION_DEEP_WATER_CULTURE_SYSTEM = 3;
export const PRODUCTION_EBB_AND_FLOW_SYSTEM = 4;
export const PRODUCTION_NFT_SYSTEM = 5;
export const PRODUCTION_DRIP_SYSTEM = 6;
export const PRODUCTION_AEROPONIC_SYSTEM = 7;
export const PRODUCTION_VERTICAL_TOWER_SYSTEM = 8;
export const PRODUCTION_GROW_SYSTEM_OPTION_CHOICES = [
    {
        selectName: "growSystem",
        value: PRODUCTION_WICK_SYSTEM,
        label: "Wick System"
    },{
        selectName: "growSystem",
        value: PRODUCTION_DEEP_WATER_CULTURE_SYSTEM,
        label: "Deep Water Culture System"
    },{
        selectName: "growSystem",
        value: PRODUCTION_EBB_AND_FLOW_SYSTEM,
        label: "Ebb and Flow System"
    },{
        selectName: "growSystem",
        value: PRODUCTION_NFT_SYSTEM,
        label: "NFT System"
    },{
        selectName: "growSystem",
        value: PRODUCTION_DRIP_SYSTEM,
        label: "Drip System"
    },{
        selectName: "growSystem",
        value: PRODUCTION_AEROPONIC_SYSTEM,
        label: "Aeroponic System"
    },{
        selectName: "growSystem",
        value: PRODUCTION_VERTICAL_TOWER_SYSTEM,
        label: "Vertical Tower System"
    },{
        selectName: "growSystem",
        value: PRODUCTION_OTHER_SYSTEM,
        label: "Other"
    }
];
