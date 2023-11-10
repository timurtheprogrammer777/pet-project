import { createSlice } from '@reduxjs/toolkit';
import {apiMovies} from '../../utils/MoviesApi';
import formatMovies from '../../utils/formatMovies';

const moviesFromApi = apiMovies.getMovies()
.then(movies => movies.map(movie => {
  
  formatMovies(movie);
  // console.log(movie);
}))
.catch(err => console.log(err));

const initialState = {
  movies: moviesFromApi,
};

console.log(initialState.movies);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    saveMovie: (state) => {
      state.movies =+1;
    },
    deleteMovie: (state) => {
      state.movies =- 1;
    }
  },
});

export const { saveMovie, deleteMovie } = moviesSlice.actions;

export default moviesSlice.reducer;