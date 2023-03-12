import { db } from "../../db";
import { Villa } from "../../db/models/villa.model";
import { convertStringToPositiveNumber } from "../../helpers/utils";


export const VillaService = {
    async getAllVillas(limit: any): Promise<Villa[]> {
        const toNumber = convertStringToPositiveNumber(limit);
        const villas = await db.Villa.findAll<Villa>({ limit: toNumber });
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

    async updateVilla(id: number, values: Villa, image?: string): Promise<boolean> {
        const [updatedRow] = await db.Villa.update<Villa>({ ...values, image: image }, {
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

    async createVilla(value: Villa, image?: string): Promise<Villa | null> {
        const villa = {
            id: value.id,
            name: value.name,
            price: value.price,
            guests: value.guests,
            image: image
        };
        console.log("🚀 ~ file: villa.service.ts:57 ~ createVilla ~ villa:", villa)
        try {
            const createdVilla = (await db.Villa.create<Villa>(villa)).get({ plain: true });
            return createdVilla;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
