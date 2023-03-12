"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserRoutes = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("./index");
const validateLogin = () => [
    (0, express_validator_1.body)('email', 'Email cannot be empty').not().isEmpty(),
    (0, express_validator_1.body)('email', 'Email is invalid').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password', 'Password cannot be empty').not().isEmpty()
];
const validateForgotPassword = () => [
    (0, express_validator_1.body)('email', 'Email cannot be empty').not().isEmpty(),
    (0, express_validator_1.body)('email', 'Email is invalid').isEmail().normalizeEmail()
];
const validateCheckToken = () => [
    (0, express_validator_1.body)('token', 'Token cannot be empty').not().isEmpty()
];
const validateSetPassword = () => [
    (0, express_validator_1.body)('token', 'Token cannot be empty').not().isEmpty(),
    (0, express_validator_1.body)('password', 'Password cannot be empty').not().isEmpty()
];
const validators = {
    'login': validateLogin,
    'logout': index_1.nullValidator,
    'forgot-password': validateForgotPassword,
    'check-token': validateCheckToken,
    'set-password': validateSetPassword
};
exports.validateUserRoutes = (0, index_1.runValidators)(validators);
