import { body } from 'express-validator';
import { Hash } from '../types';
import { nullValidator, runValidators, Validator } from "./index";

const validateLogin = () => [
    body('email', 'Email cannot be empty').not().isEmpty(),
    body('email', 'Email is invalid').isEmail().normalizeEmail(),
    body('password', 'Password cannot be empty').not().isEmpty()
];

const validateForgotPassword = () => [
    body('email', 'Email cannot be empty').not().isEmpty(),
    body('email', 'Email is invalid').isEmail().normalizeEmail()
]

const validateCheckToken = () => [
    body('token', 'Token cannot be empty').not().isEmpty()
];

const validateSetPassword = () => [
    body('token', 'Token cannot be empty').not().isEmpty(),
    body('password', 'Password cannot be empty').not().isEmpty()
];

const validators: Hash<Validator> = {
    'login': validateLogin,
    'logout': nullValidator,
    'forgot-password': validateForgotPassword,
    'check-token': validateCheckToken,
    'set-password': validateSetPassword
};

export const validateAuthRoutes = runValidators(validators);