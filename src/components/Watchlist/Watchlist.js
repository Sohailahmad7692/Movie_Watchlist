import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import WatchlistItem from './WatchlistItem';
import styled from 'styled-components';
const WatchlistContainer = styled.div`
  padding: 20px;
  position: absolute;
  left: 280px;
  top: 20px;
  @media (max-width: 768px){
   margin: auto;
   left: 20px;
   top: 50px;
  }
`;

const Watchlist = () => {
    const { isAuthenticated } = useAuth();
    const getWatchlist = () => {
        const authenticatedUser = localStorage.getItem('authenticatedUser');
        return JSON.parse(localStorage.getItem(authenticatedUser)) || [];
    };
    const watchlist = getWatchlist();
    return (
        <WatchlistContainer>
            <h2>My Watchlist</h2>
            {!isAuthenticated() ? (
                <p>Please log in to view your watchlist.</p>
            ) : watchlist.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : (
                watchlist.map((movie) => <WatchlistItem key={movie.imdbID} movie={movie} />)
            )}
        </WatchlistContainer>
    );
};

export default Watchlist;
