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
exports.UserRouter = void 0;
const express_1 = require("express");
const express_2 = require("../../helpers/express");
const user_validator_1 = require("../../validation/user.validator");
const constants_1 = require("../../constants");
const utils_1 = require("../../helpers/utils");
const services_1 = require("../../services");
const router = (0, express_1.Router)({ mergeParams: true });
const { http } = constants_1.constants;
// GET all users
router.get('/', (0, user_validator_1.validateUserRoutes)('get-users'), (0, express_2.validateRequest)(), (0, express_2.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield services_1.UserService.getAllUsers();
    return res.status(http.ok).send(allUsers);
})));
// Get user by Token
router.get('/me', (0, user_validator_1.validateUserRoutes)('get-users'), (0, express_2.validateRequest)(), (0, express_2.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, utils_1.getUserFromRequest)(req, res);
    return res.status(http.ok).send(user);
})));
// GET user by ID
router.get('/:id', (0, user_validator_1.validateUserRoutes)('get-users'), (0, express_2.validateRequest)(), (0, express_2.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usersById = yield services_1.UserService.getUserById(+id);
    if (!usersById) {
        return res.sendStatus(http.badRequest);
    }
    return res.status(http.ok).send(usersById);
})));
// create user
router.post('/', (0, user_validator_1.validateUserRoutes)('post-users'), (0, express_2.validateRequest)(), (0, express_2.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const createdUser = yield services_1.UserService.createUser(body);
    if (!createdUser) {
        return res.sendStatus(http.badRequest);
    }
    return res.json(createdUser);
})));
// Update user
router.put('/:id', 
// validateUserRoutes('put-users-email'),
(0, express_2.validateRequest)(), (0, express_2.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    const updatedUser = yield services_1.UserService.updateUser(+id, body);
    if (!updatedUser) {
        return res.sendStatus(http.badRequest);
    }
    return res.sendStatus(http.noContent);
})));
// Delete user
router.delete('/:id', (0, user_validator_1.validateUserRoutes)('get-user'), (0, express_2.validateRequest)(), (0, express_2.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedUser = yield services_1.UserService.deleteUser(+id);
    if (!deletedUser) {
        return res.sendStatus(http.badRequest);
    }
    return res.status(http.ok).send(deletedUser);
})));
exports.UserRouter = router;
