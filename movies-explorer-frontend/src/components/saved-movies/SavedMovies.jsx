import React from "react";
import SearchForm from "../search-form/SearchForm";
import MoviesCardList from "../movies-list/MoviesCardList";
import Footer from "../footer/Footer";
import Header from "../header/Header";

function SavedMovies({
	isSavedMovie,
	movies,
	isLoggedIn,
	savedMovies,
	handleMovieDislike,
	getSavedMoviesForForm,
	isSavedMoviesPage,
	isMoreButton,
	searchQuery,
	setSearchQuery,
	searchFormButton,
	setSearchFormButton,
}) {

	async function handleCardClick(movie) {
		const savedMovie = savedMovies.find(
			(savedMovie) => savedMovie.movieId === movie.movieId
		);
		await handleMovieDislike(savedMovie);
	}

	console.log(savedMovies);
	return (
		<>
			<Header isLoggedIn={isLoggedIn} />
			<main className="saved-movies">
				<SearchForm
					getSavedMoviesForForm={getSavedMoviesForForm}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					searchFormButton={searchFormButton}
					setSearchFormButton={setSearchFormButton}
				/>
				<MoviesCardList
					handleCardClick={handleCardClick}
					savedMovies={savedMovies}
					isSavedMoviesPage={isSavedMoviesPage}
					savedMoviesData={savedMovies}
					isMoreButton={isMoreButton}
					isSavedMovie={isSavedMovie}
					movies={movies}
				/>
			</main>
			<Footer />
		</>
	);
}

export default SavedMovies;
