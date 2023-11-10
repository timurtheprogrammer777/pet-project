require('dotenv').config({ path: `${__dirname}/.env` });
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { userRouter, movieRouter } = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { signupUserSchemaJoi, signinUserSchemaJoi } = require('./middlewares/joiSchemas/userSchemaJoi');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { errorHandler } = require('./middlewares/errors/errorHandler');

const { NotFoundError } = require('./middlewares/errors/NotFoundError');

const { limiter } = require('./middlewares/rateLimiter/rateLimiter');

const { PORT, DB_URL } = process.env;

const app = express();
mongoose.connect(DB_URL);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.use(limiter);

app.post('/signup', signupUserSchemaJoi, createUser);
app.post('/signin', signinUserSchemaJoi, login);

app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Cервер запущен на ${PORT} порту!`);
});
