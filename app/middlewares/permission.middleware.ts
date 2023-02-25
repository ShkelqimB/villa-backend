import { HttpRequest, HttpResponse, HttpNext } from "../types";
import { constants } from "../constants";

const { ENV, http } = constants;

type ContextType = "group" | "account" | "entity" | "vatbox";

const { NODE_ENV = '~', ACCESS_TOKEN = '~' } = process.env;

interface Context {
    id: number,
    type: ContextType
}

export const validatePermission = (permission: string, contextExtractor: (req: HttpRequest) => Context = findContext) => async (req: HttpRequest, res: HttpResponse, next: HttpNext) => {
    try {
        // If we're on local then on .env.local file we should have ACCESS_TOKEN='...access...'
        if (NODE_ENV === ENV.LOCAL) {
            req.cookies = {
                access: ACCESS_TOKEN
            };
        }

        const context = contextExtractor(req);
        const permitted = await capua.checkPermission(permission, context, req);
        if (permitted) {
            return next();
        } else {
            log(`Access denied for permission ${permission} for ${context.type} - ${context.id}`);
            return res.sendStatus(http.forbidden);
        }
    } catch (error: any) {
        return res.status(error.status || http.server).send({ message: error.message });
    }
};

const findContext = (req: HttpRequest): Context => {
    // try to find entity id from params
    const { params: { entityId } } = req;
    if (entityId) {
        return {
            id: +entityId,
            type: "entity" as ContextType
        };
    }

    // try to find entity id from body
    const { body: { entityId: bodyEntityId } } = req;
    if (bodyEntityId) {
        return {
            id: +bodyEntityId,
            type: "entity" as ContextType
        };
    }

    // try to find account id from params
    const { params: { accountId } } = req;
    if (accountId) {
        return {
            id: +accountId,
            type: "account" as ContextType
        };
    }

    // try to find account id from body
    const { body: { accountId: bodyAccountId } } = req;
    if (bodyAccountId) {
        return {
            id: +bodyAccountId,
            type: "account" as ContextType
        };
    }

    // no entity or account id, assume admin level vatbox
    return {
        id: -1,
        type: "vatbox" as ContextType
    };
}