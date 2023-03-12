"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areArraysEqual = exports.convertStringToPositiveNumber = exports.toBoolean = exports.clearCookies = exports.setCookies = exports.getAccessTokenFromCookie = exports.getUserFromRequest = exports.decodeBase64 = exports.extract = exports.omit = exports.flatten = exports.toHash = void 0;
const js_base64_1 = require("js-base64");
const constants_1 = require("../constants");
const services_1 = require("../services");
// Local
// const DOMAIN = 'localhost';
// Production
// const DOMAIN = 'vatbox.com';
function toHash(array, keySelector, resultSelector = item => item) {
    return array.reduce((acc, item) => {
        acc[keySelector(item)] = resultSelector(item);
        return acc;
    }, {});
}
exports.toHash = toHash;
function flatten(array) {
    return array.reduce((acc, list) => [...acc, ...list], []);
}
exports.flatten = flatten;
/**
 * @description Returns an object with specified fields omited
 * @param item The original item
 * @param fieldNames a list of field names to omit
 */
function omit(item, ...fieldNames) {
    return Object.keys(item)
        .filter(key => !fieldNames.includes(key))
        .reduce((acc, key) => Object.assign(acc, { [key]: item[key] }), {});
}
exports.omit = omit;
/**
 * @description Returns an object with specified fields, omitting everithing else
 * @param item The original item
 * @param fieldNames a list of field names to extract
 */
function extract(item, ...fieldNames) {
    return Object.keys(item)
        .filter(key => fieldNames.includes(key))
        .reduce((acc, key) => Object.assign(acc, { [key]: item[key] }), {});
}
exports.extract = extract;
/**
 * @description Accepts a base64 encoded string as a parameter and will check i decoded string is in JSON format
 * @param {string} source
 * @returns {object} If the decoded string is in JSON format, will return the parsed object and if not, will return the original string
 */
const decodeBase64 = (source) => {
    if (!source) {
        return {
            isJson: false,
            result: source
        };
    }
    const str = js_base64_1.Base64.decode(source);
    try {
        const result = {
            isJson: true,
            result: JSON.parse(str)
        };
        return result;
    }
    catch (e) {
        const result = {
            isJson: false,
            result: str
        };
        console.log(e, 'Failed to parse string, original string returned');
        return result;
    }
};
exports.decodeBase64 = decodeBase64;
const getUserFromRequest = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = request.cookies.jwt || request.cookies.access;
    if (!accessToken) {
        throw {
            status: constants_1.constants.http.unauthorized,
            message: 'Failed token validation'
        };
    }
    const parts = accessToken.split('.');
    const decoded = (0, exports.decodeBase64)(parts[1]);
    const userProfile = yield services_1.UserService.getUserById(decoded.result.id);
    if (!userProfile) {
        throw {
            status: constants_1.constants.http.unauthorized,
            message: 'No user with this ID'
        };
    }
    return userProfile;
});
exports.getUserFromRequest = getUserFromRequest;
const getAccessTokenFromCookie = (request) => {
    const { cookies: { jwt } } = request;
    if (!jwt) {
        return undefined;
    }
    return jwt;
};
exports.getAccessTokenFromCookie = getAccessTokenFromCookie;
const setCookies = (request, response, accessToken) => {
    response.cookie('access', accessToken, { path: "/", secure: true, httpOnly: true, sameSite: true });
    response.header('x-vatbox-access', accessToken);
};
exports.setCookies = setCookies;
const clearCookies = (request, response) => {
    response.clearCookie('jwt');
};
exports.clearCookies = clearCookies;
const toBoolean = (input) => {
    const trues = ['true', '1'];
    return trues.includes(input);
};
exports.toBoolean = toBoolean;
const convertStringToPositiveNumber = (query) => {
    return query && !!+query ? Math.abs(+query) : undefined;
};
exports.convertStringToPositiveNumber = convertStringToPositiveNumber;
const areArraysEqual = (first, second) => {
    if (first.length !== second.length) {
        return false;
    }
    for (let i = 0; i < first.length; i++) {
        if (!second.includes(first[i])) {
            return false;
        }
        if (!first.includes(second[i])) {
            return false;
        }
    }
    return true;
};
exports.areArraysEqual = areArraysEqual;
