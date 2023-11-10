
import {useLocation } from 'react-router-dom';


function SearchForm({getMoviesForForm, getSavedMoviesForForm, searchQuery, setSearchQuery, searchFormButton = false, setSearchFormButton}) {
    const location = useLocation();

    function handleInputChange(e) {
        setSearchQuery(e.target.value);
      }

      function handleSearchFormButton(e) {
        const newSearchFormButton = !searchFormButton;
        setSearchFormButton(newSearchFormButton);
      
        if (searchQuery.length < 1) {
          console.log(searchQuery.length);
          return;
        }
      
        if (location.pathname === '/movies') {
          getMoviesForForm(searchQuery, newSearchFormButton); 
        } else if (location.pathname === '/saved-movies') {
          getSavedMoviesForForm(searchQuery, newSearchFormButton); 
        }
      }

    function handleSubmit(e) {
      e.preventDefault();

      if(searchQuery.length < 1) {
        console.log(searchQuery.length);
        return;
      }

      if (location.pathname === '/movies') {
        getMoviesForForm(searchQuery, searchFormButton);
      } else if (location.pathname === '/saved-movies') {
        getSavedMoviesForForm(searchQuery, searchFormButton);
      }

    }

    return(
        <div className="search-form">
            <form className="search-form__form" action="#" onSubmit={handleSubmit} noValidate>
                <input className="search-form__input" placeholder="Фильм" type="text" minLength='2'
                 value={searchQuery} onChange={handleInputChange}/>
                <button className="search-form__button">Поиск</button>
            </form>
            <div className="search-form__radio-container">
                <button onClick={handleSearchFormButton} className={searchFormButton  ? "search-form__radio-btn  green" : "search-form__radio-btn search-form__radio-btn_grey" }></button>
                <p className="search-form__text">Короткометражки</p>
            </div>
            
        </div>
    );
}

export default SearchForm;
