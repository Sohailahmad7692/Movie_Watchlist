import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WatchlistProvider } from './contexts/WatchlistContext';
import Navbar from './components/Navbar';
import LogoContainer from './components/LogoContainer'
// import UserProfile from './components/UserProfile';
import SearchBar from './components/Search/SearchBar';
import Watchlist from './components/Watchlist/Watchlist';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
// import Logout from './components/Auth/Logout';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const MainContentContainer = styled.div`
  display: flex;
  flex: 1;
`;

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContainer className="container">
          <WatchlistProvider>
            <Navbar />
            <LogoContainer />
            <MainContentContainer className="main-content">
              <Routes>
                <Route path="/" element={<SearchBar />} />
                <Route path="/watchlist" element={<Watchlist />} />
                {/* <Route path="/profile" element={<UserProfile />} /> */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/logout" element={<Logout />} /> */}
              </Routes>
            </MainContentContainer>
          </WatchlistProvider>
        </AppContainer>
      </Router>
    </AuthProvider>
  );
};

export default App;

