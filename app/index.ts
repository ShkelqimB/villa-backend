import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes';
import errorHandler from './middlewares/error';
import dotenv from 'dotenv';
import { initializeDatabase } from './db';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())
app.use(express.json());
app.use(errorHandler);

app.use('/', routes);
app.use('/uploads', express.static("uploads"));

const index = app.listen(port, () => {
    initializeDatabase();
    console.log(`server started on port:${port} / http://localhost:${port}/`)
});

module.exports = index;
