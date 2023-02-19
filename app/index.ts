import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import errorHandler from './middlewares/error';
import dotenv from 'dotenv';
import { initializeDatabase } from './db';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.use('/', routes);

const index = app.listen(port, () => {
    initializeDatabase();
    console.log(`server started on port:${port} / http://localhost:${port}/api`)
});

module.exports = index;
