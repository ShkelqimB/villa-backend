"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.db = void 0;
const init_1 = __importDefault(require("./init"));
const Database = {
    get empty() {
        return {
            User: {},
            Client: {},
            Villa: {},
            Expense: {},
            Roll_Payment: {},
            sequelize: undefined,
            Sequelize: undefined,
        };
    }
};
exports.db = Database.empty;
const initializeDatabase = () => {
    exports.db = (0, init_1.default)();
};
exports.initializeDatabase = initializeDatabase;
