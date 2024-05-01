import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MovieCard from '../Movie/MovieCard';

const HomeContainer = styled.div`
  padding: 20px;
  position: absolute;
  left: 240px;
  width: 80vw;
  @media (max-width: 768px){
   margin: auto;
   left: 20px;
   top: 80px;
  }
`;

const WelcomeMessage = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  flex: 1;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;

  @media (max-width: 768px) {
    border-radius: 4px;
    margin-bottom: 10px;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    border-radius: 4px;
  }
`;

const MovieSuggestion = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 50px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=4bf6cb6b&s=${searchTerm}`);
      setSuggestions(response.data.Search || []);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  return (
    <HomeContainer>
      <WelcomeMessage>
        <h2>Welcome to Watchlist</h2>
        <p>
          Browse movies and get details about the poster, year, and title. Login to add movies to your watchlist by clicking the '+' on the poster and '-' to remove them.
        </p>
      </WelcomeMessage>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      {
        isLoading ?
          <Loader></Loader>
          :
          <MovieSuggestion>
            {suggestions.map((movie) => (
              <MovieCard
                movie={movie}
              />
            )
            )}
          </MovieSuggestion>
      }

    </HomeContainer>
  );
};

export default SearchBar;
