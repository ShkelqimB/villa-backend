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
exports.RollPaymentRouter = void 0;
const express_1 = require("../../helpers/express");
const constants_1 = require("../../constants");
const express_2 = require("express");
const roll_payment_service_1 = require("../../services/roll_payment/roll_payment.service");
const router = (0, express_2.Router)({ mergeParams: true });
const { ENV, http } = constants_1.constants;
// GET all rollPayments
router.get("/", 
// validateRollPaymentRoutes('get-all-providers'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = req.query;
    const allRollPayments = yield roll_payment_service_1.RollPaymentService.getAllRollPayment(limit);
    return res.status(http.ok).send(allRollPayments);
})));
// GET income by booking
router.get("/income", 
// validateRollPaymentRoutes('get-provider-accountId'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const RollPayment = yield roll_payment_service_1.RollPaymentService.getIncome();
    return res.status(http.ok).send(RollPayment);
})));
// GET specific RollPayment by ID
router.get("/:id", 
// validateRollPaymentRoutes('get-provider-accountId'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const RollPayment = yield roll_payment_service_1.RollPaymentService.getRollPaymentById(+id);
    return res.status(http.ok).send(RollPayment);
})));
// CREATE RollPayment
router.post("/", 
// validateRollPaymentRoutes('get-provider-slug'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const createdRollPayment = yield roll_payment_service_1.RollPaymentService.createRollPayment(body);
    console.log("🚀 ~ file: roll_payment.router.ts:53 ~ wrapAsyncError ~ createdRollPayment:", createdRollPayment);
    if (!createdRollPayment && createdRollPayment === undefined && createdRollPayment === null) {
        return res.sendStatus(http.badRequest);
    }
    return res.json(createdRollPayment);
})));
// UPDATE RollPayment
router.put("/:id", 
// validateRollPaymentRoutes('update-oidc-provider'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    const updatedUser = yield roll_payment_service_1.RollPaymentService.updateRollPayment(+id, body);
    if (!updatedUser) {
        return res.sendStatus(http.badRequest);
    }
    return res.sendStatus(http.noContent);
})));
// DELETE RollPayment
router.delete("/:id", 
// validateRollPaymentRoutes('delete-provider'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedUser = yield roll_payment_service_1.RollPaymentService.deleteRollPayment(+id);
    if (!deletedUser) {
        return res.sendStatus(http.badRequest);
    }
    return res.status(http.ok).send(deletedUser);
})));
exports.RollPaymentRouter = router;
