import { HttpRequest, HttpResponse } from "../../types";
import { validateRequest, wrapAsyncError } from "../../helpers/express";
import { constants } from "../../constants";
import { Router } from "express";
import { VillaService } from "../../services";
import multer from "multer";

const router = Router({ mergeParams: true });
const { ENV, http } = constants;


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}`)
    }
})

const upload = multer({
    storage: storage
})

// GET all villas
router.get(
    "/",
    // validateVillaRoutes('get-all-providers'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { limit } = req.query;
        const allVillas = await VillaService.getAllVillas(limit);
        return res.status(http.ok).send(allVillas);
    })
);

// GET specific villa by ID
router.get(
    "/:id",
    // validateVillaRoutes('get-provider-accountId'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { id } = req.params;
        const villa = await VillaService.getVillaById(+id);
        return res.status(http.ok).send(villa);
    })
);

// CREATE villa
router.post(
    "/",
    upload.single('image'),
    // validateVillaRoutes('get-provider-slug'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const body = req.body;
        const image = req.file?.originalname;
        const createdVilla = await VillaService.createVilla(body, image);
        if (!createdVilla) {
            return res.sendStatus(http.badRequest);
        }
        return res.json(createdVilla);
    })
);

// UPDATE villa
router.put(
    "/:id",
    upload.single('image'),
    // validateVillaRoutes('update-oidc-provider'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const body = req.body;
        const { id } = req.params;
        const image = req.file?.originalname;

        const updatedUser = await VillaService.updateVilla(+id, body, image);
        if (!updatedUser) {
            return res.sendStatus(http.badRequest);
        }
        return res.sendStatus(http.noContent);
    })
);

// DELETE villa
router.delete(
    "/:id",
    // validateVillaRoutes('delete-provider'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { id } = req.params;
        const deletedUser = await VillaService.deleteVilla(+id);
        if (!deletedUser) {
            return res.sendStatus(http.badRequest);
        }
        return res.status(http.ok).send(deletedUser);
    })
);

export const VillaRouter = router;
