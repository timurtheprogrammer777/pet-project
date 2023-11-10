const { Movie } = require('../models/movie');
const { NotFoundError } = require('../middlewares/errors/NotFoundError');
const { ForbiddenError } = require('../middlewares/errors/ForbiddenError');

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const { id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner: id,
    movieId,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch(next);
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.id })
    .then((savedMovies) => {
      res.status(200).send(savedMovies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .orFail(new Error('castError'))

    .then((movie) => {
      if (movie.owner.toString() === req.user.id) {
        movie.deleteOne()
          .then(() => res.status(200).send({ message: 'Фильм удален' }))
          .catch(next);
      } else {
        next(new ForbiddenError('Ошибка при удалении фильма'));
      }
    })
    .catch((err) => {
      if (err.message === 'castError') {
        next(new NotFoundError('Фильм не найден'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};


