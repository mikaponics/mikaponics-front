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
export const MIKAPONICS_SUBSCRIPTION_API_URL = process.env.REACT_APP_API_HOST+'/api/subscription';
export const MIKAPONICS_PRODUCT_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/products';
export const MIKAPONICS_PURCHASE_SUBSCRIPTION_API_URL = process.env.REACT_APP_API_HOST+'/api/subscription';
export const MIKAPONICS_GET_PROFILE_API_URL = process.env.REACT_APP_API_HOST+'/api/profile';
export const MIKAPONICS_DASHBOARD_API_URL = process.env.REACT_APP_API_HOST+'/api/dashboard';
export const MIKAPONICS_DEVICE_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/devices';
export const MIKAPONICS_GET_DEVICE_API_URL = process.env.REACT_APP_API_HOST+'/api/device';
export const MIKAPONICS_GET_INSTRUMENT_API_URL = process.env.REACT_APP_API_HOST+'/api/instrument';
export const MIKAPONICS_GET_TIME_SERIES_DATA_API_URL = process.env.REACT_APP_API_HOST+'/api/data';
export const MIKAPONICS_GET_TIME_SERIES_DATA_CSV_DOWNLOAD_API_URL = process.env.REACT_APP_API_HOST+'/api/data/csv';
export const MIKAPONICS_ALERT_ITEM_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/alerts';
export const MIKAPONICS_ALERT_ITEM_DETAIL_API_URL = process.env.REACT_APP_API_HOST+'/api/alert/';
export const MIKAPONICS_ALERT_ITEM_WAS_VIEWED_FUNC_API_URL = process.env.REACT_APP_API_HOST+'/api/alert-was-viewed/';
export const MIKAPONICS_INVOICE_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/invoices';
export const MIKAPONICS_INVOICE_DETAIL_API_URL = process.env.REACT_APP_API_HOST+'/api/invoice/';
export const MIKAPONICS_INSTRUMENT_ANALYSIS_LIST_CREATE_API_URL = process.env.REACT_APP_API_HOST+'/api/instrument/analyses';
export const MIKAPONICS_INSTRUMENT_ANALYSIS_RETRIEVE_UPDATE_DELETE_API_URL = process.env.REACT_APP_API_HOST+'/api/instrument/analysis';
export const MIKAPONICS_INVOICE_SEND_EMAIL_API_URL = process.env.REACT_APP_API_HOST+'/api/invoice-send-email/';
export const MIKAPONICS_PRODUCTION_LIST_CREATE_API_URL = process.env.REACT_APP_API_HOST+'/api/productions';
export const MIKAPONICS_PRODUCTION_RETRIEVE_UPDATE_API_URL = process.env.REACT_APP_API_HOST+'/api/production/';
export const MIKAPONICS_CROP_DATA_SHEET_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/crop-data-sheets';
export const MIKAPONICS_CROP_LIFE_CYCLE_STAGE_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/crop-life-cycle-stages';
export const MIKAPONICS_CROP_SUBSTRATE_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/crop-substrates';
export const MIKAPONICS_PROBLEM_DATA_SHEET_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/problem-data-sheets';
export const MIKAPONICS_PRODUCTION_TERMINATION_API_URL = process.env.REACT_APP_API_HOST+'/api/production-termination/';
export const MIKAPONICS_PRODUCTION_CROP_LIST_CREATE_API_URL = process.env.REACT_APP_API_HOST+'/api/production-crops';
export const MIKAPONICS_PRODUCTION_CROP_RETRIEVE_UPDATE_API_URL = process.env.REACT_APP_API_HOST+'/api/production-crop/';
export const MIKAPONICS_PRODUCTION_INSPECTION_LIST_CREATE_API_URL = process.env.REACT_APP_API_HOST+'/api/production-inspections';
export const MIKAPONICS_PRODUCTION_INSPECTION_RETRIEVE_UPDATE_API_URL = process.env.REACT_APP_API_HOST+'/api/production-inspection/';
export const MIKAPONICS_PRODUCTION_CROP_INSPECTION_LIST_CREATE_API_URL = process.env.REACT_APP_API_HOST+'/api/production-crop-inspections';
export const MIKAPONICS_PRODUCTION_CROP_INSPECTION_RETRIEVE_UPDATE_API_URL = process.env.REACT_APP_API_HOST+'/api/production-crop-inspection/';
export const MIKAPONICS_TASK_ITEM_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/tasks';
export const MIKAPONICS_TASK_ITEM_DETAIL_API_URL = process.env.REACT_APP_API_HOST+'/api/task/';
export const MIKAPONICS_APPLICATION_LIST_API_URL = process.env.REACT_APP_API_HOST+'/api/applications';
export const MIKAPONICS_APPLICATION_DELETE_API_URL = process.env.REACT_APP_API_HOST+'/api/application/';

