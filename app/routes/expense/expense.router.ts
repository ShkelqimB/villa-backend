import { HttpRequest, HttpResponse } from "../../types";
import { validateRequest, wrapAsyncError } from "../../helpers/express";
import { constants } from "../../constants";
import { Router } from "express";
import { ExpenseService } from "../../services";

const router = Router({ mergeParams: true });
const { http } = constants;

// GET all expenses
router.get(
    "/",
    // validateVillaRoutes('get-all-providers'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const expenses = await ExpenseService.getAllExpenses();
        return res.status(http.ok).send(expenses);
    })
);

// GET total expenses
router.get(
    "/total",
    // validateVillaRoutes('get-all-providers'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const expenses = await ExpenseService.getTotal();
        return res.status(http.ok).send(expenses);
    })
);

// GET specific expense by ID
router.get(
    "/:id",
    // validateVillaRoutes('get-provider-accountId'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { id } = req.params;
        const expense = await ExpenseService.getExpenseById(+id);
        return res.status(http.ok).send(expense);
    })
);

// CREATE expense
router.post(
    "/",
    // validateVillaRoutes('get-provider-slug'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const body = req.body;
        const createdExpense = await ExpenseService.createExpense(body);
        if (!createdExpense) {
            return res.sendStatus(http.badRequest);
        }
        return res.json(createdExpense);
    })
);

// UPDATE expense
router.put(
    "/:id",
    // validateVillaRoutes('update-oidc-provider'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const body = req.body;
        const { id } = req.params;

        const updatedExpense = await ExpenseService.updateExpense(+id, body);
        if (!updatedExpense) {
            return res.sendStatus(http.badRequest);
        }
        return res.sendStatus(http.noContent);
    })
);

// DELETE expense
router.delete(
    "/:id",
    // validateVillaRoutes('delete-provider'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { id } = req.params;
        const deletedExpense = await ExpenseService.deleteExpense(+id);
        if (!deletedExpense) {
            return res.sendStatus(http.badRequest);
        }
        return res.status(http.ok).send(deletedExpense);
    })
);

export const ExpenseRouter = router;
