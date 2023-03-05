import { HttpRequest, HttpResponse } from "../../types";
import { validateRequest, wrapAsyncError } from "../../helpers/express";
import { constants } from "../../constants";
import { Router } from "express";
import { RollPaymentService } from "../../services/roll_payment/roll_payment.service";
import { RollPaymentInput } from "../../presenters/inputs/rollPayment.input";

const router = Router({ mergeParams: true });
const { ENV, http } = constants;

// GET all rollPayments
router.get(
    "/",
    // validateRollPaymentRoutes('get-all-providers'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const allRollPayments = await RollPaymentService.getAllRollPayment();
        return res.status(http.ok).send(allRollPayments);
    })
);

// GET income by booking
router.get(
    "/income",
    // validateRollPaymentRoutes('get-provider-accountId'),
    validateRequest(),
    wrapAsyncError(async (_req: HttpRequest, res: HttpResponse) => {
        const RollPayment = await RollPaymentService.getIncome();
        return res.status(http.ok).send(RollPayment);
    })
);

// GET specific RollPayment by ID
router.get(
    "/:id",
    // validateRollPaymentRoutes('get-provider-accountId'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { id } = req.params;
        const RollPayment = await RollPaymentService.getRollPaymentById(+id);
        return res.status(http.ok).send(RollPayment);
    })
);

// CREATE RollPayment
router.post(
    "/",
    // validateRollPaymentRoutes('get-provider-slug'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const body: RollPaymentInput = req.body;
        const createdRollPayment = await RollPaymentService.createRollPayment(body);
        console.log("🚀 ~ file: roll_payment.router.ts:53 ~ wrapAsyncError ~ createdRollPayment:", createdRollPayment)
        if (!createdRollPayment && createdRollPayment === undefined && createdRollPayment === null) {
            return res.sendStatus(http.badRequest);
        }
        return res.json(createdRollPayment);
    })
);

// UPDATE RollPayment
router.put(
    "/:id",
    // validateRollPaymentRoutes('update-oidc-provider'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const body = req.body;
        const { id } = req.params;

        const updatedUser = await RollPaymentService.updateRollPayment(+id, body);
        if (!updatedUser) {
            return res.sendStatus(http.badRequest);
        }
        return res.sendStatus(http.noContent);
    })
);

// DELETE RollPayment
router.delete(
    "/:id",
    // validateRollPaymentRoutes('delete-provider'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { id } = req.params;
        const deletedUser = await RollPaymentService.deleteRollPayment(+id);
        if (!deletedUser) {
            return res.sendStatus(http.badRequest);
        }
        return res.status(http.ok).send(deletedUser);
    })
);

export const RollPaymentRouter = router;
