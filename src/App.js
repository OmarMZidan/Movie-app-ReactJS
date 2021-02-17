// Use a real API(OMDB API ) to search for movies as we type
// Create a "Netflix style" horizontal scroll effect
// Add movies to and remove them from our favourites
// Save our favourites to local storage to they appear when the app refreshes

import React , {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourites';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMoviesRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c83883ea`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if(responseJson.Search){
        setMovies(responseJson.Search);
    }
  }

  useEffect(() => {
    getMoviesRequest(searchValue);
  }, [searchValue])

  useEffect(() => {
    const FavouritesMovies = JSON.parse(localStorage.getItem('favourites-movies'))
    setFavourites(FavouritesMovies)
  }, [])

  const saveToLocalStorage = (favourites) => {
    localStorage.setItem('favourites-movies', JSON.stringify(favourites))
  }

  const addFavouriteMovie = (movie) => {
      const newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList)
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)

  }
  return (
  <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
          <Header header='Movies'/>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
    <div className="row">
        <MovieList 
            movies={movies} 
            addFavouritesComponent={AddFavourite}
            handleFavouritesClick={addFavouriteMovie}
        />
    </div>

    <div className="row d-flex align-items-center mt-4 mb-4">
          <Header header='Favourites'/>
    </div>
    <div className="row">
        <MovieList 
            movies={favourites} 
            addFavouritesComponent={RemoveFavourites}
            handleFavouritesClick={removeFavouriteMovie}
        />
    </div>
  </div>
  )
}

export default App;
