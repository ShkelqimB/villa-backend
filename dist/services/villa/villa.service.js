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
exports.VillaService = void 0;
const db_1 = require("../../db");
const utils_1 = require("../../helpers/utils");
exports.VillaService = {
    getAllVillas(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const toNumber = (0, utils_1.convertStringToPositiveNumber)(limit);
            const villas = yield db_1.db.Villa.findAll({ limit: toNumber });
            return villas;
        });
    },
    getVillaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const villa = yield db_1.db.Villa.findOne({ where: { id } });
            return villa;
        });
    },
    getVillaByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const villa = yield db_1.db.Villa.findOne({ where: { email } });
            return villa;
        });
    },
    updateVilla(id, values, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const [updatedRow] = yield db_1.db.Villa.update(Object.assign(Object.assign({}, values), { image: image }), {
                where: { id },
            });
            if (updatedRow) {
                console.log(`Villa Updated rows: ${updatedRow}`);
                return true;
            }
            else {
                console.log("Villa not found");
                return false;
            }
        });
    },
    deleteVilla(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findRowBeforeDeleted = yield db_1.db.Villa.findOne({
                where: { id },
            });
            if (findRowBeforeDeleted) {
                yield findRowBeforeDeleted.destroy(); // deletes the row
                return true;
            }
            return false;
        });
    },
    createVilla(value, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const villa = {
                id: value.id,
                name: value.name,
                price: value.price,
                guests: value.guests,
                image: image
            };
            console.log("🚀 ~ file: villa.service.ts:57 ~ createVilla ~ villa:", villa);
            try {
                const createdVilla = (yield db_1.db.Villa.create(villa)).get({ plain: true });
                return createdVilla;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    },
};
