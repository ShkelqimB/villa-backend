import { db } from "../../db";
import { Client } from "../../db/models/client.model";
import { Roll_Payment } from "../../db/models/roll_payment.model";
import { RollPaymentInput } from "../../presenters/inputs/rollPayment.input";

export const RollPaymentService = {
    async getAllRollPayment(): Promise<Roll_Payment[]> {
        const rollPayments = await db.Roll_Payment.findAll<Roll_Payment>({
            include: [{
                model: db.Client,
                attributes: ['id', 'full_name', 'email'],
                as: 'client'
            }, {
                model: db.Villa,
                attributes: ['id', 'name', 'price', 'guests'],
                as: 'villa'
            }],
        });
        return rollPayments;
    },

    async getRollPaymentById(id: number): Promise<Roll_Payment | null> {
        const roll_Payment = await db.Roll_Payment.findOne<Roll_Payment>({
            where: { id }, include: [{
                model: db.Client,
                attributes: ['id', 'full_name', 'email'],
                as: 'client'
            }, {
                model: db.Villa,
                attributes: ['id', 'name', 'price', 'guests'],
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
                attributes: ['id', 'full_name', 'email'],
                as: 'client'
            }, {
                model: db.Villa,
                attributes: ['id', 'name', 'price', 'guests'],
                as: 'villa'
            }],
        });
        return Roll_Payment;
    },

    async updateRollPayment(id: number, values: Roll_Payment): Promise<boolean> {
        const [updatedRow] = await db.Roll_Payment.update<Roll_Payment>(values, {
            where: { id },
        });

        if (updatedRow) {
            console.log(`Roll_Payment Updated rows: ${updatedRow}`);
            return true;
        } else {
            console.log("Roll_Payment not found");
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

    async createRollPayment(values: RollPaymentInput): Promise<Roll_Payment | undefined> {
        console.log("🚀 ~ file: roll_payment.service.ts:61 ~ createRollPayment ~ values:", values)
        const { client, villa, amount, checkin, checkout, guests } = values;
        const Client = {
            full_name: client.full_name,
            email: client.email,
            phone: client.phone
        };
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            // 1. Create Client
            // const createdClient = await (await db.Client.create<Client>(Client, { transaction })).get({ plain: true });
            const createdClient = await db.Client.create<Client>(Client, { transaction });
            const fullObj = {
                amount, checkin, checkout, guests,
                client_id: createdClient.id,
                villa_id: villa.id
            }
            console.log("🚀 ~ file: roll_payment.service.ts:74 ~ createRollPayment ~ fullObj:", fullObj)
            // 2. Create Roll_Payment
            const createdRollPayment = await db.Roll_Payment.create<Roll_Payment>(fullObj, { transaction });
            // 3. Transaction commit
            await transaction.commit();
            console.log('Successfully created new roll_payment');
            return createdRollPayment;
        } catch (error) {
            console.log(error);
            if (transaction) {
                await transaction.rollback();
            }
        }
    },
};
