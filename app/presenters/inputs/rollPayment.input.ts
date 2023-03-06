import { Client } from "../../db/models/client.model";
import { Villa } from "../../db/models/villa.model";

export interface RollPaymentInput {
    amount: number;
    checkin: string;
    checkout: string;
    no_prepayment: boolean;
    deposit: boolean;
    full_prepayment: boolean;

    villa: Villa;
    client: Client;
}

export interface Roll_Payment_Input {
    amount: number;
    checkin: string;
    checkout: string;
    no_prepayment: boolean;
    deposit: boolean;
    full_prepayment: boolean;

    client_id: number;
    villa_id: number;
}