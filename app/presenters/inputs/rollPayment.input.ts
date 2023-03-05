import { Client } from "../../db/models/client.model";
import { Villa } from "../../db/models/villa.model";

export interface RollPaymentInput {
    amount: number;
    guests: number;
    checkin: string;
    checkout: string;
    villa: Villa;
    client: Client;
}

export interface Roll_Payment_Input {
    amount: number;
    guests: number;
    checkin: string;
    checkout: string;
    client_id: number;
    villa_id: number;
}