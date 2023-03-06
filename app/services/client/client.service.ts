import { db } from "../../db";
import { Client } from "../../db/models/client.model";

export const ClientService = {
    async getAllClients(): Promise<Client[]> {
        const clients = await db.Client.findAll<Client>();
        return clients;
    },

    async getClientById(id: number): Promise<Client | null> {
        const client = await db.Client.findOne<Client>({ where: { id } });
        return client;
    },

    async getClientByEmail(email: string): Promise<Client | null> {
        const client = await db.Client.findOne<Client>({ where: { email } });
        return client;
    },

    async updateClient(id: number, values: Client): Promise<boolean> {
        const [updatedRow] = await db.Client.update<Client>(values, {
            where: { id },
        });

        if (updatedRow) {
            console.log(`Client Updated rows: ${updatedRow}`);
            return true;
        } else {
            console.log("Client not found");
            return false;
        }
    },

    async deleteClient(id: number): Promise<boolean> {
        const findRowBeforeDeleted = await db.Client.findOne<Client>({
            where: { id },
        });

        if (findRowBeforeDeleted) {
            await findRowBeforeDeleted.destroy(); // deletes the row
            return true;
        }
        return false;
    },

    async createClient(value: Client): Promise<Client | null> {
        const client = {
            id: value.id,
            full_name: value.id,
            email: value.email,
            phone: value.phone,
            guests: value.guests
        };
        try {
            const createdClient = (await db.Client.create<Client>(client)).get({ plain: true });
            return createdClient;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
