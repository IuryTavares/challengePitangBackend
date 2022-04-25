const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const AppointmentRouter = require('./routes/AppointmentRouter.js');

/*
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import AppointmentRouter from './routes/AppointmentRouter.js';
*/

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api', AppointmentRouter);

module.exports = app;
