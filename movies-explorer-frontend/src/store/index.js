import {configureStore} from '@reduxjs/toolkit'

import moviesReducer from './moviesSlice/moviesSlice';

console.log(moviesReducer);


const store = configureStore({
    reducer: {
        movie: moviesReducer,
    },
    devTools: true
});

export default store;