import { Router } from 'express';

import { HttpRequest, HttpResponse } from '../../types';
import { validateRequest, wrapAsyncError } from '../../helpers/express';
import { validateAuthRoutes } from '../../validation/auth.validator';
import { constants } from '../../constants';
import { getAccessTokenFromCookie, setCookies, clearCookies, omit, extract, getEmailFromRequest } from '../../helpers/utils';

const router = Router({ mergeParams: true });

const { http } = constants;

router.post(
  '/login',
  validateAuthRoutes('login'),
  validateRequest(),
  wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
    // const { email, password } = req.body;
    console.log("🚀 ~ file: authentication.router.ts:19 ~ wrapAsyncError ~ req.body", req.body)
    // const loginResult = await CognitoService.login(email, password);
    // if (!loginResult.success) {
    //   loginAudit({ options: { message: `${email} failed to logged in!`, updatedBy: email, action: 'POST' } });
    //   return res.status(http.unauthorized).send();
    // }

    // // last login cannot be undefined, as the user just logged in successfully
    // UserCache.updateUser(email, { lastLogin: loginResult.lastLogin! });

    // res.header('Access-Control-Allow-Origin', '*');
    // setCookies(req, res, loginResult.accessToken);
    // log(`User ${email} logged in`);

    // const result = omit(loginResult, 'idToken', 'accessToken', 'refreshToken', 'success', 'id', 'complete');

    // loginAudit({ to: result, options: { message: `${email} logged in successfully!`, updatedBy: email, action: 'POST' } });
    // return res.status(http.ok).send(result);
  })
);

router.post(
  '/logout',
  validateAuthRoutes('logout'),
  validateRequest(),
  wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
    const username = await getEmailFromRequest(req, res);
    const accessToken = getAccessTokenFromCookie(req);
    // if (!accessToken) {
    //   return res.sendStatus(http.badRequest);
    // }
    // try {
    //   await CognitoService.logout(accessToken);
    //   clearCookies(req, res);

    //   loginAudit({ options: { message: `${username} logged out successfully!`, updatedBy: username, action: 'POST' } });
    //   return res.status(http.noContent).send({});
    // } catch {
    //   return res.sendStatus(http.badRequest);
    // }
  })
);

export const AuthenticationRouter = router;
