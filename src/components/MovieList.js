import React from 'react';

const MovieList = (props) => {
    const AddFavourite = props.addFavouritesComponent;
    return(
        <>
            {props.movies.map((movie, index) => (
            <div className="image-container d-flex justify-content-start m-3" key={movie.imdbID}>
                <img src={movie.Poster} alt="movie"></img>
                <div 
                    onClick={()=>props.handleFavouritesClick(movie)} 
                    className="overlay d-flex align-items-center justify-content-center">
                        <AddFavourite/>
                </div>
            </div>
            ))}
        </>
    )
}

export default MovieList;