import { Router } from 'express';
import { HttpRequest, HttpResponse } from '../../types';
import { validateRequest, wrapAsyncError } from '../../helpers/express';
import { validateUserRoutes } from '../../validation/user.validator';
import { constants } from '../../constants';
import { getUserFromRequest } from '../../helpers/utils';
import { UserService } from '../../services';

const router = Router({ mergeParams: true });

const { http } = constants;

// GET all users
router.get(
    '/',
    validateUserRoutes('get-users'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const allUsers = await UserService.getAllUsers();
        return res.status(http.ok).send(allUsers);
    })
);

// Get user by Token
router.get(
    '/me',
    validateUserRoutes('get-users'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const user = await getUserFromRequest(req, res);
        return res.status(http.ok).send(user);
    })
);

// GET user by ID
router.get(
    '/:id',
    validateUserRoutes('get-users'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { id } = req.params;
        const usersById = await UserService.getUserById(+id);
        if (!usersById) {
            return res.sendStatus(http.badRequest)
        }
        return res.status(http.ok).send(usersById);
    })
);

// create user
router.post(
    '/',
    validateUserRoutes('post-users'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const body = req.body;
        const createdUser = await UserService.createUser(body);
        if (!createdUser) {
            return res.sendStatus(http.badRequest)
        }
        return res.sendStatus(http.created).send(createdUser);
    })
);

// Update user
router.put(
    '/:id',
    // validateUserRoutes('put-users-email'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const body = req.body;
        const { id } = req.params;

        const updatedUser = await UserService.updateUser(+id, body);
        if (!updatedUser) {
            return res.sendStatus(http.badRequest)
        }
        return res.sendStatus(http.noContent);
    })
);

// Delete user
router.delete(
    '/:id',
    validateUserRoutes('get-user'),
    validateRequest(),
    wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
        const { id } = req.params;
        const deletedUser = await UserService.deleteUser(+id);
        if (!deletedUser) {
            return res.sendStatus(http.badRequest)
        }
        return res.status(http.ok).send(deletedUser);
    })
)

export const UserRouter = router;