/**
 * The available choices for the `state` field in the `Device` API.
 */
export const DEVICE_NEW_STATE = 1;
export const DEVICE_ONLINE_STATE = 2;
export const DEVICE_OFFLINE_STATE = 3;
export const DEVICE_ERROR_STATE = 4;
export const DEVICE_ARCHIVED_STATE = 5;  // A.k.a. "Deleted".

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
 *
 *  Link: https://github.com/mikaponics/mikaponics-back/blob/master/mikaponics/foundation/models/production.py
 */

export const PRODUCTION_OTHER_TYPE = 1
export const PRODUCTION_SOIL_TYPE = 2
export const PRODUCTION_AQUAPONICS_TYPE = 3
export const PRODUCTION_HYDROPONICS_TYPE = 4
export const PRODUCTION_AQUACULTURE_TYPE = 5
export const PRODUCTION_TYPE_OPTION_CHOICES = [
    {
        selectName: "typeOf",
        value: PRODUCTION_SOIL_TYPE,
        label: "Soil"
    },{
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
    },{
        selectName: "typeOf",
        value: PRODUCTION_OTHER_TYPE,
        label: "Other"
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


/**
 *  The `state` variable for the `Production` API endpoint.
 */
export const PRODUCTION_PREPARING_STATE = 1;
export const PRODUCTION_OPERATING_STATE = 3;
export const PRODUCTION_TERMINATED_STATE = 4;
export const PRODUCTION_STATE_CHOICES = [
    {
        selectName: "state",
        value: PRODUCTION_PREPARING_STATE,
        label: "Preparing"
    },{
        selectName: "state",
        value: PRODUCTION_OPERATING_STATE,
        label: "Operating"
    },{
        selectName: "state",
        value: PRODUCTION_TERMINATED_STATE,
        label: "Terminated"
    }
];


/**
 *  The `state` variable for the `ProductionInspection` API endpoint.
 */
export const PRODUCTION_INSPECTION_DRAFT_STATE = 1;
export const PRODUCTION_INSPECTION_SUBMITTED_STATE = 2;
export const PRODUCTION_INSPECTION_STATE_OPTION_CHOICES = [
    {
        selectName: "state",
        value: PRODUCTION_INSPECTION_DRAFT_STATE,
        label: "Draft"
    },{
        selectName: "state",
        value: PRODUCTION_INSPECTION_SUBMITTED_STATE,
        label: "Submitted"
    }
];


/**
 *  The `review` variable for the `ProductionCropInspection` API endpoint.
 */
export const PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW = 1;
export const PRODUCTION_CROPS_INSPECTION_BAD_REVIEW = 2;
export const PRODUCTION_CROPS_INSPECTION_AVERAGE_REVIEW = 3;
export const PRODUCTION_CROPS_INSPECTION_GOOD_REVIEW = 4;
export const PRODUCTION_CROPS_INSPECTION_EXCELLENT_REVIEW = 5;
export const PRODUCTION_CROPS_INSPECTION_REVIEW_OPTION_CHOICES = [
    {
        selectName: "review",
        value: PRODUCTION_CROPS_INSPECTION_TERRIBLE_REVIEW,
        label: "Terrible"
    },{
        selectName: "review",
        value: PRODUCTION_CROPS_INSPECTION_BAD_REVIEW,
        label: "Bad"
    },{
        selectName: "review",
        value: PRODUCTION_CROPS_INSPECTION_AVERAGE_REVIEW,
        label: "Average"
    },{
        selectName: "review",
        value: PRODUCTION_CROPS_INSPECTION_GOOD_REVIEW,
        label: "Good"
    },{
        selectName: "review",
        value: PRODUCTION_CROPS_INSPECTION_EXCELLENT_REVIEW,
        label: "Excellent"
    }
];


/**
 *  The `state` variable for the `AlertItem` API endpoint.
 */
export const ALERT_ITEM_UNREAD_STATE = 1;
export const ALERT_ITEM_READ_STATE = 2;
export const ALERT_ITEM_ARCHIVED_STATE = 3;


/**
 *  The `inspection_frequency` data for the `Production` API endpoint.
 */
export const PRODUCTION_INSPECTION_NEVER_FREQUENCY = 1;
export const PRODUCTION_INSPECTION_DAILY_FREQUENCY = 2;
export const PRODUCTION_INSPECTION_WEEKLY_FREQUENCY = 3;
export const PRODUCTION_INSPECTION_BI_WEEKLY_FREQUENCY = 4;
export const PRODUCTION_INSPECTION_MONTHLY_FREQUENCY = 5;
export const PRODUCTION_INSPECTION_FREQUENCY_CHOICES = [
    {
        selectName: "inspectionFrequency",
        value: PRODUCTION_INSPECTION_NEVER_FREQUENCY,
        label: "Never"
    },{
        selectName: "inspectionFrequency",
        value: PRODUCTION_INSPECTION_DAILY_FREQUENCY,
        label: "Daily"
    },{
        selectName: "inspectionFrequency",
        value: PRODUCTION_INSPECTION_WEEKLY_FREQUENCY,
        label: "Weekly"
    },{
        selectName: "inspectionFrequency",
        value: PRODUCTION_INSPECTION_BI_WEEKLY_FREQUENCY,
        label: "Bi-weekly"
    },{
        selectName: "inspectionFrequency",
        value: PRODUCTION_INSPECTION_MONTHLY_FREQUENCY,
        label: "Monthly"
    }
];


/**
 *  The `red_alert_delay_in_seconds` data for alerts API.
 */
export const RED_ALERT_DELAY_IN_SECONDS_CHOICES = [
    {
        selectName: "redAlertDelayInSeconds",
        value: 60,
        label: "Every minute"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 120,
        label: "Every 2 minutes"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 300,
        label: "Every 5 minutes"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 600,
        label: "Every 10 minutes"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 1200,
        label: "Every 20 minutes"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 1800,
        label: "Every 30 minutes"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 3600,
        label: "Every hour"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 7200,
        label: "Every 2 hours"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 14400,
        label: "Every 4 hours"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 21680,
        label: "Every 6 hours"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 43200,
        label: "Every 12 hours"
    },{
        selectName: "redAlertDelayInSeconds",
        value: 86400,
        label: "Every 24 hours"
    }
];


/**
 *  The `type_of` options for the `Instrument` API endpoint.
 */
export const CAMERA_INSTRUMENT_TYPE = 13;


/**
 *  The harvest failure reasons for the production completion.
 */
export const PRODUCITON_OTHER_HARVEST_FAILURE_REASON = 1;
export const PRODUCTION_PEST_HARVEST_FAILURE_REASON = 2;
export const PRODUCTION_DISEASE_HARVEST_FAILURE_REASON = 3;
export const PRODUCTION_ABIOTIC_HARVEST_FAILURE_REASON = 4;
export const PRODUCTION_TECHNICAL_FAILURE_HARVEST_FAILURE_REASON = 5;
export const PRODUCTION_HUMAN_ERROR_HARVEST_FAILURE_REASON = 6;
export const PRODUCTION_HARVEST_FAILURE_REASON_OPTION_CHOICES = [
    {
        selectName: "harvestFailureReason",
        value: PRODUCTION_PEST_HARVEST_FAILURE_REASON,
        label: "Pest Problem"
    },{
        selectName: "harvestFailureReason",
        value: PRODUCTION_DISEASE_HARVEST_FAILURE_REASON,
        label: "Disease Problem"
    },{
        selectName: "harvestFailureReason",
        value: PRODUCTION_ABIOTIC_HARVEST_FAILURE_REASON,
        label: "Abiotic Problem"
    },{
        selectName: "harvestFailureReason",
        value: PRODUCTION_TECHNICAL_FAILURE_HARVEST_FAILURE_REASON,
        label: "Technical Problem"
    },{
        selectName: "harvestFailureReason",
        value: PRODUCTION_HUMAN_ERROR_HARVEST_FAILURE_REASON,
        label: "Human Error"
    },{
        selectName: "harvestFailureReason",
        value: PRODUCITON_OTHER_HARVEST_FAILURE_REASON,
        label: "Other (Please specify)"
    }
];


/**
 *  The `harvest_yield` variable for the `ProductionCrop` API endpoint.
 */
export const PRODUCTION_CROPS_TERRIBLE_HARVEST_YIELD = 1;
export const PRODUCTION_CROPS_BAD_HARVEST_YIELD = 2;
export const PRODUCTION_CROPS_AVERAGE_HARVEST_YIELD = 3;
export const PRODUCTION_CROPS_GOOD_HARVEST_YIELD = 4;
export const PRODUCTION_CROPS_EXCELLENT_HARVEST_YIELD = 5;
export const PRODUCTION_HARVEST_YIELD_OPTION_CHOICES = [
    {
        selectName: "harvestYield",
        value: PRODUCTION_CROPS_TERRIBLE_HARVEST_YIELD,
        label: "Terrible"
    },{
        selectName: "harvestYield",
        value: PRODUCTION_CROPS_BAD_HARVEST_YIELD,
        label: "Bad"
    },{
        selectName: "harvestYield",
        value: PRODUCTION_CROPS_AVERAGE_HARVEST_YIELD,
        label: "Average"
    },{
        selectName: "harvestYield",
        value: PRODUCTION_CROPS_GOOD_HARVEST_YIELD,
        label: "Good"
    },{
        selectName: "harvestYield",
        value: PRODUCTION_CROPS_EXCELLENT_HARVEST_YIELD,
        label: "Excellent"
    }
];



/**
 *  The `harvest_quality` variable for the `ProductionCrop` API endpoint.
 */
export const PRODUCTION_CROPS_TERRIBLE_HARVEST_QUALITY = 1;
export const PRODUCTION_CROPS_BAD_HARVEST_QUALITY = 2;
export const PRODUCTION_CROPS_AVERAGE_HARVEST_QUALITY = 3;
export const PRODUCTION_CROPS_GOOD_HARVEST_QUALITY = 4;
export const PRODUCTION_CROPS_EXCELLENT_HARVEST_QUALITY = 5;
export const PRODUCTION_HARVEST_QUALITY_OPTION_CHOICES = [
    {
        selectName: "harvestQuality",
        value: PRODUCTION_CROPS_TERRIBLE_HARVEST_QUALITY,
        label: "Terrible"
    },{
        selectName: "harvestQuality",
        value: PRODUCTION_CROPS_BAD_HARVEST_QUALITY,
        label: "Bad"
    },{
        selectName: "harvestQuality",
        value: PRODUCTION_CROPS_AVERAGE_HARVEST_QUALITY,
        label: "Average"
    },{
        selectName: "harvestQuality",
        value: PRODUCTION_CROPS_GOOD_HARVEST_QUALITY,
        label: "Good"
    },{
        selectName: "harvestQuality",
        value: PRODUCTION_CROPS_EXCELLENT_HARVEST_QUALITY,
        label: "Excellent"
    }
];


/**
 * The available choices for the `type_of` field in the `ProblemDataSheet` API.
 */
export const PEST_TYPE_OF = 1;
export const DISEASE_TYPE_OF = 2;
export const ABIOTIC_TYPE_OF = 3;
export const NONE_TYPE_OF = 4;



export const HUMIDITY = 1
export const AIR_TEMPERATURE = 2
export const WATER_TEMPERATURE = 3
export const TVOC = 4
export const CO2 = 5
export const AIR_PRESSURE = 6
export const ALTITUDE = 7
export const WATER_LEVEL = 8
export const POWER_USAGE = 9
export const PH = 10
export const EC = 11
export const ORP = 12
export const CAMERA = 13
export const HEAT_VISION = 14
export const UV_LIGHT = 15
export const TRIAD_SPECTROSCOPY = 16
export const ILLUMINANCE = 17
export const SOIL_MOISTURE = 18
export const SOIL_TEMPERATURE = 19


export const INSTRUMENT_OPTIONS = [
    {
        selectName: "instruments",
        value: HUMIDITY,
        label: "Humidity"
    },{
        selectName: "instruments",
        value: AIR_TEMPERATURE,
        label: "Air Temperature"
    },{
        selectName: "instruments",
        value: WATER_TEMPERATURE,
        label: "Water Temperature"
    },{
        selectName: "instruments",
        value: TVOC,
        label: "Total Volatile Organic Compound"
    },{
        selectName: "instruments",
        value: CO2,
        label: "Carbon Dioxide"
    },{
        selectName: "instruments",
        value: AIR_PRESSURE,
        label: "Air Pressure"
    },{
        selectName: "instruments",
        value: ALTITUDE,
        label: "Altitude"
    },{
        selectName: "instruments",
        value: WATER_LEVEL,
        label: "Water Level"
    },{
        selectName: "instruments",
        value: POWER_USAGE,
        label: "Power Usage"
    },{
        selectName: "instruments",
        value: PH,
        label: "pH"
    },{
        selectName: "instruments",
        value: EC,
        label: "Electrical Conductivity"
    },{
        selectName: "instruments",
        value: ORP,
        label: "Oxidation-Reduction Potential"
    },{
        selectName: "instruments",
        value: CAMERA,
        label: "Camera"
    },{
        selectName: "instruments",
        value: HEAT_VISION,
        label: "Heat Vision"
    },{
        selectName: "instruments",
        value: UV_LIGHT,
        label: "UV Light"
    },{
        selectName: "instruments",
        value: TRIAD_SPECTROSCOPY,
        label: "Triad Spectroscopy"
    },{
        selectName: "instruments",
        value: ILLUMINANCE,
        label: "Illuminance"
    },{
        selectName: "instruments",
        value: SOIL_MOISTURE,
        label: "Soil Moisture"
    },{
        selectName: "instruments",
        value: SOIL_TEMPERATURE,
        label: "Soil Temperature"
    }
];
