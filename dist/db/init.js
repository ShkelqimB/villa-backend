"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("./models/user.model"));
const client_model_1 = __importDefault(require("./models/client.model"));
const expense_model_1 = __importDefault(require("./models/expense.model"));
const villa_model_1 = __importDefault(require("./models/villa.model"));
const roll_payment_model_1 = __importDefault(require("./models/roll_payment.model"));
const associateDatabase = (db) => {
    for (const modelKey in db) {
        if (db.hasOwnProperty(modelKey)) {
            const element = db[modelKey];
            if (element.associate) {
                element.associate(db);
            }
        }
    }
    return db;
};
exports.default = () => {
    const { JAWSDB_URL = '', MYSQL_USER = '', MYSQL_PASSWORD = '', MYSQL_HOST = '', MYSQL_DATABASE = '' } = process.env;
    console.log("🚀 ~ file: init.ts:24 ~ JAWSDB_URL:", JAWSDB_URL);
    console.log("🚀 ~ file: init.ts:24 ~ MYSQL_DATABASE:", MYSQL_DATABASE);
    console.log("🚀 ~ file: init.ts:24 ~ MYSQL_HOST:", MYSQL_HOST);
    console.log("🚀 ~ file: init.ts:24 ~ MYSQL_PASSWORD:", MYSQL_PASSWORD);
    console.log("🚀 ~ file: init.ts:24 ~ MYSQL_USER:", MYSQL_USER);
    let sequelize = new sequelize_1.Sequelize(JAWSDB_URL);
    sequelize
        .authenticate()
        .then(() => {
        console.log('Connection has been established successfully.');
    })
        .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    const db = {
        Sequelize: sequelize_1.Sequelize,
        sequelize,
        User: (0, user_model_1.default)(sequelize),
        Villa: (0, villa_model_1.default)(sequelize),
        Client: (0, client_model_1.default)(sequelize),
        Expense: (0, expense_model_1.default)(sequelize),
        Roll_Payment: (0, roll_payment_model_1.default)(sequelize),
    };
    return associateDatabase(db);
};
