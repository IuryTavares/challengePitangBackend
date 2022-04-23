import express from 'express';
import cors from 'cors';
import AppointmentRouter from './routes/AppointmentRouter.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', AppointmentRouter);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
