import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route,  useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import Register from '../register/Register';
import Login from '../login/Login';
import NotFound from '../not-found/NotFound';
import Movies from '../movies/Movies';
import SavedMovies from '../saved-movies/SavedMovies';
import Profile from '../profile/Profile';
import CurrentUserContext from '../../contexts/CurrentUserContext'; 
import {authApi} from '../../utils/AuthApi';
import {api} from '../../utils/MainApi';
import {apiMovies} from '../../utils/MoviesApi';
import formatMovies from '../../utils/formatMovies';

function App() {

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHeaderMain, setIsHeaderMain] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isPreloader, setIsPreolader] = useState(false);

  const [isConflictError, setIsConflictError] = useState(false);
  const [isDefaultError, setIsDefaultError] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFormButton, setSearchFormButton] = useState(false);

  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isSavedMovie, setIsSavedMovie] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isSavedMoviesPage, setIsSavedMoviesPage] = useState(false);
  const [isMoreButton, setIsMoreButton] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('jwt', token); 
    api.setToken(token);
    tokenCheck();
    console.log(token);
  };
  function tokenCheck(){
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
    
    authApi.getUserData(jwt)
    .then((user) => {  
      setCurrentUser(user); 
      setIsLoggedIn(true);  
      setIsHeaderMain(true);
    })
    .catch(console.error);

    }
  };


function editProfile(data) {
    api.editProfile(data)
        .then((userInfo) => {
            setIsPreolader(false);
            console.log(isPreloader);
            setCurrentUser(userInfo);
            
        })
        .catch(err => {
          if (err === "Ошибка 409") {
            setIsPreolader(false);
            setIsConflictError(true);
        } else {
            setIsPreolader(false);
            setIsDefaultError(true);
        }
        });

}
  
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
  
function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

const handleLogout = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('searchFormButton');
  localStorage.removeItem('searchQuery');
  localStorage.removeItem('movies');

  setSearchQuery("");
  setSearchFormButton(false);
  setMovies([]);
};

// снизу все для movies и saved-movies

async function getMoviesForForm(searchQuery, searchFormButton) {
  setIsPreolader(true);

  try {
    let movies = await apiMovies.getMovies(searchFormButton);
    movies = movies.map(formatMovies);

    if (searchQuery) {
      movies = movies.filter((movie) => {
        const isMatch = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
        const isShort = searchFormButton ? movie.duration < 40 : true; // Фильтрация по короткометражным фильмам
        console.log(searchFormButton);
        
        return isMatch && isShort;
      });
    }
    setMovies(movies);
    setIsMoreButton(true);
    saveToLocalStorage('searchQuery', searchQuery);
    saveToLocalStorage('searchFormButton', searchFormButton);
    saveToLocalStorage('movies', movies);
    setIsPreolader(false);
    
  } catch (error) {
    console.error("Ошибка при загрузке фильмов:", error);
    setIsPreolader(false);

  }
}

async function getSavedMoviesForForm(searchQuery, searchFormButton) {
  setIsPreolader(true);

  try {
    let movies = await api.getSavedMovies(searchFormButton);

    if (searchQuery) {
      movies = movies.filter((movie) => {
        const isMatch = movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
        const isShort = searchFormButton ? movie.duration < 40 : true; // Фильтрация по короткометражным фильмам
        return isMatch && isShort;
      });
    }
    setSavedMovies(movies);
    setIsPreolader(false);

  } catch (error) {
    console.error("Ошибка при загрузке фильмов:", error);
    setIsPreolader(false);
  }
}

async function handleMovieLike(movie) {
  try {
    const savedMovie = await api.createMovie(movie);       
      setSavedMovies((movies) =>  [...movies, savedMovie]);         
      setIsSavedMovie(true);
  } catch (err) {
    console.error(err);
  }
}

async function handleMovieDislike(movie) {
  try {
    await api.deleteMovie(movie._id);
    setSavedMovies((movies) =>
      movies.filter((savedMovie) => savedMovie._id !== movie._id));        
      setIsSavedMovie(false);
  } catch (err) {
    console.error(err);
  }
}

