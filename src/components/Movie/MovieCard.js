import React from 'react';
import styled from 'styled-components';
import { useWatchlist } from '../../contexts/WatchlistContext';
import { useAuth } from '../../contexts/AuthContext';

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  position: relative;
  @media (max-width: 768px){
    width:400px;
  }
`;

const MovieImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
`;

const MovieTitle = styled.h3`
  font-size: 18px;
  margin-top: 10px;
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
`;
const ActionButton = styled.button`
  border: none;
  background-color: rgba(0,0,0,0.5);
  color: white;
  font-size: 25px;
  cursor: pointer;
  width: 25px;
`;

const MovieCard = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist();
  const { currentUser } = useAuth();

  if (!movie || !movie.imdbID) {
    return null; // Handle case where movie data is not yet available
  }

  const isMovieInWatchlist = watchlist.some((item) => item.imdbID === movie.imdbID);

  const handleAddToWatchlist = (movie) => {
    addToWatchlist(movie);
    const authenticatedUser = localStorage.getItem('authenticatedUser');
    let userWatchlist = JSON.parse(localStorage.getItem(authenticatedUser)) || [];
    userWatchlist.push(movie);
    localStorage.setItem(authenticatedUser, JSON.stringify(userWatchlist));
  };

  const handleRemoveFromWatchlist = (movieId) => {
    removeFromWatchlist(movie.imdbID);
    const authenticatedUser = localStorage.getItem('authenticatedUser');
    let userWatchlist = JSON.parse(localStorage.getItem(authenticatedUser)) || [];
    const updatedWatchlist = userWatchlist.filter((movie) => movie.imdbID !== movieId);
    localStorage.setItem(authenticatedUser, JSON.stringify(updatedWatchlist));
  };

  return (
    <CardContainer>
      <ButtonContainer>
        {currentUser &&
          <div>
            {isMovieInWatchlist ?
              <ActionButton onClick={() => handleRemoveFromWatchlist(movie.imdbID)}>-</ActionButton>
              :
              <ActionButton onClick={() => handleAddToWatchlist(movie)}>+</ActionButton>
            }
          </div>
        }
      </ButtonContainer>
      <MovieImage src={movie.Poster} alt={movie.Title} />
      <MovieTitle>{movie.Title}</MovieTitle>
      <p>Year: {movie.Year}</p>
    </CardContainer>
  );
};

export default MovieCard;
