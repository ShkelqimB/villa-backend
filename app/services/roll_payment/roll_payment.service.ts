import { db } from "../../db";
import { Client } from "../../db/models/client.model";
import { Roll_Payment } from "../../db/models/roll_payment.model";
import { convertStringToPositiveNumber } from "../../helpers/utils";
import { RollPaymentInput } from "../../presenters/inputs/rollPayment.input";

export const RollPaymentService = {
    async getAllRollPayment(limit: any): Promise<Roll_Payment[]> {
        const toNumber = convertStringToPositiveNumber(limit);
        const rollPayments = await db.Roll_Payment.findAll<Roll_Payment>({
            include: [{
                model: db.Client,
                attributes: ['id', 'full_name', 'email', 'phone', 'guests'],
                as: 'client'
            }, {
                model: db.Villa,
                attributes: ['id', 'name', 'price', 'guests', 'image'],
                as: 'villa'
            }],
            limit: toNumber,
        });
        return rollPayments;
    },

    async getRollPaymentById(id: number): Promise<Roll_Payment | null> {
        const roll_Payment = await db.Roll_Payment.findOne<Roll_Payment>({
            where: { id }, include: [{
                model: db.Client,
                attributes: ['id', 'full_name', 'email', 'phone', 'guests'],
                as: 'client'
            }, {
                model: db.Villa,
                attributes: ['id', 'name', 'price', 'guests', 'image'],
                as: 'villa'
            }],
        });
        return roll_Payment;
    },

    async getIncome(): Promise<any> {
        const rollPayments = await db.Roll_Payment.findOne({
            attributes: [[db.sequelize.fn('sum', db.sequelize.col('amount')), 'total']]
        });
        return rollPayments;
    },

    async getRollPaymentByEmail(email: string): Promise<Roll_Payment | null> {
        const Roll_Payment = await db.Roll_Payment.findOne<Roll_Payment>({
            where: { email }, include: [{
                model: db.Client,
                attributes: ['id', 'full_name', 'email', 'phone', 'guests'],
                as: 'client'
            }, {
                model: db.Villa,
                attributes: ['id', 'name', 'price', 'guests', 'image'],
                as: 'villa'
            }],
        });
        return Roll_Payment;
    },

    async updateRollPayment(id: number, values: Roll_Payment): Promise<boolean> {
        const { client, villa, amount, checkin, checkout, no_prepayment, deposit, full_prepayment } = values;
        const Client = {
            full_name: client.full_name,
            email: client.email,
            phone: client.phone,
            guests: client.guests
        };
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            // 1. Update Client
            await db.Client.update<Client>(Client, {
                where: { id: client.id }, transaction
            },);
            const fullObj = {
                client_id: client?.id,
                villa_id: villa?.id,
                amount, checkin, checkout, no_prepayment, deposit, full_prepayment,
            }
            // 2. Update Roll_Payment
            await db.Roll_Payment.update<Roll_Payment>(fullObj, { where: { id }, transaction });
            // 3. Transaction commit
            await transaction.commit();
            console.log('Successfully updated existed roll_payment');
            return true;
        } catch (error) {
            console.log(error);
            if (transaction) {
                await transaction.rollback();
            }
            return false;
        }
    },

    async deleteRollPayment(id: number): Promise<boolean> {
        const findRowBeforeDeleted = await db.Roll_Payment.findOne<Roll_Payment>({
            where: { id },
        });

        if (findRowBeforeDeleted) {
            await findRowBeforeDeleted.destroy(); // deletes the row
            return true;
        }
        return false;
    },

    async createRollPayment(values: RollPaymentInput): Promise<Roll_Payment | null | undefined> {
        const { client, villa, amount, checkin, checkout, no_prepayment, deposit, full_prepayment } = values;
        const Client = {
            full_name: client.full_name,
            email: client.email,
            phone: client.phone,
            guests: client.guests
        };
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            // 1. Create Client
            const createdClient = await db.Client.create<Client>(Client, { transaction });
            const fullObj = {
                client_id: createdClient.id,
                villa_id: villa.id,
                amount, checkin, checkout, no_prepayment, deposit, full_prepayment,
            }
            // 2. Create Roll_Payment
            const createdRollPayment = await db.Roll_Payment.create<Roll_Payment>(fullObj, { transaction });
            // 3. Transaction commit
            await transaction.commit();
            console.log('Successfully created new roll_payment');
            return {
                ...createdRollPayment.dataValues,
                client: {
                    ...createdClient.dataValues,
                },
                villa: { ...villa }
            };
        } catch (error) {
            console.log(error);
            if (transaction) {
                await transaction.rollback();
            }
        }
    },
};