useEffect(() => {
  if (location.pathname === '/saved-movies') {
    const jwt = localStorage.getItem('jwt');

    setIsSavedMoviesPage(true);
    setIsMoreButton(false);
    setSearchFormButton(false);
    setSearchQuery('');
    api.getSavedMovies(jwt)
    .then((savedMovies) =>  setSavedMovies(savedMovies))
    .catch(console.error);
    setIsSavedMovie(true);
  } 
}, [location.pathname]);


useEffect(() => {
  tokenCheck();
}, []);


useEffect(() => {
  if (location.pathname === '/movies') {
    const jwt = localStorage.getItem('jwt');
    const storedSearchQuery = loadFromLocalStorage('searchQuery');
    const storedSearchFormButton = loadFromLocalStorage('searchFormButton');
    const storedMovies = loadFromLocalStorage('movies');

  if (storedSearchQuery || storedSearchFormButton || storedMovies) {
    setSearchQuery(storedSearchQuery);
    setSearchFormButton(storedSearchFormButton);
    setMovies(storedMovies);
  } 

    api.getSavedMovies(jwt)
    .then(SavedMovies => {
      setSavedMovies(SavedMovies);
    })
    .catch(console.error);
  }
}, [location.pathname, setSavedMovies]);


  return (
    <CurrentUserContext.Provider value={currentUser}>

    <div className="App">

      
      <Routes>
            
            <Route path="/" isLoggedIn={isLoggedIn}  element={
                <>
                  <Header isLoggedIn={isLoggedIn} isHeaderMain={isHeaderMain}/>
                  <Main  />
                  <Footer />
                </>
              } 
            />

            {isLoggedIn ? (
            <Route path="/movies" 
            element={<ProtectedRoute 
              isLoggedIn={isLoggedIn}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchFormButton={searchFormButton}
              setSearchFormButton={setSearchFormButton}
              getMoviesForForm={getMoviesForForm}
              handleMovieDislike={handleMovieDislike}
              handleMovieLike={handleMovieLike}
              setMovies={setMovies}
              setIsSavedMovie={setIsSavedMovie}
              isSavedMoviesPage={isSavedMoviesPage}
              isSavedMovie={isSavedMovie}
              movies={movies}
              savedMovies={savedMovies}
              isMoreButton={isMoreButton}
              isPreloader={isPreloader}

              element={Movies} />}
            /> ) : ''}
  
            {isLoggedIn ? (
            <Route path="/saved-movies" 
            element={<ProtectedRoute 
              isSavedMoviesPage={isSavedMoviesPage}
              isMoreButton={isMoreButton}
              movies={movies}

              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchFormButton={searchFormButton}
              setSearchFormButton={setSearchFormButton}
              
              handleMovieDislike={handleMovieDislike}
              handleMovieLike={handleMovieLike}
              getSavedMoviesForForm={getSavedMoviesForForm}
              isLoggedIn={isLoggedIn}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              isSavedMovie={isSavedMovie}
              setIsSavedMovie={setIsSavedMovie}
              element={SavedMovies} />}
            /> ) : ''}

            {isLoggedIn ? (
            <Route path="/profile" 
            element={<ProtectedRoute 
              isConflictError={isConflictError}
              isDefaultError={isDefaultError}
              editProfile={editProfile}
              isPreloader={isPreloader}
              setIsPreolader={setIsPreolader}
              handleLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              element={Profile} />}
            /> ) : ''}

            <Route
              path="/sign-up"
              element={
                <>
                  <Register handleLogin={handleLogin} isActiveButton={isActiveButton} setIsActiveButton={setIsActiveButton} />
                </>
              }
            />

            <Route
              path="/sign-in"
              element={
                <>
                  <Login handleLogin={handleLogin} isActiveButton={isActiveButton} setIsActiveButton={setIsActiveButton} />
                </>
              }
            />

            <Route
              path="*"
              element={
                <>
                  <NotFound />
                </>
              }
            />

        </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


////////


////