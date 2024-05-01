import React, { useState } from 'react';
import styled from 'styled-components';


const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const PosterImage = styled.img`
  width: 80px;
  height: auto;
  margin-right: 20px;
  border-radius: 4px;
`;

const MovieDetails = styled.div`
  flex-grow: 1;
`;
const RemoveButton = styled.button`
  padding: 8px 16px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const WatchlistItem = ({ movie }) => {
  const [isRemoved, setIsRemoved] = useState(false);

  const { Title, Year, Poster, imdbID } = movie;
  const handleRemoveFromWatchlist = () => {
    const authenticatedUser = localStorage.getItem('authenticatedUser');
    let userWatchlist = JSON.parse(localStorage.getItem(authenticatedUser)) || [];
    const updatedWatchlist = userWatchlist.filter((item) => item.imdbID !== imdbID);
    localStorage.setItem(authenticatedUser, JSON.stringify(updatedWatchlist));
    setIsRemoved(true)
  };
  if (isRemoved) {
    return null; // Hide the item from UI after removal
  }

  return (
    <ItemContainer>
      <PosterImage src={Poster} alt={Title} />
      <MovieDetails>
        <h3>{Title}</h3>
        <p>Year: {Year}</p>
        <RemoveButton onClick={handleRemoveFromWatchlist}>Remove</RemoveButton>
      </MovieDetails>
    </ItemContainer>
  );
};

export default WatchlistItem;
