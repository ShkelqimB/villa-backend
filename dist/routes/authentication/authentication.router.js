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
exports.AuthenticationRouter = void 0;
const express_1 = require("express");
const express_2 = require("../../helpers/express");
const constants_1 = require("../../constants");
const utils_1 = require("../../helpers/utils");
const services_1 = require("../../services");
const router = (0, express_1.Router)({ mergeParams: true });
const { http } = constants_1.constants;
router.post('/login', 
// validateAuthRoutes('login'),
(0, express_2.validateRequest)(), (0, express_2.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("🚀 ~ file: authentication.router.ts:19 ~ wrapAsyncError ~ req.body", req.body);
    const loginResult = yield services_1.AuthenticationService.login(email, password);
    if (!loginResult.success) {
        console.log(`${email} failed to logged in!`);
        return res.status(http.unauthorized).send('Wrong email or password!');
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    const cookieOptions = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true, // The browser will not access or modify the cookie
    };
    res.cookie('jwt', loginResult.token, { httpOnly: false, secure: false });
    console.log(`User ${email} logged in successfully!`);
    return res.status(http.ok).send(loginResult.user);
})));
router.post('/logout', 
// validateAuthRoutes('logout'),
(0, express_2.validateRequest)(), (0, express_2.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    const accessToken = (0, utils_1.getAccessTokenFromCookie)(req);
    if (!accessToken) {
        return res.status(http.badRequest).send('No Access token founded');
    }
    try {
        (0, utils_1.clearCookies)(req, res);
        console.log(`Logged out successfully!`);
        return res.status(http.noContent).send({});
    }
    catch (_a) {
        return res.sendStatus(http.badRequest);
    }
})));
exports.AuthenticationRouter = router;
