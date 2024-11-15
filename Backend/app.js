const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const authRouter = require('./controllers/auth');
const usersRouter = require('./controllers/users');
const contactRouter = require('./controllers/contact');
const mpesaRouter = require('./controllers/mpesa');
const photographerRouter = require('./controllers/photographer');
const clientRouter = require('./controllers/clientProfile')
const bookingsRouter = require('./controllers/booking');
const reviewRouter =require('./controllers/review');

mongoose.set('strictQuery', false);

const url = config.MONGODB_URI;
logger.info('connecting to db');

mongoose.connect(url)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static('dist'));

app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/photographers', photographerRouter);
app.use('/api/client', clientRouter);
app.use('/api/book', bookingsRouter);
app.use('/api/review', reviewRouter);
app.use('/api/checkout', mpesaRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;