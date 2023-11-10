import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveMovie, deleteMovie } from '../../store/moviesSlice/moviesSlice';


function MoviesCard({ handleCardClick, duration, movie, isSavedMoviesPage, savedMovies }) {

    const moviesRedux = useSelector((state) =>  state.movie.movies); 
	console.log(moviesRedux);
	const dispatch = useDispatch();

    const [isButtonActive, setIsButtonActive] = useState(false);
    const [isSaving, setIsSaving] = useState(false); // Новое состояние для отслеживания сохранения

    async function handleLikeClick() {
        dispatch(saveMovie());
        await handleCardClick(movie);
        setIsSaving(true); // Устанавливаем isSaving в true при начале сохранения
        setIsButtonActive(!isButtonActive);
        
    }

    useEffect(() => {
        const isMovieLiked = savedMovies.some((savedMovie) => savedMovie.movieId === movie.movieId);
        setIsButtonActive(isMovieLiked);
        setIsSaving(false); // При обновлении компонента сбрасываем isSaving
    }, [savedMovies, movie]);

    return (
        <>
            <li className="movies-card">
                <p>1</p>
                <div className="movies-card__container">
                    <h2 className="movies-card__title">{movie.nameRU}</h2>
                    <p className="movies-card__duration">{duration}</p>
                </div>
                <Link className="movies-card__link" to={movie.trailerLink} target="_blank">
                    <img className="movies-card__image" src={movie.image} alt="Картинка фильма" />
                </Link>
                {isSavedMoviesPage ?
                    <button className="movies-card__button" onClick={handleLikeClick}>X</button>
                    :
                    <button className={isSaving ? 'movies-card__button' : isButtonActive ? "movies-card__button movies-card__button_active" : "movies-card__button "} onClick={handleLikeClick}>
                        {isSaving ? "Сохранение" : (isButtonActive ? "✓" : "Сохранить")}
                    </button>}
            </li>
        </>
    );
}

export default MoviesCard;
