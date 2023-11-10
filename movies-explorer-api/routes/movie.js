const movieRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie
} = require('../controllers/movies');
const { movieSchemaJoi, movieIdValidation } = require('../middlewares/joiSchemas/movieSchemaJoi');

movieRouter.post('/', movieSchemaJoi, createMovie);
movieRouter.get('/', getMovies);
movieRouter.delete('/:id', movieIdValidation, deleteMovie);


module.exports = {
  movieRouter,
};
