import { HttpRequest, HttpResponse } from "../../types";
import { validateRequest, wrapAsyncError } from "../../helpers/express";
import { constants } from "../../constants";
import { Router } from "express";
import { ClientService } from "../../services";

const router = Router({ mergeParams: true });
const { ENV, http } = constants;

// GET all clients
router.get(
    "/",
    // validateClientRoutes('get-all-providers'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const allClients = await ClientService.getAllClients();
        return res.status(http.ok).send(allClients);
    })
);

// GET specific client by ID
router.get(
    "/:id",
    // validateClientRoutes('get-provider-accountId'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { id } = req.params;
        const client = await ClientService.getClientById(+id);
        return res.status(http.ok).send(client);
    })
);

// CREATE client
router.post(
    "/",
    // validateClientRoutes('get-provider-slug'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const body = req.body;
        const createdClient = await ClientService.createClient(body);
        if (!createdClient) {
            return res.sendStatus(http.badRequest);
        }
        return res.json(createdClient);
    })
);

// UPDATE client
router.put(
    "/:id",
    // validateClientRoutes('update-oidc-provider'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const body = req.body;
        const { id } = req.params;

        const updatedUser = await ClientService.updateClient(+id, body);
        if (!updatedUser) {
            return res.sendStatus(http.badRequest);
        }
        return res.sendStatus(http.noContent);
    })
);

// DELETE client
router.delete(
    "/:id",
    // validateClientRoutes('delete-provider'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { id } = req.params;
        const deletedUser = await ClientService.deleteClient(+id);
        if (!deletedUser) {
            return res.sendStatus(http.badRequest);
        }
        return res.status(http.ok).send(deletedUser);
    })
);

export const ClientRouter = router;
