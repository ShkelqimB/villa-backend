"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runValidators = exports.nullValidator = void 0;
const nullValidator = () => [];
exports.nullValidator = nullValidator;
const runValidators = (validators) => (route) => (validators[route] || exports.nullValidator)();
exports.runValidators = runValidators;
