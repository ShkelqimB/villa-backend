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
exports.ClientService = void 0;
const db_1 = require("../../db");
exports.ClientService = {
    getAllClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield db_1.db.Client.findAll();
            return clients;
        });
    },
    getClientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield db_1.db.Client.findOne({ where: { id } });
            return client;
        });
    },
    getClientByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield db_1.db.Client.findOne({ where: { email } });
            return client;
        });
    },
    updateClient(id, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const [updatedRow] = yield db_1.db.Client.update(values, {
                where: { id },
            });
            if (updatedRow) {
                console.log(`Client Updated rows: ${updatedRow}`);
                return true;
            }
            else {
                console.log("Client not found");
                return false;
            }
        });
    },
    deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findRowBeforeDeleted = yield db_1.db.Client.findOne({
                where: { id },
            });
            if (findRowBeforeDeleted) {
                yield findRowBeforeDeleted.destroy(); // deletes the row
                return true;
            }
            return false;
        });
    },
    createClient(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = {
                id: value.id,
                full_name: value.id,
                email: value.email,
                phone: value.phone,
                guests: value.guests
            };
            try {
                const createdClient = (yield db_1.db.Client.create(client)).get({ plain: true });
                return createdClient;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    },
};
