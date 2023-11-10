const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const { JWT_SECRET } = process.env;
const { ValidationError } = require('../middlewares/errors/ValidationError');
const { NotFoundError } = require('../middlewares/errors/NotFoundError');
const { ConflictError } = require('../middlewares/errors/ConflictError');
const { UnauthorizedError } = require('../middlewares/errors/UnauthorizedError');

const createUser = (req, res, next) => {
  const { email, name } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ email, name, password: hash })
      .then(() => {
        res.status(201).send({ email });
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некоректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      } else {
        next(err);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неверный логин'));
      }
      return bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          return next(new UnauthorizedError('Пароль указан не верно'));
        }
        const token = jwt.sign({ id: user.id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        return res.status(200).send({ token });
      });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      } else {
        const userSubset = {
          name: user.name,
          email: user.email,
          userId
        };

        res.status(200).send(userSubset);
      }
    })
    .catch(next);
};

const editUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user.id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      const userSubset = {
        name: user.name,
        email: user.email,
      };
      res.status(200).send(userSubset);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(' Переданы некоректные данные'));
      } else if (err.code === 11000 || err.code === 11001) {
        next(new ConflictError('Такой email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserInfo,
  createUser,
  login,
  editUserInfo,
};
