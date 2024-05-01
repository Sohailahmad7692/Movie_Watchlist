import styled from "styled-components";
import { Link } from 'react-router-dom';
const Logo = styled(Link)`
    font-size: 30px;
    font-style: bold;
    color: #df9610;
    position: fixed;
    width: 100%;
    z-index: 1;
    padding: 20px 50px;
    background: #e6dbdb;
    text-decoration: none;
    @media (min-width:768px){
        display: none;
    }
`;
const LogoContainer = () => {
    return (
        <>
            <Logo to="/">WatchList</Logo>
        </>
    )
}

export default LogoContainer;