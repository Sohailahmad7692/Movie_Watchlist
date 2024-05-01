import React from 'react';

const MovieDetail = ({ movie }) => {
    return (
        <div>
            <h2>{movie.Title}</h2>
            <p>Release Year: {movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Plot}</p>
        </div>
    );
};

export default MovieDetail;