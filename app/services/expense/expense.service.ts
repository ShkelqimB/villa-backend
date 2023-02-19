import { db } from '../../db';
import { randomBytes } from "crypto";
import { Expense } from '../../db/models/expense.model';

export const ExpenseService = {
    async getAllExpenses(): Promise<Expense[]> {
        const expenses = await db.Expense.findAll<Expense>();
        return expenses;
    },

    async getExpenseById(id: number): Promise<Expense | null> {
        const expense = await db.Expense.findOne<Expense>({ where: { id } });
        return expense;
    },

    async getExpenseByEmail(email: string): Promise<Expense | null> {
        const expense = await db.Expense.findOne<Expense>({ where: { email } });
        return expense;
    },

    async updateExpense(id: number, values: Expense): Promise<boolean> {
        const [updatedRow] = await db.Expense.update<Expense>(values, {
            where: { id }
        });

        if (updatedRow) {
            console.log(`Expense Updated rows: ${updatedRow}`);
            return true;
        } else {
            console.log('Expense not found');
            return false;
        }
    },

    async deleteExpense(id: number): Promise<boolean> {
        const findRowBeforeDeleted = await db.Expense.findOne<Expense>({
            where: { id },
        });

        if (findRowBeforeDeleted) {
            await findRowBeforeDeleted.destroy() // deletes the row
            return true;
        }
        return false;
    },

    async createExpense(value: Expense): Promise<Expense | null> {
        // const villa = {
        //     id: value.id,
        //     name: value.name,
        //     from: value.from,
        //     to: value.to,
        //     price: value.price
        // }
        // try {
        //     const createdVilla = await db.Expense.create<Expense>(villa)
        //     return createdVilla;
        // } catch (error) {
        //     console.log(error);
        return null;
        // }
    }
}
