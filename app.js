require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const hendelError = require('./middlewares/hendelError');
const config = require('./config');
const router = require('./routes');
const limiter = require('./middlewares/limiter');

const app = express();

const server = async (next) => {
  try {
    await mongoose.connect(config.MONGODB, {
      useNewUrlParser: true,
      family: 4,
    });
    app.listen(config.PORT);
  } catch (err) {
    next(err);
  }
};

app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(hendelError);

server();
