import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import AppointmentRouter from './routes/AppointmentRouter.js';

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api', AppointmentRouter);

app.listen(PORT, () => {
  console.log('Server started on port 3333');
});
