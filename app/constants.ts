/**
 * constants declarations to be (re)used anywhere in the app
 * here we can declare anything we would need throughout the app like:
 * baseUrl, port, environment variables, error messages, http status codes, specific project consts etc..
 */
export const constants = {
  baseUrl: '/api/exposed/v1.0',
  port: 3000,
  swaggerUrl: '/api-docs',
  swaggerUrls: {
    // swagger doc urls for each environment (replace {{placeholder}} with relevant value)
    development: '/api/exposed/v1.0',
    staging: '/api/v1/namespaces/default/services/cockpit/proxy/api/exposed/v1.0',
    production: '',
  },
  serviceName: 'cockpit',
  ENV: Object.freeze({
    DEV: 'development',
    STAGING: 'staging',
    PROD: 'production',
    TEST: 'test',
    LOCAL: 'local',
  }),
  types: Object.freeze({
    OBJECT: 'object',
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    FUNCTION: 'function',
    EMPTY: '',
    NULL: null,
  }),
  crudMessages: {
    created: 'Created',
    updated: 'Updated',
    deleted: 'Deleted',
  },
  http: Object.freeze({
    // 200s
    ok: 200,
    created: 201,
    accepted: 202,
    noAuthInfo: 203,
    noContent: 204,
    // 400s
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    semantic: 422,
    // 500s
    server: 500,
    unimplemented: 501,
    unavailable: 503,
  }),
};

export const ENV = Object.freeze({
  DEV: 'development',
  STAGING: 'staging',
  LOCAL: 'local',
  PROD: 'production',
});

export const REQUEST_HEADERS = Object.freeze({
  'Content-Type': 'application/json',
  'vatbox-service-name': 'cockpit-backend',
});

export const FREQUENCIES = Object.freeze({
  IMMEDIATE: 'immediate',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
});

export const CHANNELS = Object.freeze({
  EMAIL: 'email',
});

export const MANDATORY_CSV_COLUMN_NAMES = Object.freeze({
  EXPENSE_MAPPINGS: ['customerValue', 'systemValue', 'thirdPartyAttendee'],
  ENTITY_MAPPINGS: ['entityId', 'entityName', 'externalId'],
});

const API_GHOST_RIDER = `http://ghost-rider/api/exposed/v1.0`;
// export const API_GHOST_RIDER = `http://localhost:8001/api/v1/namespaces/backoffice-team/services/ghost-rider:http/proxy/api/exposed/v1.0`;

export const API_GHOST = `http://ghost/api/exposed/v1.0`;
// export const API_GHOST = `http://localhost:8001/api/v1/namespaces/backoffice-team/services/ghost:http/proxy/api/exposed/v1.0`;

export const BASE_API = API_GHOST_RIDER;

export const API_INDIGESTION = 'http://indigestion/api/exposed/v1.0';
// export const API_INDIGESTION = 'http://localhost:3001/api/exposed/v1.0';
// export const API_INDIGESTION = `http://localhost:8001/api/v1/namespaces/backoffice-team/services/indigestion:http/proxy/api/exposed/v1.0`;

export const ACCOUNT_SETUP_API = 'http://account-setup/api/exposed/v2';
// export const ACCOUNT_SETUP_API = `http://localhost:8001/api/v1/namespaces/backoffice-team/services/account-setup:http/proxy/api/exposed/v2`;

export const CAPUA_API = 'http://capua/api/exposed/v1.0';
// export const CAPUA_API = `http://localhost:8001/api/v1/namespaces/backoffice-team/services/capua:http/proxy/api/exposed/v1.0`;
// export const CAPUA_API = 'http://localhost:3000/api/exposed/v1.0';

// export const API_IMAGINARY = 'http://localhost:8001/api/v1/namespaces/backoffice-team/services/imaginary:http/proxy/api/exposed/v1.0';
export const API_IMAGINARY = 'http://imaginary/api/exposed/v1.0';
