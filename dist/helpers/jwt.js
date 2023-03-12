"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.correctPassword = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_SECRET = '~', JWT_EXPIRES_IN = +'', JWT_COOKIE_EXPIRES_IN = +'~' } = process.env;
const correctPassword = (candidatePassword, userPassword) => {
    return (0, bcrypt_1.compare)(candidatePassword, userPassword);
};
exports.correctPassword = correctPassword;
const signToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
    return {
        token,
        user
    };
};
exports.signToken = signToken;
