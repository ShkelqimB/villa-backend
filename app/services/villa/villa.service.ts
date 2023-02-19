import { db } from "../../db";
import { randomBytes } from "crypto";
import { Villa } from "../../db/models/villa.model";

export const VillaService = {
    async getAllVillas(): Promise<Villa[]> {
        const villas = await db.Villa.findAll<Villa>();
        return villas;
    },

    async getVillaById(id: number): Promise<Villa | null> {
        const villa = await db.Villa.findOne<Villa>({ where: { id } });
        return villa;
    },

    async getVillaByEmail(email: string): Promise<Villa | null> {
        const villa = await db.Villa.findOne<Villa>({ where: { email } });
        return villa;
    },

    async updateVilla(id: number, values: Villa): Promise<boolean> {
        const [updatedRow] = await db.Villa.update<Villa>(values, {
            where: { id },
        });

        if (updatedRow) {
            console.log(`Villa Updated rows: ${updatedRow}`);
            return true;
        } else {
            console.log("Villa not found");
            return false;
        }
    },

    async deleteVilla(id: number): Promise<boolean> {
        const findRowBeforeDeleted = await db.Villa.findOne<Villa>({
            where: { id },
        });

        if (findRowBeforeDeleted) {
            await findRowBeforeDeleted.destroy(); // deletes the row
            return true;
        }
        return false;
    },

    async createVilla(value: Villa): Promise<Villa | null> {
        const villa = {
            id: value.id,
            name: value.name,
            price: value.price,
            guests: value.guests,
        };
        try {
            const createdVilla = (await db.Villa.create<Villa>(villa)).get({ plain: true });
            return createdVilla;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
