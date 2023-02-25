import { Hash, HttpRequest, HttpResponse } from "../types";
import { Base64 } from 'js-base64';
import { constants } from "../constants";
import { UserService } from "../services";
import { User } from "../db/models/user.model";
// Local
// const DOMAIN = 'localhost';
// Production
// const DOMAIN = 'vatbox.com';

export function toHash<T, Result = T>(array: T[], keySelector: (item: T) => string | number, resultSelector: (item: T) => Result = item => item as any as Result): Hash<Result> {
    return array.reduce((acc: Hash<Result>, item: T) => {
        acc[keySelector(item)] = resultSelector(item);
        return acc;
    }, {})
}

export function flatten<T>(array: T[][]) {
    return array.reduce((acc, list) => [...acc, ...list], [])
}

/**
 * @description Returns an object with specified fields omited
 * @param item The original item
 * @param fieldNames a list of field names to omit
 */
export function omit<T extends {}>(item: T, ...fieldNames: (keyof typeof item)[]): Partial<T> {
    return Object.keys(item)
        .filter(key => !fieldNames.includes(key as keyof T))
        .reduce((acc, key) => Object.assign(acc, { [key]: item[key as keyof T] }), {});
}

/**
 * @description Returns an object with specified fields, omitting everithing else
 * @param item The original item
 * @param fieldNames a list of field names to extract
 */
export function extract<T extends {}>(item: T, ...fieldNames: (keyof typeof item)[]): Partial<T> {
    return Object.keys(item)
        .filter(key => fieldNames.includes(key as keyof T))
        .reduce((acc, key) => Object.assign(acc, { [key]: item[key as keyof T] }), {});
}

/**
 * @description Accepts a base64 encoded string as a parameter and will check i decoded string is in JSON format
 * @param {string} source
 * @returns {object} If the decoded string is in JSON format, will return the parsed object and if not, will return the original string
 */
export const decodeBase64 = <T = any>(source: string): { isJson: true, result: T } | { isJson: false, result: string } => {
    if (!source) {
        return {
            isJson: false,
            result: source
        }
    }
    const str = Base64.decode(source);

    try {
        const result = {
            isJson: true,
            result: JSON.parse(str)
        }
        return result;
    } catch (e: any) {
        const result: { isJson: false, result: string } = {
            isJson: false,
            result: str
        }
        console.log(e, 'Failed to parse string, original string returned');
        return result;
    }
};

export const getUserFromRequest = async (request: HttpRequest, response: HttpResponse): Promise<User> => {
    const accessToken: string = request.cookies.jwt || request.cookies.access;

    if (!accessToken) {
        throw {
            status: constants.http.unauthorized,
            message: 'Failed token validation'
        }
    }

    const parts = accessToken.split('.');

    const decoded = decodeBase64(parts[1]);

    const userProfile = await UserService.getUserById(decoded.result.id);

    if (!userProfile) {
        throw {
            status: constants.http.unauthorized,
            message: 'No user with this ID'
        }
    }

    return userProfile;
}

export const getUserIdFromRequest = async (request: HttpRequest, response: HttpResponse): Promise<string | null> => {
    const accessToken: string = request.cookies.access || request.headers['x-vatbox-access'];

    if (!accessToken) {
        throw {
            status: constants.http.unauthorized,
            message: 'Failed token validation'
        }
    }

    // const verification = await verifyAccessToken(accessToken);

    // if (!verification.success) {
    //     throw {
    //         status: constants.http.unauthorized,
    //         message: 'Failed token validation'
    //     }
    // }

    // // do we need to update cookies
    // if (verification.accessTokenRefresh) {
    //     setCookies(request, response, verification.accessToken);
    // }

    // return verification.username;
    return null;
}

export const getAccessTokenFromCookie = (request: HttpRequest): string | undefined => {
    const { cookies: { jwt } } = request;
    if (!jwt) {
        return undefined;
    }
    return jwt;
}

export const setCookies = (request: HttpRequest, response: HttpResponse, accessToken: string): void => {
    const domain = extractDomain(request);
    response.cookie('access', accessToken, { domain, path: "/", secure: true, httpOnly: true, sameSite: true });
    response.header('x-vatbox-access', accessToken);
}

export const clearCookies = (request: HttpRequest, response: HttpResponse): void => {
    response.clearCookie('jwt');
}

export const calculatePagination = (page: number, pageSize: number) => {
    const start = page * pageSize;
    // end is exclusive
    const end = start + pageSize;
    return { start, end };
};

export const toBoolean = (input: string) => {
    const trues = ['true', '1'];
    return trues.includes(input);
}

export const convertStringToPositiveNumber = (query: string, defaultNum = 0) => {
    return query && !!+query ? Math.abs(+query) : defaultNum;
}

function extractDomain(request: HttpRequest) {
    const header = (request.headers['x-original-uri'] || "https://app.vatbox.com") as string;
    const regex = /^https?:\/\/(?:[^.]*\.)?([^\/]*\.[^\/]*)\/?.*$/i;
    const match = header.match(regex);

    if (!match) {
        throw {
            status: constants.http.badRequest,
            message: 'Failed to parse request header'
        };
    }
    const domain = match[1];
    return domain;
}

export const areArraysEqual = <T>(first: T[], second: T[]) => {
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
}