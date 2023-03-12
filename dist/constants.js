"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_JWT = exports.HASH_SALT = exports.ID_ALPHABET = exports.ID_LENGTH = exports.ENV = exports.constants = void 0;
/**
 * constants declarations to be (re)used anywhere in the app
 * here we can declare anything we would need throughout the app like:
 * baseUrl, port, environment variables, error messages, http status codes, specific project consts etc..
 */
exports.constants = {
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
exports.ENV = Object.freeze({
    DEV: 'development',
    STAGING: 'staging',
    LOCAL: 'local',
    PROD: 'production',
});
exports.ID_LENGTH = 10;
exports.ID_ALPHABET = '1234567890abcdef';
exports.HASH_SALT = 12;
exports.COOKIE_JWT = 'jwt';
