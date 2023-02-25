import { Router } from 'express';
import { HttpRequest, HttpResponse } from '../../types';
import { validateRequest, wrapAsyncError } from '../../helpers/express';
import { validateAuthRoutes } from '../../validation/auth.validator';
import { constants, COOKIE_JWT } from '../../constants';
import { getAccessTokenFromCookie, setCookies, clearCookies, omit, extract } from '../../helpers/utils';
import { AuthenticationService } from '../../services';

const router = Router({ mergeParams: true });

const { http } = constants;

router.post(
  '/login',
  // validateAuthRoutes('login'),
  validateRequest(),
  wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
    const { email, password } = req.body;
    console.log("🚀 ~ file: authentication.router.ts:19 ~ wrapAsyncError ~ req.body", req.body)
    const loginResult = await AuthenticationService.login(email, password)

    if (!loginResult.success) {
      console.log(`${email} failed to logged in!`);
      return res.status(http.unauthorized);
    }

    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    const cookieOptions = {
      expires: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000
      ), // To mS = D * Hs * min * mS
      httpOnly: true, // The browser will not access or modify the cookie
    };
    console.log("🚀 ~ file: authentication.router.ts:35 ~ wrapAsyncError ~ loginResult.token:", loginResult.token)
    console.log("🚀 ~ file: authentication.router.ts:36 ~ wrapAsyncError ~ COOKIE_JWT:", COOKIE_JWT)
    console.log("🚀 ~ file: authentication.router.ts:37 ~ wrapAsyncError ~ cookieOptions:", cookieOptions)
    res.cookie('jwt', loginResult.token, { httpOnly: true, secure: false });
    // res.cookie('token', loginResult.token)
    console.log(`User ${email} logged in successfully!`);
    return res.status(http.ok).send(loginResult.user);
  })
);

router.post(
  '/logout',
  validateAuthRoutes('logout'),
  validateRequest(),
  wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
    // const username = await getEmailFromRequest(req, res);
    // const accessToken = getAccessTokenFromCookie(req);
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
