import { HttpRequest, HttpResponse } from '../../types';
import { validateRequest, wrapAsyncError } from '../../helpers/express';
import { constants } from '../../constants';
import { Router } from 'express';
import { convertStringToPositiveNumber } from '../../helpers/utils';
import { validateVillaRoutes } from '../../validation/villa.validator';
import { VillaService } from '../../services';

const router = Router({ mergeParams: true });
const { ENV, http } = constants;

// GET all villas
router.get(
  '/',
  // validateVillaRoutes('get-all-providers'),
  validateRequest(),
  wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
    const allVillas = await VillaService.getAllVillas();
    return res.status(http.ok).send(allVillas);
  })
);

// GET specific villa by ID
router.get(
  '/:id',
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
  '/',
  // validateVillaRoutes('get-provider-slug'),
  validateRequest(),
  wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
    const body = req.body;
    const createdVilla = await VillaService.createVilla(body);
    if (!createdVilla) {
      return res.sendStatus(http.badRequest)
    }
    return res.sendStatus(http.created).send(createdVilla);
  })
);

// UPDATE villa
router.put(
  '/:id',
  // validateVillaRoutes('update-oidc-provider'),
  validateRequest(),
  wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
    const body = req.body;
    const { id } = req.params;

    const updatedUser = await VillaService.updateVilla(+id, body);
    if (!updatedUser) {
      return res.sendStatus(http.badRequest)
    }
    return res.sendStatus(http.noContent);
  })
);

// DELETE villa
router.delete(
  '/:id',
  // validateVillaRoutes('delete-provider'),
  validateRequest(),
  wrapAsyncError(async (req: HttpRequest, res: HttpResponse) => {
    const { id } = req.params;
    const deletedUser = await VillaService.deleteVilla(+id);
    if (!deletedUser) {
      return res.sendStatus(http.badRequest)
    }
    return res.status(http.ok).send(deletedUser);
  })
);

export const VillaRouter = router;