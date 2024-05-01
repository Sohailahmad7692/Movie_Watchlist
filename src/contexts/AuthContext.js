// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const createAccount = (email) => {
        setCurrentUser({ email });
    };

    const login = (email) => {
        setCurrentUser({ email });
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const isAuthenticated = () => {
        return !!currentUser; // Check if currentUser exists
    };

    return (
        <AuthContext.Provider value={{ currentUser, createAccount, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
