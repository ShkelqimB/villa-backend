"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_router_1 = require("./authentication/authentication.router");
const client_router_1 = require("./client/client.router");
const expense_router_1 = require("./expense/expense.router");
const roll_payment_router_1 = require("./roll_payment/roll_payment.router");
const user_router_1 = require("./user/user.router");
const villa_router_1 = require("./villa/villa.router");
const BASE_ROUTE = '/api';
const router = express_1.default.Router();
router.use(`${BASE_ROUTE}/authentication`, authentication_router_1.AuthenticationRouter);
router.use(`${BASE_ROUTE}/client`, client_router_1.ClientRouter);
router.use(`${BASE_ROUTE}/user`, user_router_1.UserRouter);
router.use(`${BASE_ROUTE}/villa`, villa_router_1.VillaRouter);
router.use(`${BASE_ROUTE}/expense`, expense_router_1.ExpenseRouter);
router.use(`${BASE_ROUTE}/rollPayment`, roll_payment_router_1.RollPaymentRouter);
router.get(`/api/internal/v1.0/health/liveness`, (_req, res) => {
    res.send({ status: 'service is up...' });
});
exports.default = router;
