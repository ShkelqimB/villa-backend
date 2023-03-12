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
exports.UserService = void 0;
const constants_1 = require("../../constants");
const index_1 = require("../../db/index");
const bcrypt_1 = require("bcrypt");
exports.UserService = {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.db.User.findAll();
            return user;
        });
    },
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.db.User.findOne({ where: { email } });
            return user;
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.db.User.findOne({ where: { id } });
            return user;
        });
    },
    updateUser(id, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPass = yield (0, bcrypt_1.hash)(values.password, constants_1.HASH_SALT);
            const [updatedUser] = yield index_1.db.User.update(Object.assign(Object.assign({}, values), { password: hashPass }), {
                where: { id }
            });
            if (updatedUser) {
                console.log(`Updated rows: ${updatedUser}`);
                return true;
            }
            else {
                console.log("User not found");
                return false;
            }
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findRowBeforeDeleted = yield index_1.db.User.findOne({
                where: { id },
            });
            if (findRowBeforeDeleted) {
                yield findRowBeforeDeleted.destroy(); // deletes the row
                return true;
            }
            return false;
        });
    },
    createUser(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPass = yield (0, bcrypt_1.hash)(value.password, constants_1.HASH_SALT);
            const user = {
                full_name: value.full_name,
                age: value.age,
                phone: value.phone,
                email: value.email,
                role: value.role,
                password: hashedPass
            };
            try {
                const createdUser = yield index_1.db.User.create(user);
                return createdUser;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
};
