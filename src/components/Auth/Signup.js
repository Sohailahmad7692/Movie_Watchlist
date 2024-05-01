import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const SignUpContainer = styled.div`
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

const SignUpInput = styled.input`
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

const SignUpButton = styled.button`
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

const Signup = () => {
    const { createAccount } = useAuth();
    const [email, setEmail] = useState('');
    const history = useNavigate();


    const handleSignup = () => {
        createAccount(email);
        setEmail('');
        localStorage.setItem('authenticatedUser', email);
        history('/');
    };

    return (
        <SignUpContainer>
            <h2>Create Account</h2>
            <SignUpInput
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <SignUpButton onClick={handleSignup}>Create Account</SignUpButton>
        </SignUpContainer>
    );
};

export default Signup;
