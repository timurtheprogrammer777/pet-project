import React, { useState, useEffect, useContext } from "react";
import MoviesCard from "../movies-card/MoviesCard";

function MoviesCardList({
	movies,
	handleCardClick,
	savedMovies,
	isSavedMoviesPage,
}) {
	const [canLoadMore, setCanLoadMore] = useState(true);
	const [visibleMovieCount, setVisibleMovieCount] = useState(12);

	useEffect(() => {
		const updateVisibleMovieCount = () => {
			if (window.innerWidth < 768) {
				setVisibleMovieCount(5);
			} else if (window.innerWidth < 1280) {
				setVisibleMovieCount(8);
			} else {
				setVisibleMovieCount(12);
			}
		};

		window.addEventListener("resize", updateVisibleMovieCount);
		updateVisibleMovieCount();

		return () => {
			window.removeEventListener("resize", updateVisibleMovieCount);
		};
	}, []);

	useEffect(() => {
		if (visibleMovieCount >= movies.length) {
			setCanLoadMore(false);
		} else {
			setCanLoadMore(true);
		}
	}, [visibleMovieCount, movies]);

	const loadMore = () => {
		if (window.innerWidth >= 1280) {
			setVisibleMovieCount(visibleMovieCount + 3);
		} else if (window.innerWidth <= 1279 || window.innerWidth >= 769) {
			setVisibleMovieCount(visibleMovieCount + 2);
		} else {
			setVisibleMovieCount(visibleMovieCount + 2);
		}
	};

	const minutesToHoursMinutes = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return { hours, minutes: remainingMinutes };
	};


	return (
		<>
			<ul className="movies-list">
				{isSavedMoviesPage ? (
					savedMovies.length === 0 ? (
						<h2 className="movies-list__not-found">Ничего не найдено! :)</h2>
					) : (
						savedMovies
							.slice(0, visibleMovieCount)
							.map((movie) => (
								<MoviesCard
									isSavedMoviesPage={isSavedMoviesPage}
									handleCardClick={handleCardClick}
									savedMovies={savedMovies}
									movie={movie}
									duration={`${minutesToHoursMinutes(movie.duration).hours} ч ${
										minutesToHoursMinutes(movie.duration).minutes
									} мин`}
								/>
							))
					)
				) : movies.length === 0 ? (
					<h2 className="movies-list__not-found">Ничего не найдено! :)</h2>
				) : (
					movies
						.slice(0, visibleMovieCount)
						.map((movie) => (
							<MoviesCard
								isSavedMoviesPage={isSavedMoviesPage}
								handleCardClick={handleCardClick}
								savedMovies={savedMovies}
								movie={movie}
								duration={`${minutesToHoursMinutes(movie.duration).hours} ч ${
									minutesToHoursMinutes(movie.duration).minutes
								} мин`}
							/>
						))
				)}

				{canLoadMore && (
					<button className="movies-list__button" onClick={loadMore}>
						Ещё
					</button>
				)}
			</ul>
		</>
	);
}

export default MoviesCardList;
