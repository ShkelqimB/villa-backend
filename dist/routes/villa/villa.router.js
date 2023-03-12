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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillaRouter = void 0;
const express_1 = require("../../helpers/express");
const constants_1 = require("../../constants");
const express_2 = require("express");
const services_1 = require("../../services");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_2.Router)({ mergeParams: true });
const { ENV, http } = constants_1.constants;
const storage = multer_1.default.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({
    storage: storage
});
// GET all villas
router.get("/", 
// validateVillaRoutes('get-all-providers'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = req.query;
    const allVillas = yield services_1.VillaService.getAllVillas(limit);
    return res.status(http.ok).send(allVillas);
})));
// GET specific villa by ID
router.get("/:id", 
// validateVillaRoutes('get-provider-accountId'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const villa = yield services_1.VillaService.getVillaById(+id);
    return res.status(http.ok).send(villa);
})));
// CREATE villa
router.post("/", upload.single('image'), 
// validateVillaRoutes('get-provider-slug'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
    const createdVilla = yield services_1.VillaService.createVilla(body, image);
    if (!createdVilla) {
        return res.sendStatus(http.badRequest);
    }
    return res.json(createdVilla);
})));
// UPDATE villa
router.put("/:id", upload.single('image'), 
// validateVillaRoutes('update-oidc-provider'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const body = req.body;
    const { id } = req.params;
    const image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname;
    const updatedUser = yield services_1.VillaService.updateVilla(+id, body, image);
    if (!updatedUser) {
        return res.sendStatus(http.badRequest);
    }
    return res.sendStatus(http.noContent);
})));
// DELETE villa
router.delete("/:id", 
// validateVillaRoutes('delete-provider'),
(0, express_1.validateRequest)(), (0, express_1.wrapAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedUser = yield services_1.VillaService.deleteVilla(+id);
    if (!deletedUser) {
        return res.sendStatus(http.badRequest);
    }
    return res.status(http.ok).send(deletedUser);
})));
exports.VillaRouter = router;
