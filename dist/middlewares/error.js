"use strict";
// import { logError } from '../helpers/logger';
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, _req, res, _next) => {
    console.log(error);
    res.status(500)
        .send({
        error: "Something went wrong",
        details: error
    });
};
exports.default = errorHandler;
