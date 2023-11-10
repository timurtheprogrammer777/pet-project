import React from "react";
import SearchForm from "../search-form/SearchForm";
import MoviesCardList from "../movies-list/MoviesCardList";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Preloader from "../preloader/Preloader";

import { useSelector, useDispatch } from 'react-redux';


function Movies({
	isLoggedIn,
	isSavedMovie,
	getMoviesForForm,
	setMovies,
	movies,
	savedMovies,
	handleMovieLike,
	handleMovieDislike,
	searchQuery,
	setSearchQuery,
	searchFormButton,
	setSearchFormButton,
	isMoreButton,
	isPreloader,
}) {

	// const moviesRedux = useSelector((state) =>  state.moviesReducer.movies); 
	// console.log(moviesRedux);
	// const dispatch = useDispatch();
	
	async function handleCardClick(movie) {
		const isSaved = savedMovies.some(
			(savedMovie) => savedMovie.movieId === movie.movieId
		);
		if (isSaved) {
			const savedMovie = savedMovies.find(
				(savedMovie) => savedMovie.movieId === movie.movieId
			);
			await handleMovieDislike(savedMovie);
		} else {
			await handleMovieLike(movie);
		}
	}

	return (
		<>
			<Header isLoggedIn={isLoggedIn} />
			<main className="movies">
        
				{isPreloader ? <Preloader /> : ""}

				<SearchForm
					searchFormButton={searchFormButton}
					setSearchFormButton={setSearchFormButton}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					setMovies={setMovies}
					getMoviesForForm={getMoviesForForm}
				/>
				<MoviesCardList
					isMoreButton={isMoreButton}
					movies={movies}
					handleCardClick={handleCardClick}
					savedMovies={savedMovies}
					isSavedMovie={isSavedMovie}
				/>
			</main>
			<Footer />
		</>
	);
}

export default Movies;
