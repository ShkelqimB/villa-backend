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
exports.ExpenseRouter = void 0;
const express_1 = require("../../helpers/express");
const constants_1 = require("../../constants");
const express_2 = require("express");
const services_1 = require("../../services");
const router = (0, express_2.Router)({ mergeParams: true });
const { http } = constants_1.constants;
// GET all expenses
router.get("/", 
// validateVillaRoutes('get-all-providers'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = req.query;
    const expenses = yield services_1.ExpenseService.getAllExpenses(limit);
    return res.status(http.ok).send(expenses);
})));
// GET total expenses
router.get("/total", 
// validateVillaRoutes('get-all-providers'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expenses = yield services_1.ExpenseService.getTotal();
    return res.status(http.ok).send(expenses);
})));
// GET specific expense by ID
router.get("/:id", 
// validateVillaRoutes('get-provider-accountId'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const expense = yield services_1.ExpenseService.getExpenseById(+id);
    return res.status(http.ok).send(expense);
})));
// CREATE expense
router.post("/", 
// validateVillaRoutes('get-provider-slug'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const createdExpense = yield services_1.ExpenseService.createExpense(body);
    if (!createdExpense) {
        return res.sendStatus(http.badRequest);
    }
    return res.json(createdExpense);
})));
// UPDATE expense
router.put("/:id", 
// validateVillaRoutes('update-oidc-provider'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    const updatedExpense = yield services_1.ExpenseService.updateExpense(+id, body);
    if (!updatedExpense) {
        return res.sendStatus(http.badRequest);
    }
    return res.sendStatus(http.noContent);
})));
// DELETE expense
router.delete("/:id", 
// validateVillaRoutes('delete-provider'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedExpense = yield services_1.ExpenseService.deleteExpense(+id);
    if (!deletedExpense) {
        return res.sendStatus(http.badRequest);
    }
    return res.status(http.ok).send(deletedExpense);
})));
exports.ExpenseRouter = router;
