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
exports.AuthenticationService = void 0;
const db_1 = require("../../db");
const jwt_1 = require("../../helpers/jwt");
exports.AuthenticationService = {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.db.User.findOne({ where: { email } });
            if (!user) {
                return {
                    success: false
                };
            }
            const isCorrectPassword = yield (0, jwt_1.correctPassword)(password, user === null || user === void 0 ? void 0 : user.password);
            if (!isCorrectPassword) {
                return {
                    success: false
                };
            }
            const result = (0, jwt_1.signToken)(user);
            return Object.assign(Object.assign({}, result), { success: true });
        });
    },
};
