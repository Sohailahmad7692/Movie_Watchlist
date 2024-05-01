import React, { createContext, useContext, useState } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => {
    return useContext(WatchlistContext);
};

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    const addToWatchlist = (movie) => {
        setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
    };

    const removeFromWatchlist = (movieId) => {
        setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie.imdbID !== movieId));
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};
