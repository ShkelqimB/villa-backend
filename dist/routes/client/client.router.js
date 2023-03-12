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
exports.ClientRouter = void 0;
const express_1 = require("../../helpers/express");
const constants_1 = require("../../constants");
const express_2 = require("express");
const services_1 = require("../../services");
const router = (0, express_2.Router)({ mergeParams: true });
const { ENV, http } = constants_1.constants;
// GET all clients
router.get("/", 
// validateClientRoutes('get-all-providers'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allClients = yield services_1.ClientService.getAllClients();
    return res.status(http.ok).send(allClients);
})));
// GET specific client by ID
router.get("/:id", 
// validateClientRoutes('get-provider-accountId'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = yield services_1.ClientService.getClientById(+id);
    return res.status(http.ok).send(client);
})));
// CREATE client
router.post("/", 
// validateClientRoutes('get-provider-slug'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const createdClient = yield services_1.ClientService.createClient(body);
    if (!createdClient) {
        return res.sendStatus(http.badRequest);
    }
    return res.json(createdClient);
})));
// UPDATE client
router.put("/:id", 
// validateClientRoutes('update-oidc-provider'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    const updatedUser = yield services_1.ClientService.updateClient(+id, body);
    if (!updatedUser) {
        return res.sendStatus(http.badRequest);
    }
    return res.sendStatus(http.noContent);
})));
// DELETE client
router.delete("/:id", 
// validateClientRoutes('delete-provider'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedUser = yield services_1.ClientService.deleteClient(+id);
    if (!deletedUser) {
        return res.sendStatus(http.badRequest);
    }
    return res.status(http.ok).send(deletedUser);
})));
exports.ClientRouter = router;
