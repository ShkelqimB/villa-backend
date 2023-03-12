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
exports.validatePermission = void 0;
const constants_1 = require("../constants");
const { ENV, http } = constants_1.constants;
const { NODE_ENV = '~', ACCESS_TOKEN = '~' } = process.env;
const validatePermission = (permission, contextExtractor = findContext) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // If we're on local then on .env.local file we should have ACCESS_TOKEN='...access...'
        if (NODE_ENV === ENV.LOCAL) {
            req.cookies = {
                access: ACCESS_TOKEN
            };
        }
        const context = contextExtractor(req);
        const permitted = yield capua.checkPermission(permission, context, req);
        if (permitted) {
            return next();
        }
        else {
            log(`Access denied for permission ${permission} for ${context.type} - ${context.id}`);
            return res.sendStatus(http.forbidden);
        }
    }
    catch (error) {
        return res.status(error.status || http.server).send({ message: error.message });
    }
});
exports.validatePermission = validatePermission;
const findContext = (req) => {
    // try to find entity id from params
    const { params: { entityId } } = req;
    if (entityId) {
        return {
            id: +entityId,
            type: "entity"
        };
    }
    // try to find entity id from body
    const { body: { entityId: bodyEntityId } } = req;
    if (bodyEntityId) {
        return {
            id: +bodyEntityId,
            type: "entity"
        };
    }
    // try to find account id from params
    const { params: { accountId } } = req;
    if (accountId) {
        return {
            id: +accountId,
            type: "account"
        };
    }
    // try to find account id from body
    const { body: { accountId: bodyAccountId } } = req;
    if (bodyAccountId) {
        return {
            id: +bodyAccountId,
            type: "account"
        };
    }
    // no entity or account id, assume admin level vatbox
    return {
        id: -1,
        type: "vatbox"
    };
};
