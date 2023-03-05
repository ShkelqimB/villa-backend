import express from 'express';
import { AuthenticationRouter } from './authentication/authentication.router';
import { ExpenseRouter } from './expense/expense.router';
import { RollPaymentRouter } from './roll_payment/roll_payment.router';
import { UserRouter } from './user/user.router';
import { VillaRouter } from './villa/villa.router';

const BASE_ROUTE = '/api';
const router = express.Router();

router.use(`${BASE_ROUTE}/authentication`, AuthenticationRouter);
router.use(`${BASE_ROUTE}/user`, UserRouter);
router.use(`${BASE_ROUTE}/villa`, VillaRouter);
router.use(`${BASE_ROUTE}/expense`, ExpenseRouter);
router.use(`${BASE_ROUTE}/rollPayment`, RollPaymentRouter);


router.get(`/api/internal/v1.0/health/liveness`, (_req, res) => {
    res.send({ status: 'service is up...' });
});

export default router;
