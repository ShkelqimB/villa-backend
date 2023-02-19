// import fetch from 'node-fetch';
// import jwt from 'jsonwebtoken';
// import jwkToPem, { JWK } from 'jwk-to-pem';

// import { JWKResult, JSONWebKey } from '../presenters/results/jwk.result';
// import { JWTPayload } from '../presenters/results/jwt-payload.result';
// import { UserProfileCheckResult } from '~/presenters/results/user-profile.result';
// import { decodeBase64 } from './utils';
// import { logError, log } from './logger';
// import { CognitoService } from '~/services';
// import { AccessTokenValidationResult } from '~/presenters/results/access-token.result';
// import { AccessCache } from '~/cache/access.cache';

// const {
//     COGNITO_USER_POOL = ''
// } = process.env;

// const cognitoJwkUrl = `https://cognito-idp.eu-west-1.amazonaws.com/${COGNITO_USER_POOL}/.well-known/jwks.json`;

// const cognitoJwk: { key?: JWKResult } = {};

// export const getCognitoJsonWebKeys = async () => {
//     if (!cognitoJwk.key) {
//         const response = await fetch(cognitoJwkUrl, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const result = await response.json() as JWKResult;
//         cognitoJwk.key = result;
//     }
//     return cognitoJwk.key;
// }

// export const getJsonWebKey = (kid: string, jsonWebKeys: JWKResult): JSONWebKey | undefined => {
//     return jsonWebKeys.keys.find(jwk => jwk.kid === kid);
// }

// export const verifyJsonWebTokenSignature = async (token: string, jsonWebKey: JWK): Promise<boolean> => {
//     const pem = jwkToPem(jsonWebKey);
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, pem, { algorithms: ['RS256'] }, (err, decodedToken) => {
//             if (err) {
//                 return reject(err);
//             }

//             if (!decodedToken) {
//                 return resolve(false);
//             }

//             return resolve(true);
//         });
//     });
// }

// export const verifyAccessToken = async (accessToken: string): Promise<AccessTokenValidationResult> => {
//     const [accessHeader, accessPayload] = accessToken.split('.');
//     // check access token header validity
//     const decodedHeader = decodeBase64(accessHeader);

//     if (!decodedHeader.isJson) {
//         logError(undefined, `Decoded jwt header is incorrect, decodedHeader: ${decodedHeader.result}`);
//         return {
//             success: false
//         }
//     }
//     const header = decodedHeader.result;

//     const jsonWebKeys = await getCognitoJsonWebKeys();
//     if (!jsonWebKeys) {
//         logError(undefined, `jwks.json file from AWS Cognito is undefined`);
//         return {
//             success: false
//         }
//     }

//     const jwk = getJsonWebKey(header.kid, jsonWebKeys);
//     if (!jwk) {
//         logError(undefined, `local jwt header.kid doesn't match any jwk in jwks.json, header.kid: ${header.kid}`);
//         return {
//             success: false
//         }
//     }

//     // check access token payload validity
//     const decodedPayload = decodeBase64(accessPayload);
//     if (!decodedPayload.isJson) {
//         logError(undefined, `Failed to parse access token ${accessToken}, ${decodedPayload.result}`);
//         return {
//             success: false
//         }
//     }
//     const payload: JWTPayload = decodedPayload.result;
//     const userId = payload.username;

//     if (!userId) {
//         logError(undefined, `Failed to parse access token ${accessToken} with decoding ${JSON.stringify(decodedPayload.result)}, userId is undefined or empty`);
//         return {
//             success: false
//         }
//     }

//     // todo: check aud, iss and token_use fields
//     // https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
//     const { exp, username } = payload;
//     const expiry = new Date(exp * 1000);
//     const now = new Date();

//     // If the access token is expired, refresh it and notify
//     if (expiry < now) {
//         const cachedResult = await AccessCache.getData(userId);
//         if (!cachedResult.found) {
//             logError(undefined, `User id not found in authorization cache, userId: ${userId}`);
//             return {
//                 success: false
//             }
//         }

//         const refreshToken = cachedResult.refreshToken;

//         //check whether the refresh token itself is expired
//         const accessTokenResult = await CognitoService.updateAccessToken(refreshToken);

//         if (!accessTokenResult.success) {
//             log(`Refresh token is expired for userId: ${userId}`);
//             return {
//                 success: false,
//                 refreshTokenExpired: true
//             }
//         }
//         log(`Refreshed access token for user: ${userId}`);

//         return {
//             success: true,
//             accessTokenRefresh: true,
//             accessToken: accessTokenResult.accessToken,
//             username,
//         }
//     }

//     try {
//         const isSignatureValid = await verifyJsonWebTokenSignature(accessToken, jwk as JWK);

//         if (!isSignatureValid) {
//             logError(undefined, `Undefined jwt payload (invalid signature), token: ${accessToken}`);
//             return {
//                 success: false
//             }
//         }
//     } catch (err: any) {
//         logError(err, err.toString());
//         return {
//             success: false
//         }
//     }

//     return {
//         success: true,
//         accessTokenRefresh: false,
//         username,
//     }
// }

// export const getUserProfile = async (accessToken: string): Promise<UserProfileCheckResult> => {
//     const verification = await verifyAccessToken(accessToken);

//     if (!verification.success) {
//         logError(undefined, `Failed to verify access token`);
//         return {
//             success: false,
//             accessTokenRefresh: false
//         }
//     }
//     const cachedResult = await AccessCache.getData(verification.username);
//     if (!cachedResult.found) {
//         return {
//             success: false,
//             accessTokenRefresh: false
//         }
//     }

//     const cachedUser = cachedResult.userProfile;
//     const result = {
//         success: true,
//         email: cachedUser.email,
//         name: cachedUser.name,
//         lastLogin: cachedUser.lastLogin,
//         position: cachedUser.position,
//         phoneNumber: cachedUser.phoneNumber,
//         tags: cachedUser.tags,
//     }
//     if (verification.accessTokenRefresh) {
//         return {
//             ...result,
//             accessTokenRefresh: true,
//             accessToken: verification.accessToken
//         }
//     }

//     return {
//         ...result,
//         accessTokenRefresh: false
//     };


// }