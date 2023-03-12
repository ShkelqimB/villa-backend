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
exports.validateRequest = exports.wrapAsyncError = void 0;
const constants_1 = require("../constants");
const express_validator_1 = require("express-validator");
const { http } = constants_1.constants; // extracting http constant from constants object
const wrapAsyncError = (handler) => {
    const wrapper = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(`${new Date()}, path: ${req.path}, status: ${res.statusCode}`);
            return yield handler(req, res, next);
        }
        catch (error) {
            console.log(error);
            res
                .status(error.status || http.server)
                .send({ error: error.message || error });
        }
    });
    return wrapper;
};
exports.wrapAsyncError = wrapAsyncError;
const validateRequest = () => (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // get first error to avoid too much information leakage;
        const error = errors.array()[0].msg;
        return res.status(http.badRequest).send({ error });
    }
    return next();
};
exports.validateRequest = validateRequest;
