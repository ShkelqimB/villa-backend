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
exports.RollPaymentService = void 0;
const db_1 = require("../../db");
const utils_1 = require("../../helpers/utils");
exports.RollPaymentService = {
    getAllRollPayment(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const toNumber = (0, utils_1.convertStringToPositiveNumber)(limit);
            const rollPayments = yield db_1.db.Roll_Payment.findAll({
                include: [{
                        model: db_1.db.Client,
                        attributes: ['id', 'full_name', 'email', 'phone', 'guests'],
                        as: 'client'
                    }, {
                        model: db_1.db.Villa,
                        attributes: ['id', 'name', 'price', 'guests', 'image'],
                        as: 'villa'
                    }],
                limit: toNumber,
            });
            return rollPayments;
        });
    },
    getRollPaymentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const roll_Payment = yield db_1.db.Roll_Payment.findOne({
                where: { id }, include: [{
                        model: db_1.db.Client,
                        attributes: ['id', 'full_name', 'email', 'phone', 'guests'],
                        as: 'client'
                    }, {
                        model: db_1.db.Villa,
                        attributes: ['id', 'name', 'price', 'guests', 'image'],
                        as: 'villa'
                    }],
            });
            return roll_Payment;
        });
    },
    getIncome() {
        return __awaiter(this, void 0, void 0, function* () {
            const rollPayments = yield db_1.db.Roll_Payment.findOne({
                attributes: [[db_1.db.sequelize.fn('sum', db_1.db.sequelize.col('amount')), 'total']]
            });
            return rollPayments;
        });
    },
    getRollPaymentByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const Roll_Payment = yield db_1.db.Roll_Payment.findOne({
                where: { email }, include: [{
                        model: db_1.db.Client,
                        attributes: ['id', 'full_name', 'email', 'phone', 'guests'],
                        as: 'client'
                    }, {
                        model: db_1.db.Villa,
                        attributes: ['id', 'name', 'price', 'guests', 'image'],
                        as: 'villa'
                    }],
            });
            return Roll_Payment;
        });
    },
    updateRollPayment(id, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const { client, villa, amount, checkin, checkout, no_prepayment, deposit, full_prepayment } = values;
            const Client = {
                full_name: client.full_name,
                email: client.email,
                phone: client.phone,
                guests: client.guests
            };
            let transaction;
            try {
                transaction = yield db_1.db.sequelize.transaction();
                // 1. Update Client
                yield db_1.db.Client.update(Client, {
                    where: { id: client.id }, transaction
                });
                const fullObj = {
                    client_id: client === null || client === void 0 ? void 0 : client.id,
                    villa_id: villa === null || villa === void 0 ? void 0 : villa.id,
                    amount, checkin, checkout, no_prepayment, deposit, full_prepayment,
                };
                // 2. Update Roll_Payment
                yield db_1.db.Roll_Payment.update(fullObj, { where: { id }, transaction });
                // 3. Transaction commit
                yield transaction.commit();
                console.log('Successfully updated existed roll_payment');
                return true;
            }
            catch (error) {
                console.log(error);
                if (transaction) {
                    yield transaction.rollback();
                }
                return false;
            }
        });
    },
    deleteRollPayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findRowBeforeDeleted = yield db_1.db.Roll_Payment.findOne({
                where: { id },
            });
            if (findRowBeforeDeleted) {
                yield findRowBeforeDeleted.destroy(); // deletes the row
                return true;
            }
            return false;
        });
    },
    createRollPayment(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const { client, villa, amount, checkin, checkout, no_prepayment, deposit, full_prepayment } = values;
            const Client = {
                full_name: client.full_name,
                email: client.email,
                phone: client.phone,
                guests: client.guests
            };
            let transaction;
            try {
                transaction = yield db_1.db.sequelize.transaction();
                // 1. Create Client
                const createdClient = yield db_1.db.Client.create(Client, { transaction });
                const fullObj = {
                    client_id: createdClient.id,
                    villa_id: villa.id,
                    amount, checkin, checkout, no_prepayment, deposit, full_prepayment,
                };
                // 2. Create Roll_Payment
                const createdRollPayment = yield db_1.db.Roll_Payment.create(fullObj, { transaction });
                // 3. Transaction commit
                yield transaction.commit();
                console.log('Successfully created new roll_payment');
                return Object.assign(Object.assign({}, createdRollPayment.dataValues), { client: Object.assign({}, createdClient.dataValues), villa: Object.assign({}, villa) });
            }
            catch (error) {
                console.log(error);
                if (transaction) {
                    yield transaction.rollback();
                }
            }
        });
    },
};
