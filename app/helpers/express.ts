import { constants } from '../constants';
import { HttpRequestHandler, HttpRequest, HttpResponse, HttpNext } from '../types';
import { validationResult } from 'express-validator';

const { http } = constants; // extracting http constant from constants object

export const wrapAsyncError = (handler: HttpRequestHandler) => {
  const wrapper = async (req: HttpRequest, res: HttpResponse, next: HttpNext) => {
    try {
      console.log(`${new Date()}, path: ${req.path}, status: ${res.statusCode}`);
      return await handler(req, res, next);
    } catch (error: any) {
      console.log(error);
      res
        .status(error.status || http.server)
        .send({ error: error.message || error });
    }
  };
  return wrapper;
};

export const validateRequest = () => (req: HttpRequest, res: HttpResponse, next: HttpNext) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // get first error to avoid too much information leakage;
    const error = errors.array()[0].msg;
    return res.status(http.badRequest).send({ error });
  }

  return next();
};
