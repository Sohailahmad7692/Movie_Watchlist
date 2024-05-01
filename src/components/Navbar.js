import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled.div`
width: 200px;
height: 100vh;
padding: 0px 20px;
background-color: #f0f0f0;
position: fixed;
top: 0;
left: 0;
z-index: 1000;
@media (max-width: 768px) {
  width: 100vw;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')}; 
}
`;

const SidebarTop = styled.div`
  margin-bottom: 20px;
`;

const SidebarBottom = styled.div`
    padding-bottom: 30px;
`;

const SidebarLink = styled(Link)`
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  font-size: 20px;
  padding: 10px;
  background-color: ${({ active }) => (active ? '#bf0f0f' : 'inherit')};
  color: ${({ active }) => (active ? '#fff' : '#4d4d4d')};
`;
const SidebarLinkHome = styled(Link)`
  display: block;
  text-decoration: none;
  font-size: 20px;
  padding: 10px;
  background-color: ${({ active }) => (active ? '#bf0f0f' : 'inherit')};
  color: ${({ active }) => (active ? '#fff' : '#4d4d4d')};
`;
const SideBarBottomLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 5px;
  background: #bf0f0f;
  margin-left: 5px;
`;

const LogoContainer = styled.h3`
  margin-bottom: 20px;
  font-size: 30px;
  font-style: bold;
  color: #df9610;
  cursor: pointer;
`;

const UserStatus = styled.div`
  font-size: 16px;
`;
const LogoutButton = styled.button`
  background: none;
  border: none;
  border-bottom: black;
  cursor: pointer;
  color: #000;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;

`;
const MenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 20px;
    left: 20px;
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 2;
  }
`;
const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  right: 50px;
  @media (min-width: 768px){
    display: none;
  }
`;
const UserData = styled.div`
  padding: 5px 30px;
  border: 1px solid #4d4d4d;
  font-size: 14px;
  margin-bottom: 5px; 
  background: lightblue;

`;
const DivWrap = styled.div`
  position: absolute; 
  bottom: 20px;
`;
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const history = useNavigate();

  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout()
    localStorage.removeItem('authenticatedUser');
  }
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleRedirection = () => {
    history('/')
  }
  return (
    <>
      <MenuButton onClick={toggleSidebar}>☰</MenuButton>
      <SidebarContainer isOpen={isOpen}>
        <CloseButton onClick={toggleSidebar}>✕</CloseButton>
        <SidebarTop>
          <LogoContainer onClick={handleRedirection}>WatchList</LogoContainer>
          <SidebarLinkHome to="/" onClick={toggleSidebar} active={location.pathname === '/'}>Home</SidebarLinkHome>
          <SidebarLink to="/watchlist" onClick={toggleSidebar} active={location.pathname === '/watchlist'}>My Watchlist</SidebarLink>
        </SidebarTop>
        <SidebarBottom>
          <UserStatus>
            {currentUser ? (
              <DivWrap>
                <UserData>Welcome, {currentUser.email}</UserData>
                <LogoutButton onClick={handleLogout}>Logout </LogoutButton>
              </DivWrap>
            ) : (
              <DivWrap >
                <SideBarBottomLink to="/login" onClick={toggleSidebar}>Login </SideBarBottomLink>
                <SideBarBottomLink to="/signup" onClick={toggleSidebar}> Sign Up</SideBarBottomLink>
              </DivWrap>
            )}
          </UserStatus>
        </SidebarBottom>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
