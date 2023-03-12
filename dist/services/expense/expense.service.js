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
exports.ExpenseService = void 0;
const db_1 = require("../../db");
const utils_1 = require("../../helpers/utils");
exports.ExpenseService = {
    getAllExpenses(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const toNumber = (0, utils_1.convertStringToPositiveNumber)(limit);
            const expenses = yield db_1.db.Expense.findAll({ limit: toNumber });
            return expenses;
        });
    },
    getTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            const expenses = yield db_1.db.Expense.findOne({
                attributes: [[db_1.db.sequelize.fn('sum', db_1.db.sequelize.col('total')), 'total']]
            });
            return expenses;
        });
    },
    getExpenseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield db_1.db.Expense.findOne({ where: { id } });
            return expense;
        });
    },
    getExpenseByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = yield db_1.db.Expense.findOne({ where: { email } });
            return expense;
        });
    },
    updateExpense(id, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const [updatedRow] = yield db_1.db.Expense.update(values, {
                where: { id },
            });
            if (updatedRow) {
                console.log(`Expense Updated rows: ${updatedRow}`);
                return true;
            }
            else {
                console.log("Expense not found");
                return false;
            }
        });
    },
    deleteExpense(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findRowBeforeDeleted = yield db_1.db.Expense.findOne({
                where: { id },
            });
            if (findRowBeforeDeleted) {
                yield findRowBeforeDeleted.destroy(); // deletes the row
                return true;
            }
            return false;
        });
    },
    createExpense(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = {
                name: value.name,
                description: value.description,
                date: value.date,
                total: value.total,
            };
            try {
                const createdVilla = (yield db_1.db.Expense.create(expense)).get({ plain: true });
                console.log("🚀 ~ file: expense.service.ts:57 ~ createExpense ~ createdVilla", createdVilla);
                return createdVilla;
            }
            catch (error) {
                console.log("🚀 ~ file: expense.service.ts:60 ~ createExpense ~ error", error);
                return error.message;
            }
        });
    },
};
