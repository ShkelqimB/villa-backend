// import { logError } from '../helpers/logger';

import { HttpRequest, HttpResponse, HttpNext } from '../types';

const errorHandler = (error: any, _req: HttpRequest, res: HttpResponse, _next: HttpNext) => {
  console.log(error);
  res.status(500)
    .send({
      error: "Something went wrong",
      details: error
    });
};

export default errorHandler;